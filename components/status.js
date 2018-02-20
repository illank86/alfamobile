import React from 'react';
import { ToastAndroid, View, StatusBar, StyleSheet, TouchableOpacity, TouchableHighlight, FlatList, ActivityIndicator, Text, SwipeableListView } from 'react-native';
import { Header, ListItem, SearchBar, List, Avatar } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';


export default class StatusBar extends React.Component {
    render() {
        return(
            <View>
                <Text>This is Status Bar</Text>
            </View>
        )
    }
}