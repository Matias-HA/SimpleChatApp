// Libraries
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';

// Includes
import Navigation from './navigation';
import {store} from './shared/context/store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <Navigation />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
