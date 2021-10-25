// Libraries
import React, {useEffect, useState} from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

// Includes
import ChatMessageListItem from './ChatMessageListItem';
import Colors from '../../shared/constants/colors';
import InputBox from './InputBox';
import useChatroomMessages from '../../shared/hooks/useChatroomMessages';
import {
  GetChatroomMessages,
  GetChatroomMessagesFromLastVisible,
} from '../../shared/firestore/queries';
import {ChatRoomMessage} from '../../shared/types';

// Styles
import {Container, SpinnerContainer} from './styles';

interface Props {
  key: string;
  name: string;
  params: {
    chatroomID: string;
    name: string;
  };
}

/**
 * @description
 * This screen is where users can send and read messages belonging to a specific chatroom
 */

const ChatRoom = ({route}: Props) => {
  const {chatroomID} = route.params;
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [messages, setMessages] = useChatroomMessages(chatroomID);

  // Stop loading once messages have been set
  useEffect(() => {
    if (messages.length > 0) {
      setLoading(false);
    }
  }, [messages]);

  // Load more messages once the user reaches the end
  const loadMoreMessages = async () => {
    // Get the last visible document from the current page
    const lastVisible = await GetChatroomMessages(chatroomID, page)
      .get()
      .then(documentSnapshots => {
        return documentSnapshots.docs[documentSnapshots.docs.length - 1];
      });

    // get the next 50 messages starting from the last visible document
    var nextMessagesQuery = await GetChatroomMessagesFromLastVisible(
      chatroomID,
      lastVisible,
    );

    // Add the new messages to our current messages
    nextMessagesQuery.get().then(QuerySnapshot => {
      let newMessages: ChatRoomMessage[] = [];
      QuerySnapshot.forEach(doc => {
        newMessages.push(doc.data());
      });
      setMessages((currentMessages: ChatRoomMessage[]) => [
        ...currentMessages,
        ...newMessages,
      ]);
    });

    //Update current page count
    setPage(page + 1);
  };

  const keyExtractor = (item, index) => 'key' + index;

  // Each list item represents a message within the chatroom
  const renderItem = ({item}: {item: ChatRoomMessage}) => (
    <ChatMessageListItem message={item} />
  );

  if (loading) {
    return (
      <SpinnerContainer>
        <ActivityIndicator size="large" color={Colors.primary} />
      </SpinnerContainer>
    );
  }

  return (
    <Container>
      <FlatList
        data={messages}
        inverted
        progressViewOffset={20}
        onEndReached={() => {
          loadMoreMessages();
        }}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />

      <InputBox chatroomId={chatroomID} />
    </Container>
  );
};

export default ChatRoom;
