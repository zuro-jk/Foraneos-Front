import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const SOCKET_URL = "http://localhost:8080/ws";

const ChatTest = () => {
  const [messages, setMessages] = useState<
    { userId: number; content: string; fromUser: boolean }[]
  >([]);
  const [input, setInput] = useState<string>("");
  const stompClientRef = useRef<any>(null);

  useEffect(() => {
    const socket = new SockJS(SOCKET_URL);
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/chat/1", (message: any) => {
        setMessages((prev) => [...prev, JSON.parse(message.body)]);
      });
    });

    return () => {
      if (
        stompClientRef.current &&
        stompClientRef.current.connected &&
        stompClientRef.current.ws &&
        stompClientRef.current.ws.readyState === 1 // 1 = OPEN
      ) {
        stompClientRef.current.disconnect(() => {
          console.log("Disconnected");
        });
      }
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() && stompClientRef.current) {
      stompClientRef.current.send(
        "/app/chat/send",
        {},
        JSON.stringify({
          userId: 1,
          content: input,
        })
      );
      setInput("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 border rounded-lg p-4 bg-white shadow">
      <h2 className="text-lg font-bold mb-4">Chat de Prueba</h2>
      <div className="h-64 overflow-y-auto border p-2 mb-4 bg-gray-50 rounded">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className="mb-2"
          >
            <span className="font-semibold">
              {msg.fromUser ? "Tú": "Agente IA"}: {" "}
            </span>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-green-600 text-white px-4 py-1 rounded"
          onClick={sendMessage}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatTest;
