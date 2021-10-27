/**
 * @description The navigation stack params
 */
export type StackParamList = {
  Login: undefined;
  Main: undefined;
  ChatRoom: {chatroomId: string; chatroomName: string};
};

/**
 * @description The firestore user object
 */
export type UserInfo = {
  userId: string | undefined;
  name: string | undefined;
  avatar: string | undefined;
};

/**
 * @description The firestore chatroom object
 */
export type ChatRoomData = {
  id: string;
  data: {
    name: string;
    description: string;
    lastMessageCreatedAt: string;
  };
};

/**
 * @description The firestore chatroom message object
 */
export type ChatRoomMessage = {
  avatar: string;
  content: string;
  createdAt: number;
  image: string;
  name: string;
  userId: string;
};
