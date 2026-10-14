import { useEffect } from "react";
import { BASE_URL } from "../consts";

export function useNotifications({
  idInstance,
  token,
  onMessage,
}: {
  idInstance: string;
  token: string;
  onMessage: (val: { chatId: string; text: string }) => void;
}) {
  useEffect(() => {
    const controller = new AbortController();
    const base = `${BASE_URL}/waInstance${idInstance}`;

    async function poll() {
      while (!controller.signal.aborted) {
        try {
          const res = await fetch(
            `${base}/receiveNotification/${token}?receiveTimeout=30`,
            { signal: controller.signal },
          );
          const notification = await res.json();

          if (notification) {
            const { receiptId, body } = notification;

            if (
              body.typeWebhook === "incomingMessageReceived" &&
              body.messageData?.typeMessage === "textMessage"
            ) {
              onMessage({
                chatId: body.senderData.chatId,
                text: body.messageData.textMessageData.textMessage,
              });
            }

            await fetch(`${base}/deleteNotification/${token}/${receiptId}`, {
              method: "DELETE",
              signal: controller.signal,
            });
          }
        } catch (e) {
          if (controller.signal.aborted) return;
          await new Promise((r) => setTimeout(r, 3000));
          console.log(e);
        }
      }
    }

    poll();
    return () => controller.abort();
  }, [idInstance, token, onMessage]);
}
