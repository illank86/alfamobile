import React from 'react';
import { ToastAndroid, Text, StyleSheet, View, TextInput } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

import { observer, inject } from 'mobx-react/native';

import store from '../store/liststores';



@inject('store')
@observer
export default class AddStore extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: "",
            address: "",
            topic: "",
            errorName: false,
            errorAddress: false,
            errorTopic: false
        }
    }
   
    static navigationOptions = { 
        title: 'Add Store',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#2c3e50', 
            elevation: null
        },
        headerTitleStyle: {
            color: '#fff'
        }     
    }

    backToLists = () => {
        const { goBack } = this.props.navigation;
        goBack();
    }

    addStore = () => {  
        let data = [
            this.state.name,
            this.state.address,
            this.state.topic    
        ]

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
            this.props.store.addStore(...data, (msg) => {            
                ToastAndroid.showWithGravityAndOffset(
                    msg,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    10,
                    200
                ); 
                
                this.name.clearText();
                this.address.clearText();
                this.topic.clearText();
                this.backToLists();
                
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

                <Button
                    containerViewStyle={{marginTop: 25}}
                    large
                    raised
                    onPress={this.addStore.bind(this)}
                    backgroundColor='#607D8B'
                    icon={{name: 'add'}}
                    title='ADD STORE' />
            </View>    
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})