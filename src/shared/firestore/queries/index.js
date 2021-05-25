import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Checks if user already exists in the firestore. The user is added if not found.
export const AddUserIfNotInFirestore = userState => {
  firestore()
    .collection('Users')
    .doc(userState.uid)
    .onSnapshot(documentSnapshot => {
      if (!documentSnapshot.data()) {
        // The current user wasn't found in the firestore, which means we have to add him/her
        AddUserToFirestore(userState);
      }
    });
};

// Adds user to the firestore
const AddUserToFirestore = userState => {
  firestore()
    .collection('Users')
    .doc(userState.uid)
    .set({
      name: userState.displayName,
      avatar: `https://picsum.photos/300/300?random&t=${new Date().getTime()}`,
    })
    .then(() => {
      console.log(
        `The user: ${userState.displayName} has been added to the firestore`,
      );
    })
    .catch(error => {
      console.log(
        'An error has occured while attempting to add user to firestore',
      );
      console.log(error);
    });
};
