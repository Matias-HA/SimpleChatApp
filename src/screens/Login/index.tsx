// Libraries
import React, {useEffect} from 'react';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

// Includes
import {signInGoogle} from '../../shared/redux/auth/actions';
import {clearErrorMessage} from '../../shared/redux/auth/reducer';
import {useReduxSelector, useReduxDispatch} from '../../shared/redux/hooks';
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

/**
 * @description
 * This file handles everything related to login
 */

const Login = () => {
  const dispatch = useReduxDispatch();
  const errorMessage = useReduxSelector(state => state.auth.errorMessage);

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
        <SignInMessage fontSize={20}>Sign in to start chatting</SignInMessage>
        <IconContainer>
          {/* Pink Chat Bubble */}
          <Icon
            name="comment"
            size={scale(80)}
            color={Colors.secondary}
            top={10}
            left={30}
            mirror={false}
          />
          <Icon
            name="align-left"
            size={scale(37)}
            color={'white'}
            top={33}
            left={-27}
            mirror={false}
          />

          {/* Red Chat Bubble */}
          <Icon
            name="comment"
            size={scale(80)}
            color={Colors.primary}
            top={50}
            left={10}
            mirror={true}
          />
          <Icon
            name="align-left"
            size={scale(38)}
            color={'white'}
            top={70}
            left={-48}
            mirror={false}
          />
        </IconContainer>
      </TopContainer>

      <BottomContainer>
        {/* Sign In Button*/}
        <GoogleSigninButton
          onPress={() => {
            signInGoogle();
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
        height={300}
        color={Colors.primary}
        elevation={14}
        top={-220}
        right={-70}
      />
      <Circle
        height={400}
        color={Colors.secondary}
        elevation={15}
        top={-310}
        right={120}
      />
      <Circle
        height={500}
        color={Colors.secondary}
        elevation={14}
        top={580}
        right={-110}
      />
      <Circle
        height={400}
        color={Colors.primary}
        elevation={15}
        top={600}
        right={130}
      />
    </Container>
  );
};

export default Login;
