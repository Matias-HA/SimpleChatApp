// Libraries
import {useState, useEffect} from 'react';

// Includes
import {GetChatroomMessages} from '../firestore/queries';
import {ChatRoomMessage} from '../types';

/**
 * @description
 * This hook is used to get the most recent messages from the chatroom specified by the chatroomID
 */

const useChatroomMessages = chatroomID => {
  const [messages, setMessages] = useState<ChatRoomMessage[]>([]);

  useEffect(() => {
    //Listen for any new messages
    const subscriber = GetChatroomMessages(chatroomID).onSnapshot(snapshot => {
      let newMessages: ChatRoomMessage[] = [];

      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          newMessages.push(change.doc.data());
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

  return [messages, setMessages];
};

export default useChatroomMessages;
