// Libraries
import React, {ReactElement, useEffect, useState} from 'react';
import {FlatList, ActivityIndicator, Alert} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

// Includes
import Colors from '@shared/constants/colors';
import {ChatRoomMessage, StackParamList} from '@shared/types';
import useChatroomMessages from '@shared/hooks/useChatroomMessages';
import {
  GetChatroomMessages,
  GetMoreChatroomMessages,
} from '@shared/firestore/queries';
import ChatMessageListItem from './ChatMessageListItem';
import InputBox from './InputBox';

// Styles
import {Container, SpinnerContainer} from './styles';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

/**
 * @description
 * This is the screen where users can send and read messages belonging to a specific chatroom
 */

const ChatRoom = ({route}: StackScreenProps<StackParamList, 'ChatRoom'>) => {
  const {chatroomId} = route.params;
  const [loading, setLoading] = useState<boolean>(true);
  const [postsPerLoad] = useState<number>(50);
  const [startAfter, setStartAfter] = useState<Object>(Object);
  const [lastPost, setLastPost] = useState<boolean>(false);
  const [messages, setMessages] = useChatroomMessages(
    chatroomId,
    postsPerLoad,
    setStartAfter,
  );

  // Stop loading once messages have been set
  useEffect(() => {
    if (messages.length > 0) {
      setLoading(false);
    }
  }, [messages]);

  // Load more messages once the user reaches the end
  const getMoreMessages = async () => {
    if (lastPost) return;

    const chatroomMessagesData = await GetMoreChatroomMessages(
      chatroomId,
      postsPerLoad,
      startAfter,
    );
    setMessages([...messages, ...chatroomMessagesData.messages]);
    setStartAfter(chatroomMessagesData.lastVisible);

    chatroomMessagesData.messages.length == 0
      ? setLastPost(true)
      : setLastPost(false);
  };

  // Each list item represents a message within the chatroom
  const renderItem = ({item}: {item: ChatRoomMessage}) => (
    <ChatMessageListItem message={item} />
  );

  return (
    <Container>
      {loading ? (
        <SpinnerContainer>
          <ActivityIndicator size="large" color={Colors.primary} />
        </SpinnerContainer>
      ) : (
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          inverted
          progressViewOffset={20}
          onEndReached={() => {
            getMoreMessages();
          }}
          onEndReachedThreshold={0.01}
          scrollEventThrottle={150}
          ListFooterComponent={(): any =>
            !lastPost && (
              <ActivityIndicator size="large" color={Colors.primary} />
            )
          }
        />
      )}
      <InputBox chatroomId={chatroomId} />
    </Container>
  );
};

export default ChatRoom;
