import React from 'react';
import { ToastAndroid, Text, View, TextInput, TouchableOpacity, StatusBar, AsyncStorage, ActivityIndicator } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class SplashScreen extends React.Component{
    constructor() {
        super()

        this.state = {
            username: '',
            token: '',
            loading: true
        }
    }


    static navigationOptions = ({ navigation }) => { 
        const { params = {} } = navigation.state;
          return{
          title: 'Splash',
          header: null
        }
    }

    componentDidMount() { 
        let author = ['username', 'token'];
        AsyncStorage.multiGet(author, (error, result) => {
            if(error) {
                ToastAndroid.showWithGravityAndOffset(
                    'Please Login',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    10,
                    200
                );
            } else {
                let username = result[0][1];
                let token = result[1][1];
                this.setState({username, token});
                
                if(this.state.token === null) {
                    this._setTime();                           
                } else {           
                    setTimeout(this._navigateToHome.bind(this, username, token), 3000);
                }
            }
        });
    }

    _setTime = () => { 
        setTimeout(this._setState, 3000);
    }

    _setState = () => {
        this.setState({loading: false})
    }

    _renderButton = () => {
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.viewCont}>
                <View style={styles.buttonView}>
                    <TouchableOpacity
                        onPress={() => navigate('Login')} 
                        style={styles.buttonReg}>
                        <Text style={styles.texts}>SIGN IN</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity 
                        onPress={() => navigate('Register')}
                        style={styles.buttonReg}>
                        <Text style={styles.texts}>SIGN UP</Text>
                    </TouchableOpacity> 
                </View> 
            </View> 
        )
    }

    _navigateToHome = (username, token) => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home',  params: { username, token } })],
        });
        this.props.navigation.dispatch(resetAction);
    }


    _renderActivity = () => {
        return(
            <View style={styles.viewCont}>
                <View style={styles.buttonView}>
                    <ActivityIndicator size="large" color="#fff" /> 
                </View> 
            </View>             
        );
    }

    render() {        
        return(
            <View style={styles.container}> 
                <StatusBar
                    backgroundColor= '#EA6055'
                    barStyle="light-content"/> 
                    <View style={styles.logo}>
                        <Text style={styles.Titles}>
                            Alfamart IoT
                        </Text>
                    </View>
                    {this.state.loading ? this._renderActivity() : this._renderButton()}
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#EA6055',  
    },
    Titles: {
        fontSize: 50,
        color: '#fff',
        fontWeight: 'bold'
    },
    logo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewCont: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    texts: {
        fontSize: 15,
        color: '#EA6055',
        fontWeight: 'bold'
    },
    buttonView: {
        justifyContent: 'space-around',        
        flexDirection: 'row',
    },
    buttonReg: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 50,
        marginBottom: 10
    }
}