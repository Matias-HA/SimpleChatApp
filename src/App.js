// Libraries
import React from 'react';
import {SafeAreaView, Text} from 'react-native';

//Screens
import Login from './screens/Login';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Login />
    </SafeAreaView>
  );
};

export default App;
