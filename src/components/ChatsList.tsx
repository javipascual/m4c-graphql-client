import React from 'react';
import { Link } from 'react-router-dom';
import { useGetChatsQuery } from '../graphql/types';

const ChatsList: React.FC = () => {
  const { data } = useGetChatsQuery();

  if (data === undefined || data.chats === undefined) {
    return null;
  }

  const chats = data.chats;

  return (
    <React.Fragment>
      <div style={style.toolbar}>M4C GraphQL</div>
      <div style={style.container}>
        <ul style={style.list}>
          {chats.map(chat => (
            <li style={style.listItem} key={chat.id}>
              <Link style={style.listLink} to={`/chats/${chat.id}`}>
                {chat.picture && <img style={style.picture} src={chat.picture} alt="Profile" />}
                <div style={style.content}>{chat.name}</div>
              </Link>
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
  listLink: {
    display: 'flex',
    textDecoration: 'none',
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