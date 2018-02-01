import React from 'react';
import { ToastAndroid, Text, StyleSheet, View, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { Card, ListItem, Button} from 'react-native-elements';
import moment from 'moment';

import { observer, inject } from 'mobx-react/native';

@inject('store')
@observer
export default class StoreDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            edit: false,         
        }
    }
    
    static navigationOptions = ({ navigation }) => { 
        const { params = {} } = navigation.state;
        return {
            title: `${params.name} Detail`,
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2c3e50', 
                elevation: null
            },
            headerTitleStyle: {
                color: '#fff'
            } 
        }    
    }

    getAC = (comp) => {
        return comp.id_komponen == 0;
    }

    getSNG = (comp) => {
        return comp.id_komponen == 1;
    }

    componentDidMount() {
        this.setState({loading: true})
        const {state} = this.props.navigation;
        this.props.store.getOneSchedule(state.params.id, (msg) => {            
            this.setState({loading: msg});
        });
    };

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    _editMode = () => {
        this.setState({edit: !this.state.edit})
    }

    renderActivity = () => {
        return(
            <View style={styles.activity}>
                <ActivityIndicator size="large" color="#9E9E9E" /> 
            </View>
        )
    }

    renderCardItem = () => {      
        return(        
            <ScrollView>               
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
                <Button
                    large
                    containerViewStyle={{marginTop: 15, marginBottom: 10}}
                    onPress={this._editMode}
                    backgroundColor='#607D8B'
                    icon={{name: 'edit', type: 'font-awesome'}}
                    title='EDIT' />        
            </ScrollView>
        )
    }
    
    renderButtonAdd = () => {
        const { state, navigate } = this.props.navigation;
        return(
            <View style={styles.activity}>
                <Button
                large
                onPress={()=> navigate('AddSchedule', {id: state.params.id, name: state.params.name, topic: state.params.topic})}
                backgroundColor='#607D8B'
                icon={{name: 'add'}}
                title='ADD SCHEDULE' /> 
            </View>
        )
    }

    render() {
        console.log(this.props.store.schedules.filter(this.getSNG)) 
        if(this.state.loading) {
            return this.renderActivity()
        } else {
            return(            
            this.props.store.schedules.length === 0 ? this.renderButtonAdd() : this.renderCardItem()
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: '100%'
    },
    activity: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
    }
})