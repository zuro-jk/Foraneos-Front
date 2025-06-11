import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const suggestedQuestions = [
  "¿Qué puedo cenar si quiero bajar de peso?",
  "¿Cuánta agua debo tomar al día?",
  "¿Qué ejercicios ayudan a ganar masa muscular?",
  "¿Es malo saltarse el desayuno?",
  "¿Qué snacks saludables recomiendas?",
];

interface Message {
  from: "user" | "ia";
  text: string;
  timestamp?: Date;
}

function parseMarkdownBlod(text: string) {
  // Negrita
  let html = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  // Listas con *
  html = html.replace(/(^|\n)\* (.*?)(?=\n|$)/g, "$1<li>$2</li>");

  // Si hay al menos una <li>, envolver en <ul>
  if (html.includes("<li>")) {
    html = `<ul style="list-style: disc; padding-left: 1.5em;">${html}</ul>`;
  }
  return html;
}

const NutritionistArtificial = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "ia",
      text: "¡Hola! Soy tu nutricionista virtual. ¿En qué puedo ayudarte hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000", {
      transports: ["websocket"],
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Conectado al servidor WebSocket");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Desconectado del servidor WebSocket");
      setIsConnected(false);
    });

    socket.on("userMessage", (data: { message: string }) => {
      setMessages((prev) => [
        ...prev,
        {
          from: "user",
          text: data.message,
          timestamp: new Date(),
        },
      ]);
      setIsLoading(true);
    });

    socket.on("aiResponse", (data: { message: string }) => {
      setMessages((prev) => [
        ...prev,
        {
          from: "ia",
          text: data.message,
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    });

    socket.on("error", (data: { message: string }) => {
      console.error("Error del servidor:", data.message);
      setMessages((prev) => [
        ...prev,
        {
          from: "ia",
          text: "Lo siento, ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.",
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !isConnected || isLoading) return;

    socketRef.current?.emit("message", { message: input.trim() });
    setInput("");
  };

  const handleSuggested = (q: string) => {
    setInput(q);
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl h-[90vh]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-full">
        {/* Sugerencias */}
        <div className="col-span-1 bg-gradient-to-br from-[#416450]/80 to-[#2e4734]/80 rounded-2xl p-6 flex flex-col gap-6 shadow-lg">
          <span className="text-2xl font-bold text-white text-center mb-2">
            Sugerencias rápidas
          </span>
          <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                className="bg-white/90 hover:bg-green-100 text-green-900 rounded-lg px-4 py-2 text-left transition font-medium shadow"
                onClick={() => handleSuggested(q)}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Indicador de conexion */}
          <div className="mt-auto flex-shrink-0">
            <div
              className={cn(
                "flex items-center gap-2 text-sm",
                isConnected ? "text-green-200" : "text-red-200"
              )}
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  isConnected ? "bg-green-400" : "bg-red-400"
                )}
              />
              {isConnected ? "Conectado" : "Desconectado"}
            </div>
          </div>
        </div>

        {/* Chat principal */}
        <div className="col-span-1 md:col-span-3 flex flex-col bg-white/80 rounded-2xl shadow-lg h-full overflow-hidden">
          <div className="flex items-center justify-between px-8 py-6 border-b flex-shrink-0">
            <span className="text-3xl font-bold text-green-900">
              Nutricionista IA
            </span>
            <img
              src="/images/icons/ia-icon.png"
              alt="Nutricionista IA"
              className="w-12 h-12"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2 px-8 py-6 overflow-y-auto min-h-0">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "px-4 py-3 rounded-xl max-w-[70%] break-words shadow whitespace-pre-wrap",
                  msg.from === "user"
                    ? "bg-green-100 self-end text-right text-green-900"
                    : "bg-green-700/90 text-white self-start text-left"
                )}
              >
                {msg.from === "ia" ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: parseMarkdownBlod(msg.text),
                    }}
                  />
                ) : (
                  msg.text
                )}
              </div>
            ))}

            {/* Indicador de carga */}
            {isLoading && (
              <div className="bg-green-700/90 text-white self-start text-left px-4 py-3 rounded-xl max-w-[70%] shadow">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                  <span className="text-sm">Escribiendo...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={handleSend}
            className="flex items-center gap-4 px-8 py-6 border-t bg-white/90 rounded-b-2xl flex-shrink-0"
          >
            <input
              className="flex-1 p-3 rounded-lg border border-green-300 bg-white text-green-900 outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50"
              placeholder={
                isConnected
                  ? "Escribe tu pregunta sobre nutrición..."
                  : "Conectando..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={!isConnected || isLoading}
            />
            <button
              type="submit"
              className="cursor-pointer bg-green-600 hover:bg-green-700 text-white rounded-full p-3 transition disabled:opacity-50 disabled:cursor-not-allowed"
              title="Enviar"
              disabled={!isConnected || isLoading || !input.trim()}
            >
              <Send size={22} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NutritionistArtificial;
