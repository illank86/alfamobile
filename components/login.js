import React from 'react';
import { ToastAndroid, Text, Image, View, TextInput, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { observer, inject } from 'mobx-react/native';
import { NavigationActions } from 'react-navigation';


class LoginScreen extends React.Component{
    constructor() {
        super()

        this.state = {
            username: '',
            password: '',
            signinWord: 'SIGN IN',
            showPass: true
        }
    }

    static navigationOptions = ({ navigation }) => { 
        const { params = {} } = navigation.state;
          return{
          title: 'Login',
          header: null
        }
    }

    onLogin = () => {
        this.setState({signinWord: 'LOADING'});
        this.props.store.loginUser(this.state.username, this.state.password, (msg) => {
            if(msg.error) {
                alert(msg.error);
                this.setState({signinWord: 'SIGN IN'});
            } else {  
                if(msg == 'TypeError: Network request failed') {
                    this.setState({signinWord: 'SIGN IN'});
                    alert(msg)
                } else {         
                    let author = [['username', msg.username], ['token', msg.token]];  
                   
                    AsyncStorage.multiSet(author, (error) => {
                        if(error) {
                            alert("Error: Unable to set Authorization");
                            this.setState({signinWord: 'SIGN IN'});
                        } else {                            
                            ToastAndroid.showWithGravityAndOffset(
                                msg.message,
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                                10,
                                200
                            );
            
                            const resetAction = NavigationActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'Home' })],
                            });
                            this.props.navigation.dispatch(resetAction);
                        }
                    });
                }
            }
        })
    }

    _showPwd = () => {
        this.setState({showPass: !this.state.showPass});
    }

    render() {
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>          
                <StatusBar
                    barStyle="light-content"/>
                <View style={styles.logoView}>
                    <Text style={styles.Titles}>
                        Alfamart IoT
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
                                <Icon name="ios-eye-outline" size={30} color="#fff" />
                            </TouchableOpacity> 
                        </View>     
                       
            
                    </View>
                    <TouchableOpacity onPress={this.onLogin} style={styles.loginBtn}>
                        <Text style={styles.loginTxt}>{this.state.signinWord}</Text>
                    </TouchableOpacity>   
                </View>     
                <View style={styles.footer}>
                    <Text style={styles.textFooter}>Don't have an account?</Text>
                    <TouchableOpacity>
                        <Text style={[styles.textFooter, styles.SignupTxt]}> Signup</Text>
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    Titles: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold'
    },
    inputView: {        
        flexDirection: 'row',
        alignItems: 'center',
        width: 300, 
        borderRadius: 50,
        backgroundColor: '#424242',
        marginBottom: 10,
        paddingLeft: 15,                       
    },
    inputIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    txtInput: {
        paddingLeft: 10,
        marginLeft: 1
        
    },
    texts: {
        fontSize: 20,
        color: '#fff'
    },
    textInputs: {
        fontSize: 15,
        height: 45,
        width: 230,
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
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textFooter: {
        fontSize: 15,
        color: '#fff',
        marginBottom: 9
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    SignupTxt: {
        fontWeight: 'bold',
        color: '#BBDEFB'
    }
}

LoginScreen = inject('store')(observer(LoginScreen));
export default LoginScreen;