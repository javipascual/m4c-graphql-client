export type Message = {
  id: string;
  content: string;
  createdAt: number;
}

export type Chat = {
  id: string;
  name: string;
  picture: string;
  messages: Array<Message>;
}