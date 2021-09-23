// Libraries
import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

/**
 * @description
 * This hook allows you to receive all chatrooms present in the firestore sorted by which chatroom has the newest message
 */

const useSortedChatrooms = () => {
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    getChatrooms();
  }, []);

  const SortChatroomsByNewestMessage = chatrooms => {
    const sortedChatrooms = chatrooms?.sort((chatroomA, chatroomB) =>
      chatroomA.lastMessageCreatedAt < chatroomB.lastMessageCreatedAt ? 1 : -1,
    );

    return sortedChatrooms;
  };

  // Get chatrooms from the firestore
  const getChatrooms = async () => {
    const collections = await firestore().collection('ChatRooms').get();
    let rooms = [];

    // loop through each collection and add every chatroom to the rooms array
    collections.forEach(documentSnapshot => {
      rooms.push({
        id: documentSnapshot.id,
        data: documentSnapshot.data(),
      });
    });

    // sort the chatrooms by newest message and set the state
    setChatrooms(SortChatroomsByNewestMessage(rooms));
  };

  return [chatrooms, getChatrooms];
};

export default useSortedChatrooms;
