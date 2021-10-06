// Libraries
import React from 'react';
import {Image, View, Text} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {useSelector, useDispatch} from 'react-redux';

// Includes
import {signInGoogle} from '../../shared/redux/auth/actions';
import Colors from '../../shared/constants/colors';

// Styles
import {
  Container,
  TopContainer,
  Circle,
  BottomContainer,
  ErrorMessageContainer,
  TextContainer,
  ErrorMessage,
} from './styles';

/**
 * @description
 * This file handles everything related to login
 */

const Login = () => {
  const dispatch = useDispatch();
  const {errorMessage} = useSelector(state => state.auth);

  return (
    <Container>
      <TopContainer>
        <Text style={{color: Colors.primary, fontSize: 26, fontWeight: 'bold'}}>
          Sign in to start chatting
        </Text>
      </TopContainer>
      <BottomContainer>
        <GoogleSigninButton
          onPress={() => {
            dispatch(signInGoogle());
          }}
        />

        {/* Any error messages will be displayed here */}
        {errorMessage ? (
          <ErrorMessageContainer>
            <TextContainer>
              <ErrorMessage>{errorMessage}</ErrorMessage>
            </TextContainer>
          </ErrorMessageContainer>
        ) : null}
      </BottomContainer>

      {/* Circles */}
      <Circle
        height={0.6}
        color={Colors.primary}
        elevation={14}
        top={-0.4}
        right={-0.4}
      />
      <Circle
        height={0.4}
        color={Colors.secondary}
        elevation={15}
        top={-0.25}
        right={0.5}
      />
      <Circle
        height={0.6}
        color={Colors.secondary}
        elevation={14}
        top={0.85}
        right={-0.4}
      />
      <Circle
        height={0.4}
        color={Colors.primary}
        elevation={15}
        top={0.85}
        right={0.55}
      />
    </Container>
  );
};

export default Login;
