// Libraries
import React from 'react';
import moment from 'moment';
import auth from '@react-native-firebase/auth';

// Styles
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

/**
 * @description
 * This component is used to display a message within a chatroom
 */

const ChatMessageListItem = props => {
  const {message} = props;

  // If message belongs to the current user we want to display them differently
  const isMyMessage = message.userId === auth().currentUser?.uid;

  return (
    <Container isMyMessage={isMyMessage}>
      <MessageContainer>
        {/* If it is our own message we hide the avatar and name */}
        {!isMyMessage && (
          <UserInfoContainer>
            <UserAvatar source={{uri: message.avatar}} />
            <UserName>{message.name}</UserName>
          </UserInfoContainer>
        )}

        {/* The text content of the message */}
        {message.content ? (
          <MessageContent isMyMessage={isMyMessage}>
            {message.content}
          </MessageContent>
        ) : null}

        {/* If a message contained an image it is displayed here*/}
        {message.image ? <MessageImage source={{uri: message.image}} /> : null}

        {/* The time since the message was sent to the chatrooom*/}
        <Time isMyMessage={isMyMessage}>
          {moment(message.createdAt).fromNow()}
        </Time>
      </MessageContainer>
    </Container>
  );
};

export default ChatMessageListItem;
