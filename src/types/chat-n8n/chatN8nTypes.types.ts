export interface ChatMessageFromAPI {
  id: number;
  session_id: string;
  message: {
    type: "human" | "ai";
    content: string;
    additional_kwargs?: Record<string, unknown>;
    response_metadata?: Record<string, unknown>;
    tool_calls?: Array<Record<string, unknown>>;
    invalid_tool_calls?: Array<Record<string, unknown>>;
  };
}

export interface LocalChatMessage {
  from: "user" | "ia";
  text: string;
  timestamp?: Date;
}

// Tipo unificado para el componente ChatMessage
export interface UnifiedChatMessage {
  id?: number;
  from: "user" | "ia";
  text: string;
  timestamp?: Date;
}
