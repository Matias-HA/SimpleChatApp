// Libraries
import React, {useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  ActivityIndicator,
  RefreshControl,
  ListRenderItemInfo,
} from 'react-native';

// Includes
import Colors from '../../shared/constants/colors';
import ListItem from './ListItem';
import Circle from '../../shared/components/Circle';
import useSortedChatrooms from '../../shared/hooks/useSortedChatrooms';
import {ChatRoomData} from '../../shared/types';

// Styles
import {Container, ListContainer} from './styles';

/**
 * @description
 * This screen displays all chatrooms to the user, sorted by the newest message
 */

const Main = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [chatrooms, setChatrooms] = useSortedChatrooms();

  // Once chatrooms have been set it will stop loading
  useEffect(() => {
    if (chatrooms.length > 0) {
      setLoading(false);
      setRefreshing(false);
    }
  }, [chatrooms]);

  // On refresh the list of chatrooms is updated by making another query to the firestore to see if any changes have occured
  const onRefresh = useCallback(() => {
    if (refreshing) return;

    setChatrooms();
    setRefreshing(true);
  }, [refreshing]);

  const keyExtractor = (item: ChatRoomData) => item.id;

  // Each ListItem represents a chatroom
  const renderItem = ({item}: {item: ChatRoomData}) => (
    <ListItem chatRoom={item} />
  );

  const refreshControl = () => (
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  );

  // Show spinner while waiting for the page to load or refreshing current chatrooms
  if (loading || refreshing)
    return (
      <Container>
        <ActivityIndicator size="large" color={Colors.primary} />
      </Container>
    );

  return (
    <ListContainer>
      <FlatList
        data={chatrooms}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        refreshControl={refreshControl()}
      />
      <Circle
        height={0.6}
        color={Colors.primary}
        elevation={14}
        top={0.85}
        right={-0.3}
      />
      <Circle
        height={0.4}
        color={Colors.secondary}
        elevation={15}
        top={0.83}
        right={0.55}
      />
    </ListContainer>
  );
};

export default Main;
