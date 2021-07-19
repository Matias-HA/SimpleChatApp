// Libraries
import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';

// Includes
import Colors from '../../shared/constants/colors';
import InputBox from '../../shared/components/InputBox';
import ChatMessageListItem from './ChatMessageListItem';
import {
  GetChatroomMessages,
  GetCurrentUser,
} from '../../shared/firestore/queries';

// Styles

// This is the screen where users can send and read messages belonging to the chatroom
const ChatRoom = ({route}) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState();

  const {chatroomID} = route.params;

  useEffect(() => {
    //Get the current user's firestore information
    const GetUserInfo = async () => {
      await GetCurrentUser(setUser);
    };

    GetUserInfo();

    //Listen for any new messages
    const unsubscribe = GetChatroomMessages(chatroomID).onSnapshot(snapshot => {
      let newMessages = [];

      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          newMessages.push(change.doc.data());
          //console.log('New message has been added: ', change.doc.data());
        }
        if (change.type === 'modified') {
          console.log('Message has been modified: ', change.doc.data());
        }
        if (change.type === 'removed') {
          console.log('Message has been removed: ', change.doc.data());
        }
      });

      // Add new messages to state
      setMessages(currentMessages => [...newMessages, ...currentMessages]);
      setLoading(false);
    });

    //unsubscribe from listener on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  const loadMoreMessages = async () => {
    // // Get the last visible document
    const lastVisible = await GetChatroomMessages(chatroomID, page)
      .get()
      .then(documentSnapshots => {
        return documentSnapshots.docs[documentSnapshots.docs.length - 1];
      });

    // New query starting at last visible document
    // get the next 50 messages.
    // TODO move to query file
    var next = await firestore()
      .collection('ChatRooms')
      .doc(chatroomID)
      .collection('Messages')
      .orderBy('createdAt', 'desc')
      .startAfter(lastVisible)
      .limit(50);
    // Add the new messages to our current messages
    next.get().then(QuerySnapshot => {
      let newMessages = [];
      QuerySnapshot.forEach(doc => {
        newMessages.push(doc.data());
      });
      setMessages(currentMessages => [...currentMessages, ...newMessages]);
    });
    //Update current page count
    setPage(page + 1);
    setPageLoading(false);
  };

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
          onEndReached={() => {
            if (!pageLoading) {
              setPageLoading(true);
              loadMoreMessages();
              console.log('End reached: Querying for more messages');
            }
          }}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={({item}) => <ChatMessageListItem message={item} />}
        />
      )}

      <InputBox />
    </View>
  );
};

export default ChatRoom;
