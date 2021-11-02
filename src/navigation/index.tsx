// Libraries
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Includes
import Colors from '@shared/constants/colors';
import {setUser} from '@shared/redux/auth/reducer';
import {signout} from '@shared/redux/auth/actions';
import {useReduxSelector} from '@shared/redux/hooks';
import {StackParamList} from '@shared/types';
import IconBtn from '@shared/components/IconBtn';
import Login from '@screens/Login';
import Main from '@screens/Main';
import ChatRoom from '@screens/ChatRoom';

// Styles
import {NavContainer, LogoutBtnContainer} from './styles';

const Stack = createStackNavigator<StackParamList>();

/**
 * @Description
 * Component that returns the relevant navigation stack to the user based on their current auth status
 */

const Navigation = () => {
  const user = useReduxSelector(state => state.auth.user);

  return (
    <NavContainer>
      {/*
       * If the user has not yet signed in, show the login screen
       */}
      {!user ? LoginStack() : MainStack()}
    </NavContainer>
  );
};

// The Login stack. contains screens shown to the user prior to successfully signing in
const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
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
          title: route.params.chatroomName,
          headerTintColor: Colors.white,
        })}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
