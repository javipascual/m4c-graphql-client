import React, { useState, useEffect } from 'react';
import { getChatsQuery } from '../graphql/queries';
import { Chat } from '../types';


const ChatsList: React.FC = () => {
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const body = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: getChatsQuery }),
      });
      const { data: { chats } } = await body.json();
      setChats(chats);
    }
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div style={style.toolbar}>M4C GraphQL</div>
      <div style={style.container}>
        <ul style={style.list}>
          {chats.map((chat: Chat) => (
            <li style={style.listItem} key={chat.id}>
              <img style={style.picture} src={chat.picture} alt="Profile" />
              <div style={style.content}>{chat.name}</div>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

const style: { [id: string]: React.CSSProperties } = {
  toolbar: {
    backgroundColor: 'grey',
    color: 'black',
    fontSize: '20px',
    lineHeight: '40px',
    height: '2rem',
    padding: '1rem',
  },
  container: {
    height: 'calc(100% - 56px)',
    overflowY: 'scroll'
  },
  list: {
    padding: '0 !important'
  },
  listItem: {
    height: '76px',
    padding: '1 rem',
    display: 'flex'
  },
  picture: {
    height: '50px',
    width: '50px',
    objectFit: 'cover',
    borderRadius: '50%'
  },
  content: {
    color: 'gray',
    fontSize: '15px',
    marginTop: '5px',
    margin: '15px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
};

export default ChatsList;