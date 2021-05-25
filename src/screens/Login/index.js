// Libraries
import React, {useEffect} from 'react';
import {Image, Alert} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {useSelector, useDispatch} from 'react-redux';

// Includes
const Logo = require('../../shared/assets/images/HoC-logo.png');
import {clearErrorMessage} from '../../shared/context/auth/reducer';
import {signInGoogle} from '../../shared/context/auth/actions';

// Styles
import {Container, TopContainer, BottomContainer} from './styles';

const Login = () => {
  const dispatch = useDispatch();
  const {errorMessage} = useSelector(state => state.auth);

  useEffect(() => {
    if (errorMessage !== '') {
      // Alert the user to any errors that might have occured during the sign in process
      Alert.alert('Error', errorMessage);
      dispatch(clearErrorMessage());
    }
  }, [errorMessage]);

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
      </BottomContainer>
    </Container>
  );
};

export default Login;
