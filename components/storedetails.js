import React from 'react';
import { ToastAndroid, Text, StyleSheet, View, FlatList, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { observer, inject } from 'mobx-react/native';


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

    componentDidMount() {
        this.setState({loading: true})
        const {state} = this.props.navigation;
        this.props.navigation.setParams({ handleEdit: this._editMode });
        this.props.store.getOneSchedule(state.params.id, (msg) => {            
            this.setState({loading: msg});
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
        return(
            <View style={styles.container}>                   
                <ScrollView> 
                    {this.props.store.schedules.filter(this.getAC).length == 0 ? null :              
                        <Card title="SCHEDULE LIST AC">
                            <FlatList 
                            data={this.props.store.schedules.filter(this.getAC)}
                            renderItem={data => (
                                <ListItem 
                                    leftIcon={{name: 'access-alarms'}}
                                    containerStyle={{borderBottomWidth: 0, paddingLeft: 15, paddingTop: 10, paddingBottom: 5}}
                                    hideChevron                     
                                    title={this.capitalizeFirstLetter(data.item.day)}
                                    subtitle={`Time ON = ${moment(data.item.time_on, "hhmm").format("HH:mm")} - Time OFF = ${moment(data.item.time_off, "hhmm").format("HH:mm")}`}
                                />
                            )}
                            keyExtractor={data => data.id_schedule}    
                            />
                        </Card>
                    }
                    {this.props.store.schedules.filter(this.getSNG).length == 0 ? null :
                        <Card title="SCHEDULE LIST SIGNAGE">
                            <FlatList 
                            data={this.props.store.schedules.filter(this.getSNG)}
                            renderItem={data => (
                                <ListItem 
                                    leftIcon={{name: 'access-alarms'}}
                                    containerStyle={{borderBottomWidth: 0, paddingLeft: 15, paddingTop: 10, paddingBottom: 5}}
                                    hideChevron                     
                                    title={this.capitalizeFirstLetter(data.item.day)}
                                    subtitle={`Time ON = ${moment(data.item.time_on, "hhmm").format("HH:mm")} - Time OFF = ${moment(data.item.time_off, "hhmm").format("HH:mm")}`}
                                />
                            )}
                            keyExtractor={data => data.id_schedule}    
                            />
                        </Card>
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
        backgroundColor: '#fff',
        paddingBottom: 10
    },
    activity: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    form: {
        flexDirection: 'row',
        margin: 5,
        padding: 7,
        backgroundColor: '#fff'
    },
    input: {
        paddingTop: 5,
        paddingBottom: 5,
        width: 80,
        marginLeft: 5,
        color: '#9e9e9e'
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