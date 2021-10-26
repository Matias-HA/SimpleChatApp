// The firestore chatroom object
export type UserInfo = {
  userId: string | undefined;
  name: string | undefined;
  avatar: string | undefined;
};

// The firestore chatroom object
export type ChatRoomData = {
  id: string;
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
