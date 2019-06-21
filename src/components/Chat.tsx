import React, { useEffect, useState } from 'react';
import { getChatQuery } from '../graphql/queries';
import moment from 'moment';
import { Chat as ChatType, Message } from '../types';


interface ChatParams {
  chatId: string;
}

const Chat: React.FC<ChatParams> = ({ chatId }) => {
  const [chat, setChat] = useState<ChatType|null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const body = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: getChatQuery, variables: { chatId } }),
      });
      const { data: { chat } } = await body.json();
      setChat(chat);
    };
    fetchData();
  }, [chatId]);

  if (!chat) return null;

  return (
    <React.Fragment>
      <div style={style.toolbar}>
        <button style={style.backButton}>{"⬅"}</button>
        <img style={style.picture} src={chat.picture} alt="profile" />
        <div style={style.name}>{chat.name}</div>
      </div>
      <ul style={style.container}>
        {chat.messages.map((message: Message) => (
          <li style={style.item} key={message.id}>
            <div style={style.content} >{message.content}</div>
            <div style={style.timestamp}>{moment(message.createdAt).format('HH:mm')}</div>
          </li>
        ))}
      </ul>
      <div style={style.sendLayout}>
        <input style={style.input} type="text" placeholder="Type a message" />
        <button style={style.sendButton} type="button">➡</button>
      </div>
    </React.Fragment>
  );
};

const style: { [id: string] : React.CSSProperties } = {
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'grey',
    color: 'black',
    height: '4rem',
  },
  backButton: {
    color: 'black',
    margin: '10px 30px',
    fontSize: '30px',
  },
  name: {
    lineHeight: '56px',
  },
  picture: {
    height: '40px',
    width: '40px',
    marginTop: '3px',
    marginLeft: '-22px',
    objectFit: 'cover',
    padding: '5px',
    borderRadius: '50%',
  },
  container: {
    display: 'block',
    flex: 2,
    padding: '0 15px',
  },
  item: {
    float: 'right',
    backgroundColor: '#dddddd',
    display: 'inline-block',
    position: 'relative',
    maxWidth: '100%',
    borderRadius: '7px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.15)',
    marginTop: '10px',
    marginBottom: '10px',
    clear: 'both',
  },
  content: {
    padding: '5px 7px',
    wordWrap: 'break-word',
  },
  timestamp: {
    float: 'right',
    color: 'gray',
    fontSize: '12px',
    padding: '4px',
  },
  sendLayout: {
    display: 'flex',
    padding: '5px',
    width: 'calc(100% - 10px)'
  },
  input: {
    width: 'calc(100% - 50px)',    
    padding: '10px',
    fontSize: '18px',
  },
  sendButton: {
    width: '50px',
  }
};

export default Chat;