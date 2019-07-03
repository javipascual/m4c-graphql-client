import React from 'react';
import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom';
import Chat from './components/Chat';
import ChatsList from './components/ChatsList';
import { useMessageAddedSubscription } from './graphql/types';
import { writeCache } from './cache.utils'

const App: React.FC = () => {
  useMessageAddedSubscription({
    onSubscriptionData: ({ client, subscriptionData: { data } }) => {
      if (!data) return null;
      const { chat, ...msg } = data.messageAdded;
      if (!chat) return null;
      writeCache(client, chat.id, msg);
    },
  });

  return (
    <BrowserRouter>
      <Route exact path="/" component={ChatsList} />
      <Route exact path="/chats" component={ChatsList} />
      <Route exact path="/chats/:chatId"
        component={({ match }: RouteComponentProps<{ chatId: string }>) => (
          <Chat chatId={match.params.chatId} />
        )}
      />
    </BrowserRouter>
  );
};

export default App;
