// Libraries
import React, {useEffect, useState} from 'react';
import {FlatList, ActivityIndicator} from 'react-native';

// Includes
import ChatMessageListItem from './ChatMessageListItem';
import Colors from '../../shared/constants/colors';
import InputBox from '../../shared/components/InputBox';
import useChatroomMessages from '../../shared/hooks/useChatroomMessages';
import {
  GetChatroomMessages,
  GetChatroomMessagesFromLastVisible,
} from '../../shared/firestore/queries';

// Styles
import {Container, SpinnerContainer} from './styles';

/**
 * @description
 * This screen is where users can send and read messages belonging to a specific chatroom
 */

const ChatRoom = ({route}) => {
  const {chatroomID} = route.params;
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useChatroomMessages(chatroomID);

  // Stop loading once messages have been loaded
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
    var nextMessages = await GetChatroomMessagesFromLastVisible(
      chatroomID,
      lastVisible,
    );

    // Add the new messages to our current messages
    nextMessages.get().then(QuerySnapshot => {
      let newMessages = [];
      QuerySnapshot.forEach(doc => {
        newMessages.push(doc.data());
      });
      setMessages(currentMessages => [...currentMessages, ...newMessages]);
    });

    //Update current page count
    setPage(page + 1);
  };

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
        keyExtractor={(item, index) => 'key' + index}
        renderItem={({item}) => <ChatMessageListItem message={item} />}
      />

      <InputBox chatroomId={chatroomID} />
    </Container>
  );
};

export default ChatRoom;
