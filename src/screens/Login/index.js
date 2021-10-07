// Libraries
import React, {useEffect} from 'react';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {useSelector, useDispatch} from 'react-redux';

// Includes
import {signInGoogle} from '../../shared/redux/auth/actions';
import Colors from '../../shared/constants/colors';
import Circle from '../../shared/components/Circle';

// Styles
import {
  Container,
  TopContainer,
  BottomContainer,
  ErrorMessageContainer,
  TextContainer,
  ErrorMessage,
  Icon,
  IconContainer,
  SignInMessage,
} from './styles';
import {clearErrorMessage} from '../../shared/redux/auth/reducer';

/**
 * @description
 * This file handles everything related to login
 */

const Login = () => {
  const dispatch = useDispatch();
  const {errorMessage} = useSelector(state => state.auth);

  // Clear error message after 10 seconds have passed
  useEffect(() => {
    if (errorMessage != '') {
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10000);
    }
  }, [errorMessage]);

  return (
    <Container>
      <TopContainer>
        <SignInMessage>Sign in to start chatting</SignInMessage>
        <IconContainer>
          {/* Pink Chat Bubble */}
          <Icon
            name="comment"
            size={90}
            color={Colors.secondary}
            top={0.06}
            left={0.1}
          />
          <Icon
            name="align-left"
            size={40}
            color={'white'}
            top={0.1}
            left={-0.08}
          />

          {/* Red Chat Bubble */}
          <Icon
            name="comment"
            size={90}
            color={Colors.primary}
            top={0.15}
            left={0}
            mirror={true}
          />
          <Icon
            name="align-left"
            size={40}
            color={'white'}
            top={0.19}
            left={-0.18}
          />
        </IconContainer>
      </TopContainer>

      <BottomContainer>
        {/* Sign In Button*/}
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
        top={-0.45}
        right={-0.4}
      />
      <Circle
        height={0.4}
        color={Colors.secondary}
        elevation={15}
        top={-0.3}
        right={0.5}
      />
      <Circle
        height={0.6}
        color={Colors.secondary}
        elevation={14}
        top={0.92}
        right={-0.4}
      />
      <Circle
        height={0.4}
        color={Colors.primary}
        elevation={15}
        top={0.9}
        right={0.55}
      />
    </Container>
  );
};

export default Login;
