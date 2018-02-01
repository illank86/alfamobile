import { StackNavigator } from 'react-navigation';

import Lists from '../storelist';
import AddStore from '../addstore';
import StoreDetail from '../storedetails';
import AddSchedule from '../addschedule';
import UpdateSchedule from '../updateschedule';

//comment

const Stack = StackNavigator({
    Home: {
        screen: Lists,       
    },
    AddStore: {
        screen: AddStore,
    },
    StoreDetail: {
        screen: StoreDetail,
    },
    AddSchedule: {
        screen: AddSchedule
    },
    updateSchedule: {
        screen: UpdateSchedule
    }
});

export default Stack;