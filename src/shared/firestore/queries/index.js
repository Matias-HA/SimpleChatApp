import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

/* *********************** USER RELATED ******************************* */

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
      console.log('HERE __________________________');
      console.log(documentSnapshot.data());
      setUser({
        id: auth().currentUser?.uid,
        name: documentSnapshot.data()?.name,
        avatar: documentSnapshot.data()?.avatar,
      });
    });
}

/* *********************** CHATROOM RELATED ******************************* */

// Returns the 50 newest messages from the specified chatroom
export const GetChatroomMessages = chatroomId =>
  firestore()
    .collection('ChatRooms')
    .doc(chatroomId)
    .collection('Messages')
    .orderBy('createdAt', 'desc')
    .limit(50);

// Returns the 50 messages starting from
export const GetChatroomMessagesFromLastVisible = (chatroomId, lastVisible) =>
  firestore()
    .collection('ChatRooms')
    .doc(chatroomId)
    .collection('Messages')
    .orderBy('createdAt', 'desc')
    .startAfter(lastVisible)
    .limit(50);

// Send Message
export const SendMessage = (
  user,
  chatroomId,
  messageContent,
  imageUrl = '',
) => {
  try {
    console.log(user.providerData);
    console.log(chatroomId);
    console.log(messageContent);
    console.log(imageUrl);

    firestore()
      .collection('ChatRooms')
      .doc(chatroomId)
      .collection('Messages')
      .add({
        name: user.displayName,
        content: messageContent,
        createdAt: moment.now(),
        userId: user.uid,
        // avatar: user.avatar,
        image: imageUrl,
      })
      .then(() => {
        firestore()
          .collection('ChatRooms')
          .doc(chatroomId)
          .update({lastMessageCreatedAt: moment.now()});
        console.log('Message Sent!');
      });
  } catch (error) {
    console.log(error);
  }
};
