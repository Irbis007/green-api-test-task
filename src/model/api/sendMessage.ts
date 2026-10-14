import { BASE_URL } from "../consts";

export const sendMessage = ({
  idInstance,
  token,
  activeChat,
  message,
}: {
  idInstance: string;
  token: string;
  activeChat: string;
  message: string;
}) => {
  return fetch(`${BASE_URL}/waInstance${idInstance}/sendMessage/${token}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chatId: `${activeChat}@c.us`,
      message,
    }),
  });
};
