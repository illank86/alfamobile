import React from 'react';
import { ToastAndroid, Text, StyleSheet, View, FlatList, TextInput, Picker, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { observer, inject } from 'mobx-react/native';

class RegisterScreen extends React.Component{
    constructor() {
        super() 

        this.state = {
            username: '',
            name: '',
            email: '',
            password: '',
            passwordMatch: '',
            signupWord: 'SIGN UP',
            showPass: true,
            disabledBtn: false
        }
    }

    static navigationOptions = ({ navigation }) => { 
        const { params = {} } = navigation.state;
          return{
          title: 'Register',
          header: null
        }
    }
    _showPwd = () => {
        this.setState({showPass: !this.state.showPass})
    }

    onRegister = () => {
        this.setState({signupWord: 'LOADING', disabledBtn: true})
        let data = {
            username: this.state.username,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            passwordMatch: this.state.passwordMatch
        }
        this.props.store.registerUser((msg) => {
            if(msg.error) {
                alert(msg.error);
                this.setState({signupWord: 'SIGN UP', disabledBtn: false})
            } else {
                if(msg == 'TypeError: Network request failed') {
                    this.setState({signupWord: 'SIGN UP', disabledBtn: false})
                    alert(msg)
                } else {  
                    alert(msg.message);
                    this.setState({signupWord: 'SIGN UP', disabledBtn: false})
                    this.setState({username: '', name: '', email: '', password: '', passwordMatch: ''})
                    
                }
            }
        }, {...data});
    }


    render() {
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>          
                <StatusBar
                    backgroundColor= '#EA6055'
                    barStyle="light-content"/>
                <View style={styles.logoView}>
                    <Text style={styles.Titles}>
                        Register
                    </Text>
                </View>
      
                <View style={styles.forms}> 
                    <View style={styles.inputView}>
                        <View style={styles.inputIcon}>
                            <Icon name="ios-person-outline" size={25} color="#fff" />
                        </View>
                        <View style={styles.txtInput}>    
                            <TextInput
                                style = {styles.textInputs}                            
                                onChangeText = {username => this.setState({username})}
                                value = {this.state.username}
                                underlineColorAndroid = 'transparent'
                                placeholder = 'Username'
                            />
                        </View>
                    </View>
                    <View style={styles.inputView}>
                        <View style={styles.inputIcon}>
                            <Icon name="ios-contact-outline" size={20} color="#fff" />
                        </View>
                        <View style={styles.txtInput}>
                            <TextInput
                                style ={styles.textInputs}                              
                                onChangeText = {name => this.setState({name})}
                                value = {this.state.name}
                                underlineColorAndroid = 'transparent'
                                placeholder = 'Name'
                            />
                        </View>
                    </View>
                    <View style={styles.inputView}>
                        <View style={styles.inputIcon}>
                            <Icon name="ios-mail-outline" size={20} color="#fff" />
                        </View>
                        <View style={styles.txtInput}>
                            <TextInput
                                style = {styles.textInputs} 
                                onChangeText = {email => this.setState({email})}
                                value = {this.state.email}
                                underlineColorAndroid = 'transparent'
                                placeholder = 'Email'
                            />
                        </View>
                    </View>
                    <View style={styles.inputView}>
                        <View style={styles.inputIcon}>
                            <Icon name="ios-key-outline" size={20} color="#fff" />
                        </View>
                        <View style={styles.txtInput}>
                            <TextInput
                                style ={styles.textInputs}
                                onChangeText = {password => this.setState({password})}
                                value = {this.state.password}
                                underlineColorAndroid = 'transparent'
                                placeholder = 'Password'
                                secureTextEntry = {this.state.showPass}
                            />
                        </View>
                        <View>
                            <TouchableOpacity onPress={this._showPwd}>
                                {this.state.showPass ? <Icon name="ios-eye-outline" size={25} color="#fff" /> : <Icon name="ios-eye-off-outline" size={25} color="#fff" />}
                            </TouchableOpacity> 
                        </View>     
                    </View>
                    <View style={styles.inputView}>
                        <View style={styles.inputIcon}>
                            <Icon name="ios-key-outline" size={20} color="#fff" />
                        </View>
                        <View style={styles.txtInput}>
                            <TextInput
                                style = {styles.textInputs} 
                                onChangeText = {passwordMatch => this.setState({passwordMatch})}
                                value = {this.state.passwordMatch}
                                underlineColorAndroid = 'transparent'
                                placeholder = 'Confirm Password'
                                secureTextEntry = {this.state.showPass}
                            />
                        </View>
                    </View>
                    <TouchableOpacity onPress={this.onRegister} style={styles.loginBtn} disabled={this.state.disabledBtn}>
                        <Text style={styles.loginTxt}>{this.state.signupWord}</Text>
                    </TouchableOpacity>   
                </View> 
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#EA6055'
    },
    logoView: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'

    },
    Titles: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
    },
    inputView: {        
        flexDirection: 'row',
        alignItems: 'center',
        width: 300, 
        borderRadius: 50,
        backgroundColor: '#424242',
        paddingLeft: 15,
        marginBottom: 10,
    },
    inputIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    txtInput: {
        paddingLeft: 5,
        marginLeft: 1,
        width: 230, 
    },
    texts: {
        fontSize: 20,
        color: '#fff'
    },
    textInputs: {
        fontSize: 15,
        height: 45,
        width: 250,
        paddingLeft: 10,
        paddingRight: 10,
        color: '#fff'
    },
    loginBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 290,
        height: 45,
        borderRadius: 50,
        backgroundColor: '#fff',
        marginTop: 10
    },
    loginTxt: {
        color: '#EA6055',
        fontSize: 19,
        fontWeight: 'bold'
    },
    forms: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    SignupTxt: {
        fontWeight: 'bold',
        color: '#BBDEFB'
    }
};

RegisterScreen = inject('store')(observer(RegisterScreen));
export default RegisterScreen;