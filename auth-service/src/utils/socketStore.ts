const userSocketMap = new Map<string, string>();

export const addUserSocket = (userId: string, socketId: string) => {
  userSocketMap.set(userId, socketId);
};

export const removeUserSocket = (socketId: string) => {
  for (const [userId, sId] of userSocketMap.entries()) {
    if (sId === socketId) {
      userSocketMap.delete(userId);
      break;
    }
  }
};

export const getSocketIdByUserId = (userId: string): string | undefined => {
  return userSocketMap.get(userId);
};