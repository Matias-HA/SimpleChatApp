// Libraries
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Includes
import Colors from '../shared/constants/colors';
import {setUser} from '../shared/context/auth/reducer';
import {AddUserIfNotInFirestore} from '../shared/firestore/queries/';
import Auth from '../shared/constants/auth';
import Login from '../screens/Login';
import Main from '../screens/Main';
import ChatRoom from '../screens/ChatRoom';

/**
 * @description
 * This file handles everything related to navigation
 */

const Stack = createStackNavigator();

// The Login stack. contains screens shown to the user prior to successfully signing in
const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Signin" component={Login} />
    </Stack.Navigator>
  );
};

// The Main stack. Contains screens shown to the user after successfully signing in
const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: Colors.text,
        },
      }}
      headerMode="float">
      <Stack.Screen
        name="Main"
        component={Main}
        options={() => ({
          title: 'Chat Rooms',
          headerTintColor: Colors.text,
          headerLeft: () => null,
          gestureEnabled: false,
        })}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={({route}) => ({
          title: route.params.name,
          headerTintColor: Colors.text,
        })}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const dispatch = useDispatch();
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const {user} = useSelector(state => state.auth);

  // Handle user state changes
  function onAuthStateChanged(user) {
    if (user) {
      AddUserIfNotInFirestore(user);
    }
    dispatch(setUser(user));
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    // Anything that needs to be loaded on app startup should be added here.
    GoogleSignin.configure({
      webClientId: Auth.webClientId,
    });

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  /* the onAuthStateChanged listener is asynchronous and will trigger an initial state once a connection
   with Firebase has been established. Therefore it is important to setup an "initializing" state which blocks 
   render of our main application whilst the connection is established
   */
  if (initializing) return null;

  return (
    <NavigationContainer>
      {/*
       * If User has not yet signed in, show the login screen
       */}
      {user ? MainStack() : LoginStack()}
    </NavigationContainer>
  );
};

export default Navigation;
