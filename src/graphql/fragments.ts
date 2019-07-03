import gql from 'graphql-tag';

export const Chat = gql`
  fragment Chat on Chat {
    id
    name
    picture
  }
`;

export const Message = gql`
  fragment Message on Message {
    id
    createdAt
    content
  }
`;

export const FullChat =  gql`
  fragment FullChat on Chat {
    ...Chat
    messages {
      ...Message
    }
  }
  ${Chat}
  ${Message}
`;
