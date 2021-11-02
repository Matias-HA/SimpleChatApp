import firestore from '@react-native-firebase/firestore';

export const ChatroomMessagesCollection = (chatroomId: string) =>
  firestore().collection('ChatRooms').doc(chatroomId).collection('Messages');
