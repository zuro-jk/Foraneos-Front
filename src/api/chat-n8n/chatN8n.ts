import apiChat from "@/lib/apiMicroserviceChat";
import type { ChatMessageFromAPI } from "../../types/chat-n8n/chatN8nTypes.types";

export const getChatData = async (
  chatId: number
): Promise<ChatMessageFromAPI[]> => {
  try {
    const response = await apiChat.get(`/chat/data/${chatId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chat data:", error);
    throw error;
  }
};
