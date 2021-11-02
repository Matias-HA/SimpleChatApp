// Libraries
import {useState, useEffect} from 'react';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

// Includes
import {
  GetChatroomMessages,
  GetMoreChatroomMessages,
} from '../firestore/queries';
import {ChatroomMessagesCollection} from '../firestore/utils';
import {ChatRoomMessage} from '../types';

/**
 * @description
 * This hook is used to get the most recent messages from the chatroom specified by the chatroomID
 */

const useChatroomMessages = (
  chatroomId: string,
  postsPerLoad: number,
  setStartAfter: any,
) => {
  const [messages, setMessages] = useState<ChatRoomMessage[]>([]);

  useEffect(() => {
    getMessages();

    //Listen for any new messages
    const subscriber = ChatroomMessagesCollection(chatroomId)
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        let newMessages: ChatRoomMessage[] = [];

        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            newMessages.push(change.doc.data() as ChatRoomMessage);
          }
          if (change.type === 'modified') {
            // Logic related to message modification goes here
          }
          if (change.type === 'removed') {
            // Logic related to message removal goes here
          }
        });

        // Set messages state
        setMessages(currentMessages => [...newMessages, ...currentMessages]);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  const getMessages = async () => {
    const chatroomMessagesData = await GetChatroomMessages(
      chatroomId,
      postsPerLoad,
    );
    setMessages([...messages, ...chatroomMessagesData.messages]);
    setStartAfter(chatroomMessagesData.lastVisible);
  };

  return [messages, setMessages] as const;
};

export default useChatroomMessages;
