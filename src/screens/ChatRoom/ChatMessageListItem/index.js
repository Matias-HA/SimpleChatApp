import React from 'react';
import moment from 'moment';
import auth from '@react-native-firebase/auth';

import {
  Container,
  MessageContainer,
  UserInfoContainer,
  UserAvatar,
  UserName,
  MessageContent,
  Time,
  MessageImage,
} from './styles';

const ChatMessageListItem = props => {
  const {message} = props;

  // Used to check whether or not a message belongs to the current user
  const isMyMessage = message.userId === auth().currentUser?.uid;

  return (
    <Container isMyMessage={isMyMessage}>
      <MessageContainer>
        {!isMyMessage && (
          <UserInfoContainer>
            <UserAvatar source={{uri: message.avatar}} />
            <UserName>{message.name}</UserName>
          </UserInfoContainer>
        )}

        {message.content ? (
          <MessageContent isMyMessage={isMyMessage}>
            {message.content}
          </MessageContent>
        ) : null}

        {message.image ? <MessageImage source={{uri: message.image}} /> : null}

        <Time isMyMessage={isMyMessage}>
          {moment(message.createdAt).fromNow()}
        </Time>
      </MessageContainer>
    </Container>
  );
};

export default ChatMessageListItem;
