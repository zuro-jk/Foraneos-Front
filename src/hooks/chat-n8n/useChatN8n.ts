import { useQuery } from "@tanstack/react-query";
import { getChatData } from "../../api/chat-n8n/chatN8n";
import type { ChatMessageFromAPI } from "../../types/chat-n8n/chatN8nTypes.types";

export function useGetChatN8n(chatId: number) {
  return useQuery<ChatMessageFromAPI[]>({
    queryKey: ["chatN8n"],
    queryFn: () => getChatData(chatId),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: !!chatId,
  });
}
