import React from 'react';
import {View, Text, FlatList} from 'react-native';
import { Card } from 'react-native-elements';

const ScheduleCards = (props) => {
    return(
        <Card title={props.titles}>
            <FlatList 
                data={props.data}
                renderItem={props.renderitems}            
                keyExtractor={props.keyExtractor}    
            />
        </Card>
    )
}


export default ScheduleCards;