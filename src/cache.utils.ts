import { getChatQuery } from './graphql/queries';
import { Chat, Message } from './graphql/types';
import { ApolloClient } from 'apollo-client';
import { DataProxy } from 'apollo-cache';

type Client = ApolloClient<any> | DataProxy;

export const writeCache = (client: Client, chatId: string, message: Message) => {
  const data: {chat: Chat} | null = client.readQuery({
    query: getChatQuery,
    variables: { chatId }
  });

  if (!data) return;

  // do not update if already exists
  if (data.chat.messages.some((m: any) => m.id === message.id)) return;

  client.writeQuery({
    query: getChatQuery,
    variables: { chatId },
    data: {
      chat: {
        ...data.chat,
        messages: data.chat.messages.concat(message),
      },
    },
  });
};