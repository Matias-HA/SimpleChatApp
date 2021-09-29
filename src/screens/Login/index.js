// Libraries
import React from 'react';
import {Image} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {useSelector, useDispatch} from 'react-redux';

// Includes
const Logo = require('../../shared/assets/images/HoC-logo.png');
import {clearErrorMessage} from '../../shared/redux/auth/reducer';
import {signInGoogle} from '../../shared/redux/auth/actions';

// Styles
import {
  Container,
  TopContainer,
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
        <Image
          source={Logo}
          style={{
            resizeMode: 'contain',
          }}
        />
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
    </Container>
  );
};

export default Login;
