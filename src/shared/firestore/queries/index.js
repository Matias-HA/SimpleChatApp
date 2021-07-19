import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Checks if user already exists in the firestore. The user is added if not found.
export const AddUserIfNotInFirestore = userState => {
  firestore()
    .collection('Users')
    .doc(userState.uid)
    .onSnapshot(documentSnapshot => {
      if (documentSnapshot != null && !documentSnapshot.data()) {
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
        'An error has occured in the AddUserToFirestore function while attempting to add a new user to the firestore',
      );
      console.log(error);
    });
};

// Get the user currently signed in
export function GetCurrentUser(setUser) {
  firestore()
    .collection('Users')
    .doc(auth().currentUser?.uid)
    .onSnapshot(documentSnapshot => {
      setUser({
        id: auth().currentUser?.uid,
        name: documentSnapshot.data()?.name,
        avatar: documentSnapshot.data()?.avatar,
      });
    });
}

// Returns the 50 newest messages from the specified chatroom
export const GetChatroomMessages = (chatroomId, pageCount = 1) =>
  firestore()
    .collection('ChatRooms')
    .doc(chatroomId)
    .collection('Messages')
    .orderBy('createdAt', 'desc')
    .limit(pageCount * 50);
