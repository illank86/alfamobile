import React from 'react';
import { ToastAndroid, View, StatusBar, StyleSheet, TouchableOpacity, TouchableHighlight, FlatList, ActivityIndicator, Text, SwipeableListView } from 'react-native';
import { Header, ListItem, Icon, SearchBar, List, Avatar } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';

import { observer, inject } from 'mobx-react/native';


@inject('store')
@observer
export default class Lists extends React.Component {
  constructor(props) {
    super(props);

    this. state = {
      loading: false,
      refresh: false, 
    }
  }

  static navigationOptions = { 
    title: 'Store List', 
    header: null
  }

  componentWillMount() {
      this.setState({loading: true})
      this.props.store.fetchAll((msg) => {
        this.setState({loading: msg})
      })
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
            <ActivityIndicator size="large" color="#9E9E9E" /> 
            <Text style={{fontSize: 20, color: '#9E9E9E'}}>Loading...</Text>
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

	deleteRow(rowKey) {
    this.props.store.deleteOneStore(rowKey, (msg) => {
        ToastAndroid.showWithGravityAndOffset(
          msg,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          10,
          200)
      })
  }
  
  onRefresh = () => {
    this.setState({refresh: !this.state.refresh});
    this.props.store.fetchAll((msg) => {
      this.setState({refresh: !this.state.refresh});  
    })
    
  }


  render() { 
    const { navigate } = this.props.navigation;
      if(this.state.loading) {
        return this.renderActivity();
      } else {
      return (
        <View style={styles.container}>
          <View style={styles.content}>
          <Header
            statusBarProps={{ barStyle: 'light-content', backgroundColor:'#2c3e50' }}
            backgroundColor="#2c3e50"
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'DASHBOARD', style: { color: '#fff' } }}
          />
          {this.props.store.listStore.length == 0 ?          
            <TouchableOpacity style={styles.activity} onPress={()=>this.props.store.fetchAll(msg=>null)}>
              <Text style={styles.welcome}>Please add a store</Text>
            </TouchableOpacity>          
            :
            <SwipeListView
              useFlatList
              data={this.props.store.listStore}
              renderItem={ (data, rowMap) => (
                <TouchableHighlight underlayColor='#CFD8DC' style={styles.ListItem} onPress={() => navigate('StoreDetail', {id: data.item.id_store, name:data.item.name, topic:data.item.topic})}>
                <View style={styles.item}>                        
                  <Avatar
                      medium 
                      rounded                     
                      source={{uri: "https://storage.googleapis.com/snapchat-lens-assets/f1a09194-f02d-43ed-92b8-62e843179ff0/lensStudio/Guides/img/creating_an_icon_world_example.png"}}
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
              ListHeaderComponent={this.renderHeader}
              renderHiddenItem={ (data, rowMap) => (
                <View style={styles.rowBack}>
                    <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(data.item.id_store) }>
                      <Icon                              
                        name='ios-trash'
                        type='ionicon'
                        color='white'
                      />
                    </TouchableOpacity>
                </View>
              )}
              refreshing={this.state.refresh}
              onRefresh={this.onRefresh}
              disableRightSwipe
              rightOpenValue={-75}
          />  
         }  
          </View>
          <TouchableOpacity style={styles.FloatBtn} onPress={() => navigate('AddStore')}>
            <Icon name='add' color='white'/>
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
    backgroundColor: "#E65100",
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
    justifyContent: 'center'
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
		backgroundColor: '#DDD',
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
		backgroundColor: '#EF5350',
		right: 0
  },
  welcome: {
    fontSize: 20,
    color: '#BDBDBD',
  }

})