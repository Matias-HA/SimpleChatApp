// Libraries
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

// Includes
import Colors from '../../shared/constants/colors';
import ListItem from './ListItem';

// Styles
import {Container, ListContainer} from './styles';

// This screen displays all chatrooms to the user
const Main = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [ChatRooms, setChatRooms] = useState([]);

  useEffect(async () => {
    // Get all chatrooms from the firestore
    const collections = await firestore().collection('ChatRooms').get();
    let rooms = [];

    // loop through each collection and add every chatroom to the rooms array
    collections.forEach(documentSnapshot => {
      rooms.push({
        id: documentSnapshot.id,
        data: documentSnapshot.data(),
      });
    });

    // Add the rooms to the redux store
    setChatRooms(rooms);
    setLoading(false);
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [refreshing]);

  const SortChatroomsByNewestMessage = () => {
    const sortedChatrooms = ChatRooms?.sort((chatroomA, chatroomB) =>
      chatroomA.lastMessageCreatedAt < chatroomB.lastMessageCreatedAt ? 1 : -1,
    );

    return sortedChatrooms;
  };

  if (loading)
    return (
      <Container>
        <ActivityIndicator size="large" color={Colors.primary} />
      </Container>
    );

  return (
    <ListContainer>
      <FlatList
        data={SortChatroomsByNewestMessage()}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ListItem chatRoom={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </ListContainer>
  );
};

export default Main;
