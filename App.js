import React from 'react';
import { StyleSheet, Text, View, Platform} from 'react-native';
import { Provider } from 'mobx-react/native';


import store from './store/liststores';
import MainFlow from './components/routes/stackNavigator';

const stores = { store }

export default class App extends React.Component {

  render() {
    return (
      <Provider {...stores}>
        <View style={styles.container}>       
          <MainFlow />      
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
