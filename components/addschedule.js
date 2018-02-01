import React from 'react';
import { ToastAndroid, Text, StyleSheet, View, FlatList, TextInput, Picker } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { inject, observer } from 'mobx-react/native';


@inject('store')
@observer
export default class AddSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            all: false,
            all_on: '',
            all_off: '',
            edited: '',
            senin_on: '',
            senin_off: '',
            selasa_on: '',
            selasa_off: '',
            rabu_on: '',
            rabu_off: '',
            kamis_on: '',
            kamis_off: '',
            jumat_on: '',
            jumat_off: '',
            sabtu_on: '',
            sabtu_off: '',
            minggu_on: '',
            minggu_off: '',
            komponen: '',

        }
        
 
    }
    static navigationOptions = ({ navigation }) => { 
        const { state } = navigation;
        return {
            title: `Add ${state.params.name} Schedule`,
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

    componentDidMount() {
        const { state } = this.props.navigation;
        console.log(state.params.id);
        console.log(state.params.name);
        console.log(state.params.topic);
        
    }

    backToSchedule = () => {
        const { goBack } = this.props.navigation;
        goBack();
    }

    saveSchedule = () => {
        const { state } = this.props.navigation;
        let datas;
        if(this.state.all) {
            datas = {
                senin: {
                    day:'senin', time_on: this.state.all_on, time_off: this.state.all_off
                },
                selasa: {
                    day:'selasa', time_on: this.state.all_on, time_off: this.state.all_off
                },
                rabu: {
                    day:'rabu', time_on: this.state.all_on, time_off: this.state.all_off
                },
                kamis: {
                    day:'kamis', time_on: this.state.all_on, time_off: this.state.all_off
                },
                jumat: {
                    day:'jumat', time_on: this.state.all_on, time_off: this.state.all_off
                }, 
                sabtu: {
                    day:'sabtu', time_on: this.state.all_on, time_off: this.state.all_off
                },
                minggu: {
                    day:'minggu', time_on: this.state.all_on, time_off: this.state.all_off
                },
                id_store: state.params.id,
                topic: state.params.topic,  
                komponen: this.state.komponen
            }
        } else {
            datas = {
                senin: {
                    day:'senin', time_on: this.state.senin_on, time_off: this.state.senin_off
                },
                selasa: {
                    day:'selasa', time_on: this.state.selasa_on, time_off: this.state.selasa_off
                },
                rabu: {
                    day:'rabu', time_on: this.state.rabu_on, time_off: this.state.rabu_off
                },
                kamis: {
                    day:'kamis', time_on: this.state.kamis_on, time_off: this.state.kamis_off
                },
                jumat: {
                    day:'jumat', time_on: this.state.jumat_on, time_off: this.state.jumat_off
                }, 
                sabtu: {
                    day:'sabtu', time_on: this.state.sabtu_on, time_off: this.state.sabtu_off
                },
                minggu: {
                    day:'minggu', time_on: this.state.minggu_on, time_off: this.state.minggu_off
                },
                id_store: state.params.id,
                topic: state.params.topic,
                komponen: this.state.komponen    
            }
        };        
       
        this.props.store.saveSchedule((msg) => {
            if(msg == 'one or more field is empty') {
                ToastAndroid.showWithGravityAndOffset(
                    msg,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    10,
                    200
                );
            } else {
                ToastAndroid.showWithGravityAndOffset(
                    msg,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    10,
                    200
                );
            }            
        }, {...datas})

    }

    _showDateTimePicker = (msgs) => {
        this.setState({ isDateTimePickerVisible: true, edited: msgs });       
    }
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
   
    _handleDatePicked = (date) => {
      if(this.state.edited == 'senin_on') {
        this.setState({senin_on: moment(date, "hhmm").format("HH:mm")})         
      } else if(this.state.edited == 'senin_off') {
        this.setState({senin_off: moment(date, "hhmm").format("HH:mm")})
      } else if(this.state.edited == 'selasa_on') {
        this.setState({selasa_on: moment(date, "hhmm").format("HH:mm")})
      } else if(this.state.edited == 'selasa_off') {
        this.setState({selasa_off: moment(date, "hhmm").format("HH:mm")})
      } else if(this.state.edited == 'rabu_on') {
        this.setState({rabu_on: moment(date, "hhmm").format("HH:mm")})
      } else if(this.state.edited == 'rabu_off') {
        this.setState({rabu_off: moment(date, "hhmm").format("HH:mm")})
      } else if(this.state.edited == 'kamis_on') {
        this.setState({kamis_on: moment(date, "hhmm").format("HH:mm")})
      } else if(this.state.edited == 'kamis_off') {
        this.setState({kamis_off: moment(date, "hhmm").format("HH:mm")})
      } else if(this.state.edited == 'jumat_on') {
        this.setState({jumat_on: moment(date, "hhmm").format("HH:mm")})
      } else if(this.state.edited == 'jumat_off') {
        this.setState({jumat_off: moment(date, "hhmm").format("HH:mm")})
      } else if(this.state.edited == 'sabtu_on') {
        this.setState({sabtu_on: moment(date, "hhmm").format("HH:mm")})
      } else if(this.state.edited == 'sabtu_off') {
        this.setState({sabtu_off: moment(date, "hhmm").format("HH:mm")})
      } else if(this.state.edited == 'minggu_on') {
        this.setState({minggu_on: moment(date, "hhmm").format("HH:mm")})
      } else if(this.state.edited == 'minggu_off') {
        this.setState({minggu_off: moment(date, "hhmm").format("HH:mm")})
      }  else if(this.state.edited == 'all_on') {
        this.setState({all_on: moment(date, "hhmm").format("HH:mm")})
      } else if(this.state.edited == 'all_off') {
        this.setState({all_off: moment(date, "hhmm").format("HH:mm")})
      }
     
      this._hideDateTimePicker();
    };


    render() {
        const { state } = this.props.navigation;
        console.log(this.state.komponen)
        return( 
            <View style={styles.container}>
                <ListItem
                    leftIcon = {{name: 'access-alarm'}}
                    hideChevron
                    onSwitch = {()=> this.setState({all: !this.state.all})}
                    switched = {this.state.all}
                    switchButton = {true}
                    title='Set one timer'
                    subtitle='Set one timer for 7 days a week'
                  
                />
                <View style={styles.picker}>   
                    <Picker
                        selectedValue={this.state.komponen}
                        onValueChange={(itemValue, itemIndex) => this.setState({komponen: itemValue})}>
                        <Picker.Item label="Air Conditioner" value="0" />
                        <Picker.Item label="Signage" value="1" />
                    </Picker>
                </View>             
                {this.state.all == true ? 
                    <View>
                        <View style={styles.form}> 
                            <Text style={styles.title}>Everyday</Text>                   
                            <Text style={styles.input} onPress={this._showDateTimePicker.bind(this, 'all_on')}>{this.state.all_on == "" ? 'Time On' : this.state.all_on}</Text>
                            <Text style={styles.input} onPress={this._showDateTimePicker.bind(this, 'all_off')}>{this.state.all_off == "" ? 'Time Off' : this.state.all_off}</Text>
                        </View>
                    </View>                    
                    :
                    <View>
                        <View style={styles.form}> 
                            <Text style={styles.title}>Senin</Text>                   
                            <Text style={styles.input} onPress={this._showDateTimePicker.bind(this, 'senin_on')}>{this.state.senin_on == "" ? 'Time On' : this.state.senin_on}</Text>
                            <Text style={styles.input} onPress={this._showDateTimePicker.bind(this, 'senin_off')}>{this.state.senin_off == "" ? 'Time Off' : this.state.senin_off}</Text>
                        </View> 
                        <View style={styles.form}> 
                            <Text style={styles.title}>Selasa</Text>
                            <Text style={styles.input} onPress={this._showDateTimePicker.bind(this, 'selasa_on')}>{this.state.selasa_on == "" ? 'Time On' : this.state.selasa_on}</Text>
                            <Text style={styles.input} onPress={this._showDateTimePicker.bind(this, 'selasa_off')}>{this.state.selasa_off == "" ? 'Time Off' : this.state.selasa_off}</Text>
                        </View> 
                        <View style={styles.form}> 
                            <Text style={styles.title}>Rabu</Text>
                            <Text style={styles.input} onPress={this._showDateTimePicker.bind(this, 'rabu_on')}>{this.state.rabu_on == "" ? 'Time On' : this.state.rabu_on}</Text>
                            <Text style={styles.input} onPress={this._showDateTimePicker.bind(this, 'rabu_off')}>{this.state.rabu_off == "" ? 'Time Off' : this.state.rabu_off}</Text>
                        </View> 
                        <View style={styles.form}> 
                            <Text style={styles.title}>Kamis</Text>
                            <Text style={styles.input} onPress={this._showDateTimePicker.bind(this, 'kamis_on')}>{this.state.kamis_on == "" ? 'Time On' : this.state.kamis_on}</Text>
                            <Text style={styles.input} onPress={this._showDateTimePicker.bind(this, 'kamis_off')}>{this.state.kamis_off == "" ? 'Time Off' : this.state.kamis_off}</Text>
                        </View> 
                        <View style={styles.form}> 
                            <Text style={styles.title}>Jumat</Text>
                            <Text style={styles.input} onPress={this._showDateTimePicker.bind(this, 'jumat_on')}>{this.state.jumat_on == "" ? 'Time On' : this.state.jumat_on}</Text>
                            <Text style={styles.input} onPress={this._showDateTimePicker.bind(this, 'jumat_off')}>{this.state.jumat_off == "" ? 'Time Off' : this.state.jumat_off}</Text>
                        </View> 
                        <View style={styles.form}> 
                            <Text style={styles.title}>Sabtu</Text>
                            <Text style={styles.input} onPress={this._showDateTimePicker.bind(this, 'sabtu_on')}>{this.state.sabtu_on == "" ? 'Time On' : this.state.sabtu_on}</Text>
                            <Text style={styles.input} onPress={this._showDateTimePicker.bind(this, 'sabtu_off')}>{this.state.sabtu_off == "" ? 'Time Off' : this.state.sabtu_off}</Text>
                        </View> 
                        <View style={styles.form}> 
                            <Text style={styles.title}>Minggu</Text>
                            <Text style={styles.input} onPress={this._showDateTimePicker.bind(this, 'minggu_on')}>{this.state.minggu_on == "" ? 'Time On' : this.state.minggu_on}</Text>
                            <Text style={styles.input} onPress={this._showDateTimePicker.bind(this, 'minggu_off')}>{this.state.minggu_off == "" ? 'Time Off' : this.state.minggu_off}</Text>
                        </View> 
                    </View>
                }
                    <Button
                        large
                        raised
                        onPress = {this.saveSchedule}
                        iconRight={{name: 'save'}}
                        containerViewStyle={{marginTop: 10}}                  
                        backgroundColor='#607D8B'                   
                        title='SAVE' /> 

                    <DateTimePicker
                        mode= 'time'
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                    />   
                           
            </View>     
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,  
        padding: 9   
    }, 
    form: {
        flexDirection: 'row',
        margin: 4,
        padding: 1,
        backgroundColor: '#fff'
    },
    input: {
        paddingTop: 10,
        paddingBottom: 10,
        width: 80,
        marginLeft: 40,
        color: '#9e9e9e'
    },
    title: { 
        paddingTop: 10,
        paddingBottom: 10,
        width: 60, 
        marginRight: 10,
        marginLeft: 10,  
    },
    picker: {
        backgroundColor: 'white',
        margin: 5,
    }
})