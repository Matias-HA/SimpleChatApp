// Libraries
import {Alert} from 'react-native';
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
      // Success related logic goes here
    })
    .catch(error => {
      Alert.alert('An error occurred while attempting to save your user info');
    });
};

// get info of the user currently signed in
export function GetCurrentUserInfoFromFirestore() {
  let userId = auth().currentUser?.uid;
  let docRef = firestore().collection('Users').doc(userId);

  try {
    return docRef.get().then(doc => {
      if (doc.exists) {
        return {userId: userId, ...doc.data()};
      }
    });
  } catch (error) {
    Alert.alert('An error occured while attempting to retrieve user info');
  }
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

// Returns the next 50 messages starting from last visible message
export const GetChatroomMessagesFromLastVisible = (chatroomId, lastVisible) =>
  firestore()
    .collection('ChatRooms')
    .doc(chatroomId)
    .collection('Messages')
    .orderBy('createdAt', 'desc')
    .startAfter(lastVisible)
    .limit(50);

// Send message to the firestore containing either just text or text + an image
export const SendMessage = async (
  user,
  chatroomId,
  messageContent,
  imageUrl = '',
) => {
  try {
    firestore()
      .collection('ChatRooms')
      .doc(chatroomId)
      .collection('Messages')
      .add({
        name: user.name,
        content: messageContent,
        createdAt: moment.now(),
        userId: user.userId,
        avatar: user.avatar,
        image: imageUrl,
      })
      .then(() => {
        firestore()
          .collection('ChatRooms')
          .doc(chatroomId)
          .update({lastMessageCreatedAt: moment.now()});
      });
  } catch (error) {
    Alert.alert('Error occured while attempting to send message');
  }
};
