import React from 'react';
import { ToastAndroid, Text, StyleSheet, View, FlatList, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { observer, inject } from 'mobx-react/native';

import StatusItem from './status';
import ScheduleCards from './schedulecard';


class StoreDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,        
        }
    }
    
    static navigationOptions = ({ navigation }) => { 
        const { params = {} } = navigation.state;
        return {
            title: `${params.name} Detail`,
            headerRight:(
                <TouchableOpacity
                onPress={() => params.handleEdit()}
                style={styles.editBtn}>
                    <Icon name="ios-copy-outline" size={30} color="#fff" />
                </TouchableOpacity>
             ),
             headerTintColor: '#fff',
             headerTitleStyle: { 
                 color:"#fff", 
             },
             headerStyle: {
                 backgroundColor: '#EF5350',
             } 
        }    
    }

    getAC = (comp) => {
        return comp.id_komponen == 1;
    }

    getSNG = (comp) => {
        return comp.id_komponen == 2;
    }

    _round = (value, precision) => {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    _callToast(msg) {
        ToastAndroid.showWithGravityAndOffset(
          msg,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          10,
          200)
      }

    componentDidMount() {
        this.setState({loading: true});
        const {state} = this.props.navigation;
        this.props.navigation.setParams({ handleEdit: this._editMode });
        this.props.store.getOneSchedule(state.params.id, (msgs) => {
            if(msgs.error) {
                this._callToast(msgs.error);
            } else {          
                this.props.store.getOneReport(state.params.id, (msg) => {
                    if(msg.error) {
                        this._callToast(msg.error);
                    } else {
                        this.setState({loading: msg});
                    }         
                }); 
            }
        }); 
       
    };

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    _editMode = () => {
        const { state, navigate } = this.props.navigation;
        navigate('AddSchedule', {id: state.params.id, name: state.params.name, topic: state.params.topic})
    }

    renderActivity = () => {
        return(
            <View style={styles.activity}>
                <ActivityIndicator size="large" color="#EF5350" /> 
            </View>
        )
    }

    renderCardItem = () => {
        const { store } = this.props;     
        return(
            <View style={styles.container}>
                {store.reports.length == 0 ? null :
                    <StatusItem
                        AM = {store.reports[0].status_auto_manual == 0 ? 'M' : 'A'}
                        phase3 = {store.reports[0].status_3phase == 0 ? <Icon name="ios-snow" size={20} color="#BDBDBD" /> : <Icon name="ios-snow" size={20} color="#8BC34A" />}
                        phase1 = {store.reports[0].status_1phase == 0 ? <Icon name="ios-bulb" size={20} color="#BDBDBD" /> : <Icon name="ios-bulb" size={20} color="#8BC34A" />}
                        timestamps = {moment(store.reports[0].timestamp).format("YYYY-MM-DD HH:mm:ss")}
                        currentR = {this._round(store.reports[0].current_r, 1)} 
                        currentS = {this._round(store.reports[0].current_s, 1)} 
                        currentT = {this._round(store.reports[0].current_t, 1)}
                        currentSNG = {this._round(store.reports[0].current_sng, 1)} 
                    />
                }                  
                <ScrollView contentContainerStyle={styles.contentContainer}> 
                    {store.schedules.filter(this.getAC).length == 0 ? null :
                        <ScheduleCards 
                            titles ='SCHEDULE LIST AC'
                            data = {store.schedules.filter(this.getAC)}
                            renderitems = {data => (
                                <ListItem 
                                    leftIcon={{name: 'access-alarms'}}
                                    containerStyle={{borderBottomWidth: 0, paddingLeft: 15, paddingTop: 10, paddingBottom: 5}}
                                    hideChevron                     
                                    title={this.capitalizeFirstLetter(data.item.day)}
                                    subtitle={`Time ON = ${moment(data.item.time_on, "hhmm").format("HH:mm")} - Time OFF = ${moment(data.item.time_off, "hhmm").format("HH:mm")}`}
                                />
                            )}

                            keyExtractor = {data => data.id_schedule}
                        />
                    }
                    {store.schedules.filter(this.getSNG).length == 0 ? null :
                        <ScheduleCards 
                            titles ='SCHEDULE LIST SIGNAGE'
                            data = {store.schedules.filter(this.getSNG)}
                            renderitems = {data => (
                                <ListItem 
                                    leftIcon={{name: 'access-alarms'}}
                                    containerStyle={{borderBottomWidth: 0, paddingLeft: 15, paddingTop: 10, paddingBottom: 5}}
                                    hideChevron                     
                                    title={this.capitalizeFirstLetter(data.item.day)}
                                    subtitle={`Time ON = ${moment(data.item.time_on, "hhmm").format("HH:mm")} - Time OFF = ${moment(data.item.time_off, "hhmm").format("HH:mm")}`}
                                />
                            )}

                            keyExtractor = {data => data.id_schedule}
                        />
                    }      
                </ScrollView> 
            </View>          
        )
    }

    renderAddTxt = () => {
        const { state, navigate } = this.props.navigation;
        return(
            <View style={styles.activity}>
                <Text style={styles.addTxt}>Add Schedule</Text>
            </View>
        )
    }

    render() {
        if(this.state.loading) {
            return this.renderActivity()
        } else {
            return(            
            this.props.store.schedules.length === 0 ? this.renderAddTxt() : this.renderCardItem()
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BDBDBD',
    },
    activity: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    contentContainer: {
        paddingBottom: 20,
    },
    title: { 
        paddingTop: 5,
        paddingBottom: 5,
        width: 70, 
        marginRight: 50,
        marginLeft: 10,  
    }, 
    editBtn: {
        marginRight: 20
    },
    addTxt: {
        fontSize: 20,
        color: 'grey'
    }
});

StoreDetail = inject('store')(observer(StoreDetail));
export default StoreDetail;