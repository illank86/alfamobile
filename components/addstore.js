import React from 'react';
import { ToastAndroid, Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { observer, inject } from 'mobx-react/native';

import store from '../store/liststores';



class AddStore extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: "",
            address: "",
            topic: "",
            errorName: false,
            errorAddress: false,
            errorTopic: false,
            saveStatus: 'Save',
            disableBtn: false
        }
    }
   
    static navigationOptions = { 
        title: 'Add Store',
        headerTintColor: '#fff',
        headerTitleStyle: { 
            color:"#fff", 
        },
        headerStyle: {
            backgroundColor: '#EA6055',
        } 
    }

    backToLists = () => {
        const { goBack } = this.props.navigation;
        goBack();
    }

    addStore = () => {  
        this.setState({disableBtn: true});
        const { state } = this.props.navigation;
        let data = [
            this.state.name,
            this.state.address,
            this.state.topic    
        ];
        
        if(this.state.name == '' || this.state.address == '' || this.state.topic == '') {

            if(this.state.name == "")  {       
                this.setState({errorName: true})
                this.name.shake()
            } 
            if(this.state.address == "") {                
                this.setState({errorAddress: true})
                this.address.shake()  
            } 
            if(this.state.topic == "") {                
                this.setState({errorTopic: true})
                this.topic.shake()  
            }
        } else {
            this.setState({saveStatus: 'Loading'});
            this.props.store.addStore(...data, state.params.token, (msg) => {
                if(msg.error) {
                    ToastAndroid.showWithGravityAndOffset(
                        msg.error,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        10,
                        200
                    ); 
                    this.setState({saveStatus: 'Save', disableBtn: false});                
                }
                
                if(msg.message) {
                    ToastAndroid.showWithGravityAndOffset(
                        msg.message,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        10,
                        200
                    ); 

                    this.setState({saveStatus: 'Save', disableBtn: false});
                    this.name.clearText();
                    this.address.clearText();
                    this.topic.clearText();
                    this.backToLists();
                }
            });   
        }
 
    }
  
    render() {        
        return(
            <View style={styles.container}>            
                <FormLabel>Name</FormLabel>
                <FormInput 
                    selectionColor='red'
                    autoCorrect={false}
                    ref={name => this.name = name} 
                    underlineColorAndroid="#CED0CE" 
                    inputStyle={{paddingLeft: 5, marginBottom:0}} 
                    placeholder='Enter the name'
                    onChangeText={name => {this.setState({name}); this.setState({errorName: false})}}/>
                    {this.state.errorName == true ?<FormValidationMessage containerStyle={{marginTop: 0, paddingTop: 0}}>
                        {'Name is required'}
                    </FormValidationMessage> : null }   
                <FormLabel>Address</FormLabel>
                <FormInput 
                    selectionColor='red'
                    autoCorrect={false}
                    ref={address => this.address = address} 
                    underlineColorAndroid="#CED0CE" 
                    inputStyle={{paddingLeft: 5}} 
                    placeholder='Enter the address' 
                    onChangeText={address => {this.setState({address}); this.setState({errorAddress: false})}}/>  
                    {this.state.errorAddress == true ?<FormValidationMessage>
                        {'Address is required'}
                    </FormValidationMessage> : null }             
                <FormLabel>Topic</FormLabel>
                <FormInput 
                    selectionColor='red'
                    autoCorrect={false}
                    ref={topic => this.topic = topic} 
                    underlineColorAndroid="#CED0CE" 
                    inputStyle={{paddingLeft: 5}}                 
                    placeholder='Enter the topic' 
                    onChangeText={topic => {this.setState({topic}); this.setState({errorTopic: false})}}/>
                      {this.state.errorTopic == true ?<FormValidationMessage>
                        {'Topic is required'}
                    </FormValidationMessage> : null } 
                    
                <View style={styles.btnView}>
                    <TouchableOpacity 
                        style={styles.addBtn}
                        onPress={this.addStore}
                        disabled={this.state.disableBtn}
                        >
                        <Text style={styles.addTxt}>{this.state.saveStatus}</Text>
                    </TouchableOpacity>
                </View>
            </View>    
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    btnView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    addBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 50,
        backgroundColor: '#EA6055',
        borderRadius: 50,
        marginTop: 20
    },
    addTxt: {
        fontSize: 20,
        color: '#fff'
    }
});

AddStore = inject('store')(observer(AddStore));
export default AddStore;