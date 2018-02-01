import React from 'react';
import { ToastAndroid, Text, StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import moment from 'moment';


export default class UpdateSchedule extends React.Component {
    render() {
        return(
            <View>
                {this.props.store.schedules.map((data, i) => {
                    return (
                        <View style={styles.form} key={i}> 
                            <Text style={styles.title}>{data.day}</Text>                   
                            <Text style={styles.input}>{moment(data.time_on, "hhmm").format("HH:mm")}</Text>
                            <Text style={styles.input}>{moment(data.time_off, "hhmm").format("HH:mm")}</Text>
                        </View>)
                })}
                                
                <Button
                    large
                    containerViewStyle={{marginTop: 15}}
                    onPress={this._editMode}
                    backgroundColor='#607D8B'
                    icon={{name: 'save', type: 'font-awesome'}}
                    title='SAVE' />                     
            </View>
        )
    }
}