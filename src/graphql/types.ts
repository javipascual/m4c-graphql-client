/* eslint-disable */
import gql from "graphql-tag";
import * as ReactApolloHooks from "react-apollo-hooks";
import * as ReactApollo from "react-apollo";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Chat = {
  __typename?: "Chat";
  id: Scalars["ID"];
  name: Scalars["String"];
  picture?: Maybe<Scalars["String"]>;
  lastMessage?: Maybe<Message>;
  messages: Array<Message>;
};

export type Message = {
  __typename?: "Message";
  id: Scalars["ID"];
  content: Scalars["String"];
  createdAt: Scalars["Date"];
  chat?: Maybe<Chat>;
};

export type Mutation = {
  __typename?: "Mutation";
  addMessage?: Maybe<Message>;
};

export type MutationAddMessageArgs = {
  chatId: Scalars["ID"];
  content: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  chats: Array<Chat>;
  chat?: Maybe<Chat>;
};

export type QueryChatArgs = {
  chatId: Scalars["ID"];
};

export type Subscription = {
  __typename?: "Subscription";
  chatId: Scalars["ID"];
  messageAdded: Message;
};
export type ChatFragment = { __typename?: "Chat" } & Pick<
  Chat,
  "id" | "name" | "picture"
>;

export type MessageFragment = { __typename?: "Message" } & Pick<
  Message,
  "id" | "createdAt" | "content"
>;

export type FullChatFragment = { __typename?: "Chat" } & {
  messages: Array<{ __typename?: "Message" } & MessageFragment>;
} & ChatFragment;

export type GetChatsQueryVariables = {};

export type GetChatsQuery = { __typename?: "Query" } & {
  chats: Array<{ __typename?: "Chat" } & ChatFragment>;
};

export type GetChatQueryVariables = {
  chatId: Scalars["ID"];
};

export type GetChatQuery = { __typename?: "Query" } & {
  chat: Maybe<{ __typename?: "Chat" } & FullChatFragment>;
};

export type AddMessageMutationVariables = {
  chatId: Scalars["ID"];
  content: Scalars["String"];
};

export type AddMessageMutation = { __typename?: "Mutation" } & {
  addMessage: Maybe<{ __typename?: "Message" } & MessageFragment>;
};

export type MessageAddedSubscriptionVariables = {};

export type MessageAddedSubscription = { __typename?: "Subscription" } & {
  messageAdded: { __typename?: "Message" } & {
    chat: Maybe<{ __typename?: "Chat" } & Pick<Chat, "id">>;
  } & MessageFragment;
};
export const ChatFragmentDoc = gql`
  fragment Chat on Chat {
    id
    name
    picture
  }
`;
export const MessageFragmentDoc = gql`
  fragment Message on Message {
    id
    createdAt
    content
  }
`;
export const FullChatFragmentDoc = gql`
  fragment FullChat on Chat {
    ...Chat
    messages {
      ...Message
    }
  }
  ${ChatFragmentDoc}
  ${MessageFragmentDoc}
`;
export const GetChatsDocument = gql`
  query GetChats {
    chats {
      ...Chat
    }
  }
  ${ChatFragmentDoc}
`;

export function useGetChatsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<GetChatsQueryVariables>
) {
  return ReactApolloHooks.useQuery<GetChatsQuery, GetChatsQueryVariables>(
    GetChatsDocument,
    baseOptions
  );
}
export const GetChatDocument = gql`
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      ...FullChat
    }
  }
  ${FullChatFragmentDoc}
`;

export function useGetChatQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<GetChatQueryVariables>
) {
  return ReactApolloHooks.useQuery<GetChatQuery, GetChatQueryVariables>(
    GetChatDocument,
    baseOptions
  );
}
export const AddMessageDocument = gql`
  mutation AddMessage($chatId: ID!, $content: String!) {
    addMessage(chatId: $chatId, content: $content) {
      ...Message
    }
  }
  ${MessageFragmentDoc}
`;
export type AddMessageMutationFn = ReactApollo.MutationFn<
  AddMessageMutation,
  AddMessageMutationVariables
>;

export function useAddMessageMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    AddMessageMutation,
    AddMessageMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    AddMessageMutation,
    AddMessageMutationVariables
  >(AddMessageDocument, baseOptions);
}
export const MessageAddedDocument = gql`
  subscription MessageAdded {
    messageAdded {
      chat {
        id
      }
      ...Message
    }
  }
  ${MessageFragmentDoc}
`;

export function useMessageAddedSubscription(
  baseOptions?: ReactApolloHooks.SubscriptionHookOptions<
    MessageAddedSubscription,
    MessageAddedSubscriptionVariables
  >
) {
  return ReactApolloHooks.useSubscription<
    MessageAddedSubscription,
    MessageAddedSubscriptionVariables
  >(MessageAddedDocument, baseOptions);
}
