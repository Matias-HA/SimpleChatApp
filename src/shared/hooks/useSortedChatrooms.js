import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

const useSortedChatrooms = () => {
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(async () => {
    await getChatrooms();
  }, []);

  const SortChatroomsByNewestMessage = chatrooms => {
    const sortedChatrooms = chatrooms?.sort((chatroomA, chatroomB) =>
      chatroomA.lastMessageCreatedAt < chatroomB.lastMessageCreatedAt ? 1 : -1,
    );

    return sortedChatrooms;
  };

  const getChatrooms = async () => {
    // Get chatrooms from the firestore
    const collections = await firestore().collection('ChatRooms').get();
    let rooms = [];

    // loop through each collection and add every chatroom to the rooms array
    collections.forEach(documentSnapshot => {
      rooms.push({
        id: documentSnapshot.id,
        data: documentSnapshot.data(),
      });
    });

    // sort the chatrooms by newest message and save the state
    setChatrooms(SortChatroomsByNewestMessage(rooms));
  };

  return [chatrooms, getChatrooms];
};

export default useSortedChatrooms;
