// Libraries
import React, {useEffect, useState} from 'react';
import {StatusBar, Alert} from 'react-native';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

// Includes
import Navigation from './navigation';
import Colors from './shared/constants/colors';
import Auth from './shared/constants/auth';
import {store} from './shared/redux/store';
import {authSlice} from './shared/redux/auth/reducer';
import ErrorHandler from './shared/components/ErrorHandler';

import {AddUserIfNotInFirestore} from './shared/firestore/queries';

/**
 * @Description This is the top level component of the app
 */

const App = () => {
  const [initializing, setInitializing] = useState<boolean>(true); // Set an initializing state whilst Firebase connects

  // Anything that should happen on initial on app startup should be added in this useEffect
  useEffect(() => {
    SplashScreen.hide();

    GoogleSignin.configure({
      webClientId: Auth.webClientId,
    });

    const subscriber = auth().onAuthStateChanged(firebaseUser =>
      handleAuthStateChanged(firebaseUser),
    );
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle user auth state changes
  const handleAuthStateChanged = async (
    user: FirebaseAuthTypes.User | null,
  ) => {
    try {
      if (user) {
        // If the user doesn't exist in the firestore, they are added
        AddUserIfNotInFirestore(user);

        if (user.displayName == undefined) {
          throw new Error('No Display Name Associated With Account');
        }

        let userInfo: UserInfo = {
          userId: user.uid,
          name: user.displayName,
          avatar: user.photoURL || '',
        };

        // User is saved to the redux store
        store.dispatch(authSlice.actions.setUser(user));
      }

      // Firebase connection has been established and initializing is now done
      if (initializing) setInitializing(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  };

  /* the onAuthStateChanged listener is asynchronous and will trigger an initial state once a connection
   with Firebase has been established. Therefore it is important to setup an "initializing" state which blocks 
   render of the main application whilst the connection is being established
   */
  if (initializing) return null;

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
