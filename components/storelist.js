import React from 'react';
import { ToastAndroid, Alert, StyleSheet, View, TouchableHighlight, TouchableOpacity, AsyncStorage, FlatList, ActivityIndicator, Text } from 'react-native';
import { ListItem, List, Avatar } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { observer, inject } from 'mobx-react/native';
import { NavigationActions } from 'react-navigation';

const a = 0;

class Lists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      refresh: false,
      token: '',
      words: 'Please add a store'
    }
  }

  static navigationOptions = ({ navigation }) => { 
    const { params = {} } = navigation.state;
      return{
      title: 'Alfamart Stores',
      headerTintColor: '#fff',
      headerRight:(
        <TouchableOpacity
        onPress={() => params.appLogout()}
        style={styles.seacrhBtn}>
            <Icon name="ios-log-in" size={25} color="#fff" />
        </TouchableOpacity>
    ),
      headerTitleStyle: { 
        color:"#fff", 
      },
      headerStyle: {
        backgroundColor: '#EA6055',
      } 
    }
  }
  
  componentDidMount() {
    const {state} = this.props.navigation;  
    this.props.navigation.setParams({ appLogout: this._logoutMode });
    this.setState({token: state.params.token});
    this.fetchData();
  }

  _deleteConfirm = (rowKey, topic, name) => {
    Alert.alert(
      'Confirmation',
      `Are you sure want to delete ${name} ?`,
      [        
        {text: 'Cancel', onPress: () => null, style: 'cancel'},
        {text: 'OK', onPress: () => this.deleteRow(rowKey, topic)},
      ],
      { cancelable: false }
    )
  }


  _logoutMode = () => {  
    Alert.alert(
      'Confirmation',
      'Are you sure want to logout ?',
      [        
        {text: 'Cancel', onPress: () => null, style: 'cancel'},
        {text: 'OK', onPress: () => this._logOut()},
      ],
      { cancelable: false }
    )
  
  }

  _logOut = () => {    
        let keys = ['username', 'token'];
        AsyncStorage.multiRemove(keys, (err) => {
          if(err) {
            alert(err);
          } else {
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Login' })],
              });
            this.props.navigation.dispatch(resetAction);
          }
        });
  }


  fetchData = () => {    
    this.props.store.fetchAll((msg) => {
      if(msg.error) {
        alert(msg.error)
      } else { 
        this.setState({loading: false});          
        if(msg == 'TypeError: Network request failed') {
          alert(msg);      
          this.setState({words:'Network request failed.'});
        } else {
          if(this.props.store.listStore.length == 0) {   
            this.setState({words: 'Please add a store.'});
          }
        }
      }
    });
  }

  renderSeparator = () => {
    return(
    <View 
      style={{
        height: 1,
        width: '89%',
        backgroundColor: '#CED0CE',
        marginLeft: '20%'
      }}
    />
    )
  }

  renderActivity = () => {
    return(
        <View style={styles.activity}>
            <ActivityIndicator size="large" color="#EA6055" /> 
            <Text style={{fontSize: 20, color: 'grey'}}>Loading...</Text>
        </View>
    )
  }

  renderHeader =() => {
    return(
      <SearchBar
      round
      lightTheme 
      placeholder="Search store here..." 
      />
    )
  }

  closeRow(rowMap, rowKey) {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
  }
  
  _callToast(msg) {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      10,
      200)
  }

	deleteRow(rowKey, topic) {
    this.props.store.deleteOneStore(rowKey, topic, this.state.token, (msg) => {
      if(msg.error) {
        this._callToast(msg.error);
      } else {
        this._callToast(msg);
      }
      })
  }
  
  onRefresh = () => {
    this.setState({refresh: !this.state.refresh});
    this.props.store.fetchAll((msg) => {
      this.setState({refresh: !this.state.refresh});  
    })
    
  }

  _renderSwipe = () => {
    const { navigate, state } = this.props.navigation;
    return(
        <SwipeListView
          useFlatList
          data={this.props.store.listStore}
          renderItem={ (data, rowMap) => (
            <TouchableHighlight underlayColor='#CFD8DC' style={styles.ListItem} onPress={() => navigate('Storedetail', {id: data.item.id_store, name:data.item.name, topic:data.item.topic, token:this.state.token })}>
            <View style={styles.item}>                        
              <Avatar
                  medium 
                  rounded                     
                  source={require('../assets/icons.png')}
                  onPress={() => alert("Works!")}
                  activeOpacity={0.7}
                />
              <View style={styles.itemText}>  
                <Text style={styles.name}>{data.item.name}</Text>
                <Text style={styles.address}>{data.item.address}</Text> 
              </View>                    
            </View>
            </TouchableHighlight>
          )}
          keyExtractor = {data => data.id_store}
          ItemSeparatorComponent={this.renderSeparator}            
          renderHiddenItem={ (data, rowMap) => (
            <View style={styles.rowBack}>
              <TouchableOpacity style={[styles.backRightBtn, styles.editBtn]} onPress={() => navigate('UpdateStore', {id:data.item.id_store, name:data.item.name, address:data.item.address, topic:data.item.topic, token: this.state.token })}>
                  <Icon                              
                    name='ios-create-outline'                        
                    color='white'
                    size={30}
                  />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ () => this._deleteConfirm(data.item.id_store, data.item.topic, data.item.name) }>
                  <Icon                              
                    name='ios-trash'                        
                    color='white'
                    size={30}
                  />
              </TouchableOpacity> 
            </View>               
          )}
          refreshing={this.state.refresh}
          onRefresh={this.onRefresh}
          leftOpenValue={75}
          rightOpenValue={-75}
          onRowOpen={(rowKey, rowMap) => {
            setTimeout(() => {
                rowMap[rowKey] && rowMap[rowKey].closeRow()
            }, 2000)
          }}
      />  
    )
  }

  _renderWords = () => {
    return(
      <TouchableOpacity style={styles.activity} onPress={()=>{this.fetchData(); this.setState({loading: true})}}>
        <Text style={styles.welcome}>{this.state.words}</Text>
      </TouchableOpacity>          
    )
  }


  render() { 
    const { navigate, state } = this.props.navigation;  
    if(this.state.loading) {      
      return this.renderActivity();
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            {this.props.store.listStore.length == 0 ? this._renderWords() : this._renderSwipe()}
          </View>
          <TouchableOpacity style={styles.FloatBtn} onPress={() => navigate('Addstore', {token: this.state.token})}>
            <Icon name='ios-add' size={40} color='#fff'/>
          </TouchableOpacity>
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  FloatBtn: {
    flex: 1,
    position: "absolute",
    width: 50,
    height: 50,
    backgroundColor: '#EA6055',
    borderRadius: 50,
    bottom: 10,
    right: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },
  content: {
    width: '100%',
    height: '100%'
  },
  activity: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  ListItem: { 
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 60,  
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#E0E0E0',
    alignItems: 'center',
    marginLeft: 10
  },
  itemText: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10
  },
  name: {
    fontSize: 16,
    color: '#757575',
  },
  address: {
    fontSize: 14,
    color: '#BDBDBD',
  },
  rowBack: {
		alignItems: 'center',
		backgroundColor: '#3c3c3c',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
  backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnRight: {
		backgroundColor: '#EA6055',
		right: 0
  },
  welcome: {
    fontSize: 20,
    color: '#BDBDBD',
  },
  seacrhBtn: {
    marginRight: 20
  },
  editBtn: {
		backgroundColor: '#00796B',
	  left: 0
  }

});

Lists = inject('store')(observer(Lists));
export default Lists;