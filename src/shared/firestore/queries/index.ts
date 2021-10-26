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

  console.log('sadas');
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
export const GetAllChatrooms = () => firestore().collection('ChatRooms').get();

// Returns the 50 newest messages from the specified chatroom
export const GetChatroomMessages = (chatroomId: string) =>
  firestore()
    .collection('ChatRooms')
    .doc(chatroomId)
    .collection('Messages')
    .orderBy('createdAt', 'desc')
    .limit(50);

// Returns the next 50 messages starting from last visible message
export const GetChatroomMessagesFromLastVisible = (
  chatroomId: string,
  lastVisible: FirebaseFirestoreTypes.DocumentData,
) =>
  firestore()
    .collection('ChatRooms')
    .doc(chatroomId)
    .collection('Messages')
    .orderBy('createdAt', 'desc')
    .startAfter(lastVisible)
    .limit(50);

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
