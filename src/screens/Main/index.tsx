// Libraries
import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, ActivityIndicator, RefreshControl} from 'react-native';

// Includes
import Colors from '@shared/constants/colors';
import Circle from '@shared/components/Circle';
import useChatrooms from '@shared/hooks/useChatrooms';
import {ChatRoomData} from '@shared/types';
import ListItem from './ListItem';

// Styles
import {Container, ListContainer} from './styles';

/**
 * @description
 * This screen displays all chatrooms to the user, sorted by the newest message
 */

const Main = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [chatrooms, setChatrooms] = useChatrooms();

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

  return (
    <ListContainer>
      {loading || refreshing ? (
        <Container>
          <ActivityIndicator size="large" color={Colors.primary} />
        </Container>
      ) : (
        <FlatList
          data={chatrooms}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          refreshControl={refreshControl()}
        />
      )}

      <Circle
        height={400}
        color={Colors.primary}
        elevation={14}
        top={550}
        right={-100}
      />
      <Circle
        height={500}
        color={Colors.secondary}
        elevation={15}
        top={530}
        right={80}
      />
    </ListContainer>
  );
};

export default Main;
