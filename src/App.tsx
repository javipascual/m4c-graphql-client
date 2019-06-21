import React from 'react';
import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom';
import Chat from './components/Chat';
import ChatsList from './components/ChatsList';

const App: React.FC = () => {
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
