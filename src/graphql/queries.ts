import gql from 'graphql-tag';

export const getChatsQuery = gql`
  query GetChats {
    chats {
      id
      name
      picture
    }
  }
`;

export const getChatQuery = `
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      id
      name
      picture
      messages {
        id
        content
        createdAt
      }
    }
  }
`;