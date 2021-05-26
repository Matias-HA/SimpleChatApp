// Libraries
import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {useRoute} from '@react-navigation/native';

// Includes
import Colors from '../../shared/constants/colors';
import InputBox from '../../shared/components/InputBox';
// Styles

// This is the screen where users can send and read messages belonging to the chatroom
const ChatRoom = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={messages}
          inverted
          progressViewOffset={20}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={({item}) => <> </>}
        />
      )}

      <InputBox />
    </View>
  );
};

export default ChatRoom;
