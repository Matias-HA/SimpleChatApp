import {
  setErrorMessage,
  setUser,
  setAdditionalUserInfo,
  signOutUser,
} from './reducer';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

/**
 * @Description Will attempt to sign in the user and, if successful, update the user state
 */
export const signInGoogle = () => async dispatch => {
  // Try to signin
  try {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const userCredential = await auth().signInWithCredential(googleCredential);

    console.log(userCredential.user);
    dispatch(setAdditionalUserInfo(userCredential.additionalUserInfo));
    dispatch(setUser(userCredential.user));
  } catch (err) {
    const msg = err.message;
    dispatch(setErrorMessage(msg));
  }
};

/**
 *
 * @description If the user is already signed it, skip the sign in process
 */

export const trySigninSilently = () => async dispatch => {
  try {
    const {idToken} = await GoogleSignin.signInSilently();

    if (idToken !== null) {
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );

      dispatch(setAdditionalUserInfo(userCredential.additionalUserInfo));
      dispatch(setUser(userCredential.user));
    }
  } catch (error) {}
};

/**
 *
 * @description Signs the user out and clears the user state
 */
export const signout = dispatch => {
  return async () => {
    await auth().signOut();
    await GoogleSignin.signOut();
    dispatch(signOutUser());

    try {
    } catch (err) {
      const msg = err.message;
      dispatch(setErrorMessage(msg));
    }
  };
};
