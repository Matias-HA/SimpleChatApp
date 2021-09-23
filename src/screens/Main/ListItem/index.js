// Libraries
import React from 'react';
import {View, Text} from 'react-native';
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
