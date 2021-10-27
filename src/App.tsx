// Libraries
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

// Includes
import Navigation from './navigation';
import {store} from './shared/redux/store';

/**
 * @Description This is the top level component of the app
 */

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
