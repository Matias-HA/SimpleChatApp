// Libraries
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

// Includes
import {store} from '../store';
import {authSlice} from './reducer';

// Will attempt to sign in the user and, if successful, update the user state
export const signInGoogle = async () => {
  try {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    await auth().signInWithCredential(googleCredential);
  } catch (error: unknown) {
    if (error instanceof Error) {
      store.dispatch(authSlice.actions.setErrorMessage(error.message));
    }
  }
};

// If the user is already signed it, skip the sign in process
export const trySigninSilently = async () => {
  try {
    const {idToken} = await GoogleSignin.signInSilently();

    if (idToken !== null) {
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      store.dispatch(authSlice.actions.setErrorMessage(error.message));
    }
  }
};

// Signs the user out and clears the user state
export const signout = async () => {
  try {
    await auth().signOut();
    await GoogleSignin.signOut();
    store.dispatch(authSlice.actions.signOutUser());
  } catch (error: unknown) {
    if (error instanceof Error) {
      store.dispatch(authSlice.actions.setErrorMessage(error.message));
    }
  }
};
