import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

const suggestedQuestions = [
  "¿Qué puedo cenar si quiero bajar de peso?",
  "¿Cuánta agua debo tomar al día?",
  "¿Qué ejercicios ayudan a ganar masa muscular?",
  "¿Es malo saltarse el desayuno?",
  "¿Qué snacks saludables recomiendas?",
];

const NutritionistArtificial = () => {
  const [messages, setMessages] = useState([
    {
      from: "ia",
      text: "¡Hola! Soy tu nutricionista virtual. ¿En qué puedo ayudarte hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: input }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "ia",
          text: "Esta es una respuesta automática. (Integra aquí tu IA) ",
        },
      ]);
    }, 1000);
    setInput("");
  };

  const handleSuggested = (q: string) => {
    setInput(q);
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[80vh]">
        {/* Sugerencias */}
        <div className="col-span-1 bg-gradient-to-br from-[#416450]/80 to-[#2e4734]/80 rounded-2xl p-6 flex flex-col gap-6 shadow-lg">
          <span className="text-2xl font-bold text-white text-center mb-2">
            Sugerencias rápidas
          </span>
          <div className="flex flex-col gap-3">
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
        </div>
        {/* Chat principal */}
        <div className="col-span-1 md:col-span-3 flex flex-col bg-white/80 rounded-2xl shadow-lg h-full">
          <div className="flex items-center justify-between px-8 py-6 border-b">
            <span className="text-3xl font-bold text-green-900">
              Nutricionista IA
            </span>
            <img
              src="/images/icons/ia-icon.png"
              alt="Nutricionista IA"
              className="w-12 h-12"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2 px-8 py-6 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "px-4 py-3 rounded-xl max-w-[70%] break-words shadow",
                  msg.from === "user"
                    ? "bg-green-100 self-end text-right text-green-900"
                    : "bg-green-700/90 text-white self-start text-left"
                )}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={handleSend}
            className="flex items-center gap-4 px-8 py-6 border-t bg-white/90 rounded-b-2xl"
          >
            <input
              className="flex-1 p-3 rounded-lg border border-green-300 bg-white text-green-900 outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Escribe tu pregunta sobre nutrición o la app..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white rounded-full p-3 transition"
              title="Enviar"
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
