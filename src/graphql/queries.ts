import gql from 'graphql-tag';
import { Chat, FullChat, Message } from './fragments';

export const getChatsQuery = gql`
  query GetChats {
    chats {
      ...Chat
    }
  }
  ${Chat}
`;

export const getChatQuery = gql`
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      ...FullChat
    }
  }
  ${FullChat}
`;

export const addMessageMutation = gql`
  mutation AddMessage($chatId: ID!, $content: String!) {
    addMessage(chatId: $chatId, content: $content) {
      ...Message
    }
  }
  ${Message}
`;