// Libraries
import * as React from 'react';
import {View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {ErrorBoundary} from 'react-error-boundary';

// Includes
import BasicText from '../BasicText';
import Colors from '../../constants/colors';
import Circle from '../Circle';

// Styles
import {
  Container,
  ContentContainer,
  Spacing,
  TextAndButtonContainer,
  Title,
  Info,
  ReturnBtn,
  BtnText,
} from './styles';

// ************************************************************************
// This resuable component uses the react ErrorBoundary Library
// to gracefully catch JavaScript errors anywhere in the
// child component tree.
// https://github.com/bvaughn/react-error-boundary
//
// The usual error overlay will still show up while in development mode since
// it contains useful information about the error. In production however, the error overlay
// won't be shown to the user. The user will only be shown the ErrorFallback component
// defined below, which gives the user the ability to return to what they were doing instead of the
// app crashing.
//
// To test the error boundary just throw an error in any inside an component that is present in the
// Error boundarys child component tree
//
// !IMPORTANT - KEEP IN MIND THIS DOES NOT CATCH ERRORS RELATED TO THE FOLLOWING:
// 1. Event handlers
// 2. Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
// 3. Errors thrown in the error boundary itself (rather than its children)
//
// Errors that fall under the above categories should still be handled with the
// The usual try catch approach.
// ************************************************************************

const myErrorHandler = (error: Error) => {
  // TODO
  // Do something with the error here. Like logging it to the backend for later review.
};

function ErrorFallback({resetErrorBoundary}: any) {
  return (
    <Container>
      <ContentContainer>
        <Spacing />

        <TextAndButtonContainer>
          <Title fontSize={22}>Oops, Something Went Wrong</Title>
          <Info fontSize={14}>
            The app ran into an issue and could not continue. We apologize for
            any inconvenience this may have caused! You can press the button
            below to return to what you were doing. Please contact us if this
            issue persists.
          </Info>
          <ReturnBtn onPress={resetErrorBoundary}>
            <BtnText fontSize={16}>Back To The Main Screen</BtnText>
          </ReturnBtn>
        </TextAndButtonContainer>
      </ContentContainer>

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
}
export const ErrorHandler = ({children}: {children: React.ReactNode}) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
    {children}
  </ErrorBoundary>
);

export default ErrorHandler;
