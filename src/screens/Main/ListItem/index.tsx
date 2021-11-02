// Libraries
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

// Includes
import Colors from '@shared/constants/colors';
import {ChatRoomData, StackParamList} from '@shared/types';

// Styles
import {
  ClickableContainer,
  InfoContainer,
  Name,
  Description,
  IndicatorIcon,
} from './styles';

interface Props {
  chatRoom: ChatRoomData;
}

type chatrooomScreenProp = StackNavigationProp<StackParamList, 'ChatRoom'>;

/**
 * @description
 * This component displays information about a specific chatroom as well as handling navigation to that chatroom
 */

const ListItem = ({chatRoom}: Props) => {
  const navigation = useNavigation<chatrooomScreenProp>();

  //Navigate to selected chatroom
  const onClick = () => {
    navigation.navigate('ChatRoom', {
      chatroomId: chatRoom.id,
      chatroomName: chatRoom.data.name,
    });
  };

  return (
    <ClickableContainer onPress={onClick}>
      <InfoContainer>
        <Name fontSize={15}>{chatRoom.data.name}</Name>
        <Description fontSize={15} numberOfLines={2}>
          {chatRoom.data.description}
        </Description>
      </InfoContainer>
      <IndicatorIcon name="chevron-right" size={22} color={Colors.primary} />
    </ClickableContainer>
  );
};

export default ListItem;
