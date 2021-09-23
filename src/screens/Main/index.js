// Libraries
import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, ActivityIndicator, RefreshControl} from 'react-native';

// Includes
import Colors from '../../shared/constants/colors';
import ListItem from './ListItem';
import useSortedChatrooms from '../../shared/hooks/useSortedChatrooms';

// Styles
import {Container, ListContainer} from './styles';

/**
 * @description
 * This screen displays all chatrooms to the user, sorted by the newest message
 */

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [chatrooms, setChatrooms] = useSortedChatrooms();

  // Once chatrooms have been set we are done loading
  useEffect(() => {
    if (chatrooms.length > 0) {
      setLoading(false);
      setRefreshing(false);
    }
  }, [chatrooms]);

  const onRefresh = useCallback(() => {
    if (refreshing) return; // If we are already refreshing we return immediately

    setChatrooms();
    setRefreshing(true);
  }, [refreshing]);

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
