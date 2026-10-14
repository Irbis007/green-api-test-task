export type Message = {
  idMessage: string;
  chatId: string;
  isEdited?: boolean;
  isDeleted?: boolean;
  sendByApi?: boolean;
  statusMessage?: string;
  textMessage: string;
  type: "incoming" | "outcoming";
};
