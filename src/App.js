// Libraries
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

// Includes
import Navigation from './navigation';
import {store} from './shared/context/store';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <Navigation />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
