// Libraries
import React from 'react';
import {useNavigation} from '@react-navigation/native';

// Includes
import Colors from '../../../shared/constants/colors';

// Styles
import {
  ClickableContainer,
  InfoContainer,
  Name,
  Description,
  IndicatorIcon,
} from './styles';

/**
 * @description
 * This component displays information about a specific chatroom as well as handling navigation to said chatroom
 */

const ListItem = ({chatRoom}) => {
  const navigation = useNavigation();

  //Navigate to selected chatroom
  const onClick = () => {
    navigation.navigate('ChatRoom', {
      chatroomID: chatRoom.id,
      name: chatRoom.data.name,
    });
  };

  return (
    <ClickableContainer onPress={onClick}>
      <InfoContainer>
        <Name>{chatRoom.data.name}</Name>
        <Description numberOfLines={2}>{chatRoom.data.description}</Description>
      </InfoContainer>
      <IndicatorIcon name="chevron-right" size={22} color={Colors.primary} />
    </ClickableContainer>
  );
};

export default ListItem;
