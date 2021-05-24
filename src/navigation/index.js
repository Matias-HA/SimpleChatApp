// Libraries
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

// Includes
import Login from '../screens/Login';
import Main from '../screens/Main';

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
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const {user} = useSelector(state => state.auth);

  useEffect(() => {
    // Anything that needs to be loaded on app startup should be added here.
  }, []);

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
