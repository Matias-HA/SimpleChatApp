// Libraries
import {Alert} from 'react-native';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import moment from 'moment';

// Includes
import {store} from '../../redux/store';
import {UserInfo} from '../../types';
import {ChatroomMessagesCollection} from '../utils';

/* *********************** USER RELATED ******************************* */

// Checks if user already exists in the firestore. The user is added if not found.
export const AddUserIfNotInFirestore = (userState: FirebaseAuthTypes.User) => {
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
const AddUserToFirestore = (userState: FirebaseAuthTypes.User) => {
  firestore()
    .collection('Users')
    .doc(userState.uid)
    .set({
      name: userState.displayName,
      avatar: userState.photoURL,
    })
    .then(() => {
      // Success related logic goes here
    })
    .catch(error => {
      Alert.alert('An error occurred while attempting to save your user info');
    });
};

// get info of the user currently signed in
export const GetCurrentUserInfoFromFirestore = async (): Promise<
  UserInfo | undefined
> => {
  let userId: string | undefined = auth().currentUser?.uid;
  let docRef = firestore().collection('Users').doc(userId).get();

  try {
    const userInfo = await docRef.then(
      (doc: FirebaseFirestoreTypes.DocumentSnapshot) => {
        if (doc.exists) {
          return {
            userId: userId,
            name: doc.data()?.name,
            avatar: doc.data()?.avatar,
          } as UserInfo;
        }
      },
    );

    return userInfo;
  } catch (error) {
    Alert.alert(
      'An error occured while attempting to retrieve user info from firestore: ' +
        error,
    );
  }
};

/* *********************** CHATROOM RELATED ******************************* */

// Get all chatrooms
export const GetAllChatrooms = () =>
  firestore()
    .collection('ChatRooms')
    .orderBy('lastMessageCreatedAt', 'desc')
    .get();

// Returns n number of messages from specified chatroom sorted by most recent
export const GetChatroomMessages = async (
  chatroomId: string,
  postsPerLoad: number,
) => {
  const messages = new Array();
  const querySnapshot = await ChatroomMessagesCollection(chatroomId)
    .orderBy('createdAt', 'desc')
    .limit(postsPerLoad)
    .get();

  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  querySnapshot.forEach(doc => {
    let messageData = doc.data();
    messageData.messageId = doc.id;
    messages.push(messageData);
  });

  return {messages, lastVisible};
};

// Returns the next n number of messages starting from last visible message sorted by most recent
export const GetMoreChatroomMessages = async (
  chatroomId: string,
  postsPerLoad: number,
  startAfter: Object,
) => {
  const messages = new Array();
  const querySnapshot = await ChatroomMessagesCollection(chatroomId)
    .orderBy('createdAt', 'desc')
    .startAfter(startAfter)
    .limit(postsPerLoad)
    .get();

  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  querySnapshot.forEach(doc => {
    let messageData = doc.data();
    messageData.messageId = doc.id;
    messages.push(messageData);
  });

  return {messages, lastVisible};
};

// Send message to the firestore containing either just text or text + an image
export const SendMessage = async (
  chatroomId: string,
  messageContent: string,
  imageUrl = '',
) => {
  try {
    const state = store.getState();
    const user = state.auth.user;

    if (user === null) {
      throw new Error('Unexpected error: user is null');
    }

    ChatroomMessagesCollection(chatroomId)
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      Alert.alert(
        'Error occured while attempting to send message: ' + error.message,
      );
    }
  }
};
