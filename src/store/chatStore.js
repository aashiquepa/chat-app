import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

export const useChatStore = create(
  persist(
    (set, get) => ({
      chats: {},
      initializing: true,

      addMessage: (chatId, newMessage) =>
        set(state => ({
          chats: {
            ...state.chats,
            [chatId]: [...(state.chats[chatId] || []), newMessage],
          },
        })),

      updateMessage: (chatId, updatedMessage) =>
        set(state => {
          const chatMessages = state.chats[chatId] || [];
          const updatedMessages = chatMessages.map(msg =>
            msg.id === updatedMessage.id ? {...msg, ...updatedMessage} : msg,
          );
          return {chats: {...state.chats, [chatId]: updatedMessages}};
        }),

      deleteMessage: (chatId, id) =>
        set(state => ({
          chats: {
            ...state.chats,
            [chatId]: (state.chats[chatId] || []).filter(msg => msg.id !== id),
          },
        })),
      getChatMessages: chatId => {
        const messages = get().chats[chatId] || [];
        return messages.slice().reverse(); // Return a reversed copy of the messages array
      },
      getLastMessage: (chatId) => {
        const messages = get().chats[chatId] || [];
        return messages.slice().reverse()[0]||{}; // Return the first message in the reversed array (the most recent one)
      },

      resetChat: chatId =>
        set(state => ({
          chats: {...state.chats, [chatId]: []},
        })),

      setInitializing: bool => set({initializing: bool}),
    }),
    {
      name: 'CHAT_SESSION', // Storage key for AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => state => {
        state.setInitializing(false);
      },
    },
  ),
);
