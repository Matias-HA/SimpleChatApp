// Libraries
import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

// Includes
import {GetAllChatrooms} from '../firestore/queries';
import {ChatRoomData} from '../types';

/**
 * @description
 * This hook allows you to receive all chatrooms present in the firestore sorted by the most recent message
 */

const useChatrooms = () => {
  const [chatrooms, setChatrooms] = useState<ChatRoomData[]>([]);

  useEffect(() => {
    getChatrooms();
  }, []);

  // Get chatrooms from the firestore
  const getChatrooms = async () => {
    let rooms: ChatRoomData[] = [];
    await GetAllChatrooms().then(elements => {
      // loop through each element and add every chatroom to the rooms array
      elements.forEach(documentSnapshot => {
        rooms.push({
          id: documentSnapshot.id,
          data: documentSnapshot.data() as ChatRoomData['data'],
        });
      });
    });

    // save rooms to state
    setChatrooms(rooms);
  };

  return [chatrooms, getChatrooms] as const;
};

export default useChatrooms;
