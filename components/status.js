import React from 'react';
import { View, Text } from 'react-native';

const StatusItem = (props) => {
    return(
        <View style={styles.container}>
            <View style={styles.notifTxt}>
                <View style={styles.iconTxt}>
                    <Text style={[styles.autoMan, styles.txtPadding]}>{props.AM}</Text>
                    <Text style={[styles.titleTxt, styles.txtPadding]}>{props.phase3}</Text>
                    <Text style={[styles.titleTxt, styles.txtPadding]}>{props.phase1}</Text>
                </View>
                <View style={styles.timeTxt}>
                    <Text style={styles.titleTxt}>Last received: {props.timestamps}</Text>
                </View>
            </View>
            <View style={styles.secondContainer}>
                <View style={styles.subContainer}>
                    <Text style={styles.textSts}>{props.currentR}</Text>               
                </View>
                <View style={[styles.subContainer, styles.borderLeft]}>
                    <Text style={styles.textSts}>{props.currentS}</Text>              
                </View>
                <View style={[styles.subContainer, styles.borderLeft]}>
                    <Text style={styles.textSts}>{props.currentT}</Text>             
                </View>
                <View style={[styles.subContainer, styles.borderLeft]}>               
                    <Text style={styles.textSts}>{props.currentSNG}</Text>                  
                </View>
            </View>
            <View style={styles.secondContainer}>
                <View style={styles.subContainer}>
                    <Text style={styles.titleTxt}>Current R</Text>               
                </View>
                <View style={styles.subContainer}>
                    <Text style={styles.titleTxt}>Current S</Text>              
                </View>
                <View style={styles.subContainer}>
                    <Text style={styles.titleTxt}>Current T</Text>             
                </View>
                <View style={styles.subContainer}>               
                    <Text style={styles.titleTxt}>Current SNG</Text>                  
                </View>
            </View>
        </View>
    )
}

const styles = {
    container: {
        flex: 0.20,
        backgroundColor: '#fff',
        elevation: 15
    },
    secondContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }, 
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    subView: {
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    notifTxt: {
        flexDirection: 'row',
        paddingTop: 4,
        paddingRight: 10,
        paddingBottom: 5
    },
    textSts: {
        fontSize: 30,
        color: '#EF9A9A',
        fontWeight: '500',
    },
    borderLeft: {
        borderLeftWidth: 1,
        borderColor: '#c5c5c5',
    },
    subTxt: {
        justifyContent: 'center',
        alignItems: 'center',
        color: 'grey',
        fontWeight: 'bold',
        paddingBottom: 9,
        marginLeft: 3
    },
    iconTxt: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 10
    },
    titleTxt: {
        color: '#BDBDBD',
        fontSize: 12
    }, 
    txtPadding: {
        paddingLeft: 10
    },
    timeTxt: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 4
    },
    autoMan: {
        fontSize: 15,
        color: '#9da5b3'
    }
}

export default StatusItem;