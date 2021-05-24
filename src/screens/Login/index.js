// Libraries
import React from 'react';
import {Image, Alert} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

// Includes
const Logo = require('../../shared/assets/images/HoC-logo.png');

// Styles
import {Container, TopContainer, BottomContainer} from './styles';

const Login = () => {
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
            Alert.alert('Not yet implemented');
          }}
        />
      </BottomContainer>
    </Container>
  );
};

export default Login;
