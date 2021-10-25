// The firestore chatroom object
export type UserInfo = {
  userId: string;
  name: string;
  avatar: string;
};

// The firestore chatroom object
export type ChatRoomData = {
  id: number;
  data: {
    name: string;
    description: string;
    lastMessageCreatedAt: string;
  };
};

// The firestore message object
export type ChatRoomMessage = {
  avatar: string;
  content: string;
  createdAt: number;
  image: string;
  name: string;
  userId: string;
};
