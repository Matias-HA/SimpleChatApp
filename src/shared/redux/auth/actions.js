// Libraries
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

// Includes
import {setErrorMessage, signOutUser} from './reducer';

/**
 * @Description This file contains the redux auth related ation
 */

// Will attempt to sign in the user and, if successful, update the user state
export const signInGoogle = () => async dispatch => {
  try {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    await auth().signInWithCredential(googleCredential);
  } catch (error) {
    dispatch(setErrorMessage(error.message));
  }
};

// If the user is already signed it, skip the sign in process
export const trySigninSilently = () => async dispatch => {
  try {
    const {idToken} = await GoogleSignin.signInSilently();

    if (idToken !== null) {
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
    }
  } catch (error) {}
};

// Signs the user out and clears the user state
export const signout = async dispatch => {
  try {
    await auth().signOut();
    await GoogleSignin.signOut();
    dispatch(signOutUser());
  } catch (error) {
    dispatch(setErrorMessage(error.message));
  }
};
