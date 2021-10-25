// Libraries
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

// Includes
import Colors from '../shared/constants/colors';
import {setUser} from '../shared/redux/auth/reducer';
import {signout} from '../shared/redux/auth/actions';
import {useReduxSelector, useReduxDispatch} from '../shared/redux/hooks';
import {UserInfo} from '../shared/types';
import {
  AddUserIfNotInFirestore,
  GetCurrentUserInfoFromFirestore,
} from '../shared/firestore/queries';
import Auth from '../shared/constants/auth';
import Login from '../screens/Login';
import Main from '../screens/Main';
import ChatRoom from '../screens/ChatRoom';
import IconBtn from '../shared/components/IconBtn';

// Styles
import {LogoutBtnContainer} from './styles';

export type StackParamList = {
  Login: undefined;
  Main: undefined;
  ChatRoom: {chatroomID: number; name: string} | undefined;
};

const Stack = createStackNavigator<StackParamList>();

/**
 * @Description
 * This component handles everything related to navigation
 */

// The component that returns the relevant stack to the user based on their current auth status
const Navigation = () => {
  const [initializing, setInitializing] = useState<boolean>(true); // Set an initializing state whilst Firebase connects
  const dispatch = useReduxDispatch();
  const user = useReduxSelector(state => state.auth.user);

  // Anything that should happen on initial on app startup should be added in this useEffect
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Auth.webClientId,
    });

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle user auth state changes
  const onAuthStateChanged = async (user: FirebaseAuthTypes.User) => {
    // If the user doesn't exist in the firestore, they are added
    if (user) {
      AddUserIfNotInFirestore(user);

      // User is saved to the redux store
      let firestoreUserInfo: UserInfo = await GetCurrentUserInfoFromFirestore();
      dispatch(setUser(firestoreUserInfo));
    }

    // Firebase connection has been established and initializing is now done
    if (initializing) setInitializing(false);
  };

  /* the onAuthStateChanged listener is asynchronous and will trigger an initial state once a connection
   with Firebase has been established. Therefore it is important to setup an "initializing" state which blocks 
   render of the main application whilst the connection is being established
   */
  if (initializing) return null;

  return (
    <NavigationContainer>
      {/*
       * If the user has not yet signed in, show the login screen
       */}
      {!user ? LoginStack() : MainStack()}
    </NavigationContainer>
  );
};

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
          color: Colors.white,
        },
      }}
      headerMode="float">
      <Stack.Screen
        name="Main"
        component={Main}
        options={() => ({
          title: 'Chat Rooms',
          headerTintColor: Colors.white,
          headerLeft: () => null,
          gestureEnabled: false,
          headerRight: () => (
            <LogoutBtnContainer>
              <IconBtn
                size={30}
                color={Colors.white}
                iconName="sign-out"
                onPress={signout}
                mirror={true}
              />
            </LogoutBtnContainer>
          ),
        })}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={({route}) => ({
          title: route.params.name,
          headerTintColor: Colors.white,
        })}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
