// Libraries
import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

// Includes
import {GetAllChatrooms} from '../firestore/queries';
import {ChatRoomData} from '../types';

/**
 * @description
 * This hook allows you to receive all chatrooms present in the firestore sorted by which chatroom has the newest message
 */

const useSortedChatrooms = () => {
  const [chatrooms, setChatrooms] = useState<ChatRoomData[]>([]);

  useEffect(() => {
    getChatrooms();
  }, []);

  // Chatrooms are sorted by which has the most recent message.
  // Sorted: Newest -> Oldest
  const SortChatroomsByNewestMessage = (chatrooms: ChatRoomData[]) => {
    const sortedChatrooms = chatrooms?.sort((chatroomA, chatroomB) =>
      chatroomA.data.lastMessageCreatedAt < chatroomB.data.lastMessageCreatedAt
        ? 1
        : -1,
    );

    return sortedChatrooms;
  };

  // Get chatrooms from the firestore
  const getChatrooms = async () => {
    let rooms: ChatRoomData[] = [];
    await GetAllChatrooms().then(elements => {
      // loop through each collection and add every chatroom to the rooms array
      elements.forEach(documentSnapshot => {
        rooms.push({
          id: documentSnapshot.id,
          data: documentSnapshot.data() as ChatRoomData['data'],
        });
      });
    });

    // sort the chatrooms by newest message and set the state
    setChatrooms(SortChatroomsByNewestMessage(rooms));
  };

  return [chatrooms, getChatrooms] as const;
};

export default useSortedChatrooms;
