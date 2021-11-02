// Libraries
import React from 'react';
import moment from 'moment';
import auth from '@react-native-firebase/auth';

// Includes
import {ChatRoomMessage} from '@shared/types';

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

interface Props {
  message: ChatRoomMessage;
}

/**
 * @description
 * This component is used to display a message within a chatroom
 */

const ChatMessageListItem = ({message}: Props) => {
  // Check to see if the message belongs to the current user
  const isMyMessage: boolean = message.userId === auth().currentUser?.uid;

  return (
    <Container isMyMessage={isMyMessage}>
      <MessageContainer>
        {/* If it is our own message we hide the avatar and name */}
        {!isMyMessage && (
          <UserInfoContainer>
            <UserAvatar source={{uri: message.avatar}} />
            <UserName fontSize={13}>{message.name}</UserName>
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
