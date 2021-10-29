// Libraries
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

// Includes
import Navigation from './navigation';
import Colors from './shared/constants/colors';
import {store} from './shared/redux/store';
import ErrorHandler from './shared/components/ErrorHandler';

/**
 * @Description This is the top level component of the app
 */

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={Colors.primary} />
      <ErrorHandler>
        <Navigation />
      </ErrorHandler>
    </Provider>
  );
};

export default App;
