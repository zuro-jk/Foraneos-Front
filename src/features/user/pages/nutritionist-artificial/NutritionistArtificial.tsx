import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

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

  return (
    <div className="container p-4 mx-auto">
      <div className="grid h-[89vh] grid-cols-8">
        <div className="col-span-2 flex flex-col bg-[#416450]/50 backdrop-blur-[30px] p-8 rounded-tl-lg rounded-bl-lg">
          <span className="text-4xl font-bold text-center">Consultas</span>
          <ul className="flex flex-col gap-8 mt-8 flx">
            <li>Tengo que comer menos ...</li>
            <li>Los ejercicios son impor ...</li>
            <li>Puedo comer pastel de choc...</li>
            <li>Dejar de comer es malo?</li>
            <li>El agua es tan importante?</li>
          </ul>
        </div>
        <div className="col-span-6 flex flex-col flex-1 min-h-0 bg-[#CBFFCD]/70 rounded-tr-lg rounded-br-lg backdrop-blur-[30px]">
          <div className="flex items-center justify-between p-8 border-black">
            <span className="text-4xl font-bold">Nutricionista IA</span>
            <img
              src="/images/icons/ia-icon.png"
              alt="Nutricionista IA"
            />
          </div>
          <div className="flex flex-col flex-1 min-h-0 gap-2 p-8 my-4 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "px-4 py-2 rounded-lg break-words w-fit max-w-[60%] text-white",
                  msg.from === "user"
                    ? "bg-green-800 self-end text-right"
                    : "bg-zinc-950/80 self-start text-left"
                )}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={handleSend}
            className="flex h-32 gap-2 p-8 mt-2"
          >
            <input
              className="flex-1 p-2 text-white rounded outline-none bg-black/40"
              placeholder="Pregunta sobre tu nutrición o nuestra app"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default NutritionistArtificial;
