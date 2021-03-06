import React from 'react';
import { ToastAndroid, Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react/native';

import store from '../store/liststores';
import  Forms from './form';



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

            this.setState({disableBtn: false});
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

                <Forms
                    name = 'NAME'
                    refer = {name => this.name = name} 
                    placeholder = 'Enter the name'
                    editable = {true}
                    onChangeText = {name => {this.setState({name}); this.setState({errorName: false})}}
                    validation = {this.state.errorName} 
                    message = 'Name is required'
                />

                <Forms
                    name = 'ADDRESS'
                    refer = {address => this.address = address} 
                    placeholder = 'Enter the address'
                    editable = {true}
                    onChangeText = {address => {this.setState({address}); this.setState({errorAddress: false})}}
                    validation = {this.state.errorAddress} 
                    message = 'Address is required'
                />

                   <Forms
                    name = 'TOPIC'
                    refer = {topic => this.topic = topic} 
                    placeholder = 'Enter the topic'
                    editable = {true}
                    onChangeText = {topic => {this.setState({topic}); this.setState({errorTopic: false})}}
                    validation = {this.state.errorTopic} 
                    message = 'Topic is required'
                />


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