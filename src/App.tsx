import { useCallback, useState } from "react";
import { LoginPage } from "./LoginPage";
import { useInstanceStore } from "./model/store/instanceStore";
import type { Message } from "./model/types";
import { useNotifications } from "./model/hooks";
import { useChatsStore } from "./model/store";
import { sendMessage } from "./model/api/sendMessage";
import { Button } from "./components/Button";

function App() {
  const [textMessage, setTextMessage] = useState("");
  const { setApiTokenInstance, setIdInstance, idInstance, apiTokenInstance } =
    useInstanceStore();
  const chats = useChatsStore((state) => state.chats);
  const setChats = useChatsStore((state) => state.setChats);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [messages, setMessages] = useState<Record<string, Message[]>>({});

  const [activeChat, setActiveChat] = useState<null | string>(null);

  const handleIncoming = useCallback(
    ({ chatId, text }: { chatId: string; text: string }) => {
      setMessages((prev) => ({
        ...prev,
        [chatId]: [
          ...(prev[chatId] || []),
          {
            idMessage: crypto.randomUUID(),
            chatId,
            textMessage: text,
            type: "incoming",
          },
        ],
      }));
    },
    [],
  );

  useNotifications({
    token: apiTokenInstance || "",
    idInstance: idInstance || "",
    onMessage: handleIncoming,
  });

  if (!idInstance || !apiTokenInstance) {
    return <LoginPage />;
  }

  function onLogout() {
    setIdInstance("");
    setApiTokenInstance("");
  }

  return (
    <div className="flex h-full">
      <div className="flex flex-col w-80 h-full bg-sidebar-rail border-r border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (phoneNumber.length) {
              setActiveChat(phoneNumber);
              setChats(phoneNumber);
            }
          }}
          className="flex gap-2 h-15 p-2 border-b border-border"
        >
          <input
            className="w-full h-10 px-2 bg-bg-secondary rounded-lg border border-border text-white"
            type="text"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => {
              if (!Number.isNaN(+e.target.value)) {
                setPhoneNumber(e.target.value);
              }
            }}
          />
          <Button title="Invite" />
        </form>
        <div className="grow">
          {chats.map((item) => (
            <div
              key={item}
              onClick={() => setActiveChat(item)}
              className={`px-3 py-2 h-15 text-white text-sm border-b border-border hover:bg-bg-secondary cursor-pointer
                transition-colors ${item === activeChat ? "bg-surface" : ""}`}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="shrink-0 w-full h-15 p-2 border-t border-border">
          <Button onClick={onLogout} title="Logout" />
        </div>
      </div>
      <div className="flex flex-col w-full">
        {activeChat ? (
          <div className="flex flex-col h-full">
            <div className="grow p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages[activeChat]?.map((item) => {
                  return (
                    <div
                      className={`p-2 rounded-lg text-white min-w-max w-max max-w-1/2 ${item?.type !== "incoming" ? "ml-auto bg-message-outgoing" : "bg-message-incoming"}`}
                    >
                      {item.textMessage}
                    </div>
                  );
                })}
              </div>
            </div>

            <form
              className="flex items-center gap-2 shrink-0 w-full h-15 p-2 border-t border-border"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage({
                  message: textMessage,
                  idInstance,
                  activeChat,
                  token: apiTokenInstance,
                })
                  .then((res) => res.json())
                  .then((res) => {
                    setTextMessage("");
                    setMessages((prev) => ({
                      ...prev,
                      [activeChat]: [
                        ...(prev[activeChat] || []),
                        {
                          idMessage: res.idMessage,
                          chatId: activeChat,
                          textMessage: textMessage,
                          type: "outcoming",
                        },
                      ],
                    }));
                  });
              }}
            >
              <input
                type="text"
                className="w-full px-2 bg-bg-secondary border border-border rounded-lg h-full text-white"
                placeholder="Message..."
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
              />
              <Button title="Send" />
            </form>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            Selec chat
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
