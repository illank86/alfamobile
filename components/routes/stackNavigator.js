import { StackNavigator } from 'react-navigation';

import Lists from '../storelist';
import AddStore from '../addstore';
import StoreDetail from '../storedetails';
import AddSchedule from '../addschedule';

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
    }
});

export default Stack;