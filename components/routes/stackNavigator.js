import { StackNavigator } from 'react-navigation';

import SplashScreen from '../splashscreen';
import RegisterScreen from '../register';
import LoginScreen from '../login';
import Lists from '../storelist';
import AddStore from '../addstore';
import StoreDetail from '../storedetails';
import AddSchedule from '../addschedule';
import UpdateStore from '../updateStore'

const MainFlow = StackNavigator({
  Home: {
    screen: Lists
  },
  Addstore: {
    screen: AddStore
  },
  Storedetail: {
    screen: StoreDetail
  },
  Addschedule: {
    screen: AddSchedule
  },
  UpdateStore: {
    screen: UpdateStore
  },

  Splash: {
    screen: SplashScreen
  },
  Login: {
    screen: LoginScreen
  },
  Register: {
    screen: RegisterScreen
  },
}, 
{
  headerMode: 'screen', 
  initialRouteName: 'Splash' 
}
);

export default MainFlow;