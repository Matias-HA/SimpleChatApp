// Libraries
import React, {useEffect, useState} from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
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
import {ChatRoomData, ChatRoomMessage} from '../../shared/types';
import {StackParamList} from '../../navigation';

// Styles
import {Container, SpinnerContainer} from './styles';

/**
 * @description
 * This screen is where users can send and read messages belonging to a specific chatroom
 */

const ChatRoom = ({route}: StackScreenProps<StackParamList, 'ChatRoom'>) => {
  const {chatroomId} = route.params;
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useChatroomMessages(chatroomId);

  // Stop loading once messages have been set
  useEffect(() => {
    if (messages.length > 0) {
      setLoading(false);
    }
  }, [messages]);

  // Load more messages once the user reaches the end
  const loadMoreMessages = async () => {
    // Get the last visible document from the current page
    const lastVisible = await GetChatroomMessages(chatroomId)
      .get()
      .then(documentSnapshots => {
        return documentSnapshots.docs[documentSnapshots.docs.length - 1];
      });

    // get the next 50 messages starting from the last visible document
    var nextMessagesQuery = await GetChatroomMessagesFromLastVisible(
      chatroomId,
      lastVisible,
    );

    // Add the new messages to our current messages
    nextMessagesQuery.get().then(QuerySnapshot => {
      let newMessages: ChatRoomMessage[] = [];
      QuerySnapshot.forEach(doc => {
        newMessages.push(doc.data() as ChatRoomMessage);
      });
      setMessages((currentMessages: ChatRoomMessage[]) => [
        ...currentMessages,
        ...newMessages,
      ]);
    });
  };

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
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />

      <InputBox chatroomId={chatroomId} />
    </Container>
  );
};

export default ChatRoom;
