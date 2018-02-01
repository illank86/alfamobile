import React from 'react';
import { StyleSheet, Text, View, Platform} from 'react-native';
import { Provider } from 'mobx-react/native';

import store from './store/liststores';
import Lists from './components/storelist';
import Stack from './components/routes/stackNavigator';

const stores = { store }


export default class App extends React.Component {

  render() {
    return (
      <Provider {...stores}>
        <View style={styles.container}>       
          <Stack />      
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }  
});
