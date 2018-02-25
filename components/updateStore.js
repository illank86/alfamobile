import React from 'react';
import { ToastAndroid, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react/native';

import store from '../store/liststores';
import  Forms from './form';



class UpdateStore extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id: "",
            name: "",
            address: "",
            topic: "",
            token: "",
            errorName: false,
            errorAddress: false,
            errorTopic: false,
            saveStatus: 'Update',
            disableBtn: false
        }
    }
   
    static navigationOptions = { 
        title: 'Edit Store',
        headerTintColor: '#fff',
        headerTitleStyle: { 
            color:"#fff", 
        },
        headerStyle: {
            backgroundColor: '#EA6055',
        } 
    }

    componentDidMount() {
        const {state} = this.props.navigation;
        this.setState({
            id: state.params.id, 
            name: state.params.name, 
            address: state.params.address,
            topic: state.params.topic,
            token: state.params.token
        });
    }

    backToLists = () => {
        const { goBack } = this.props.navigation;
        goBack();
    }

    updateStore = () => {  
        this.setState({disableBtn: true});
        const { state } = this.props.navigation;
        let data = {
            name: this.state.name,
            address: this.state.address,
            topic: this.state.topic    
        };
        
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
            this.props.store.updateStore(this.state.id, {...data}, this.state.token, (msg) => {
                if(msg.error) {
                    ToastAndroid.showWithGravityAndOffset(
                        msg.error,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        10,
                        200
                    ); 
                    this.setState({saveStatus: 'Update', disableBtn: false});                
                }
                
                if(msg.message) {
                    ToastAndroid.showWithGravityAndOffset(
                        msg.message,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        10,
                        200
                    ); 

                    this.setState({saveStatus: 'Update', disableBtn: false});
                    this.name.clearText();
                    this.address.clearText();
                    this.topic.clearText();
                    this.backToLists();
                }
            });   
        }
 
    }
  
    render() {  
        console.log(this.state.name);      
        return(
            <View style={styles.container}>  

                <Forms
                    name = 'Name'
                    refer = {name => this.name = name}
                    value = {this.state.name} 
                    placeholder = 'Enter the name'
                    edit = {true}
                    onChangeText = {name => {this.setState({name}); this.setState({errorName: false})}}
                    validation = {this.state.errorName} 
                    message = 'Name is required'
                />

                <Forms
                    name = 'Address'
                    refer = {address => this.address = address} 
                    placeholder = 'Enter the address'
                    value = {this.state.address}
                    edit = {true}
                    onChangeText = {address => {this.setState({address}); this.setState({errorAddress: false})}}
                    validation = {this.state.errorAddress} 
                    message = 'Address is required'
                />

                   <Forms
                    name = 'Topic'
                    refer = {topic => this.topic = topic} 
                    placeholder = 'Enter the topic'
                    value = {this.state.topic}
                    edit = {false}
                    onChangeText = {topic => {this.setState({topic}); this.setState({errorTopic: false})}}
                    validation = {this.state.errorTopic} 
                    message = 'Topic is required'
                />


                <View style={styles.btnView}>
                    <TouchableOpacity 
                        style={styles.addBtn}
                        onPress={this.updateStore}
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

UpdateStore = inject('store')(observer(UpdateStore));
export default UpdateStore;