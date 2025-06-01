import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  ImagePlus,
  Heart,
  MessageCircle,
  Send,
} from "lucide-react";

const categories = ["Todos", "Recetas", "Nutrición", "Tips"];
const posts = [
  {
    id: 1,
    user: "mariafit",
    time: "Hace 3h",
    text: "Hoy hice avena con manzana 🍎, rápida y rica.",
    image: "/images/recipes/receta-1.png",
    category: "Recetas",
    privacy: "Público",
    likes: 12,
    comments: [
      { user: "juanfit", text: "¿La cocinaste con leche o agua?" },
      { user: "mariafit", text: "Con leche vegetal 🙌" },
    ],
  },
  {
    id: 2,
    user: "nutrimax",
    time: "Hace 1 día",
    text: "5 consejos para mantenerte hidratado durante el día 💧",
    image: "",
    category: "Tips",
    privacy: "Público",
    likes: 34,
    comments: [],
  },
];

const Social = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState<File | null>(null);

  return (
    <div className="container mx-auto max-w-3xl py-8 flex flex-col gap-8">
      {/* Encabezado */}
      <div className="text-3xl font-extrabold flex items-center gap-2 mb-2">
        <span
          role="img"
          aria-label="comunidad"
        >
          🌐
        </span>
        COMUNIDAD / SOCIAL
      </div>

      {/* Publicar */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 border">
        <span className="font-bold text-lg mb-2">¿En qué estás pensando?</span>
        <textarea
          className="w-full min-h-[80px] border rounded p-2 resize-none"
          placeholder="Comparte una receta, tip o experiencia..."
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <ImagePlus size={20} />
            <span>Subir imagen</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setPostImage(e.target.files?.[0] || null)}
            />
          </label>
          <select className="border rounded p-2">
            <option>Receta</option>
            <option>Tip</option>
            <option>Nutrición</option>
          </select>
          <select className="border rounded p-2">
            <option>🔓 Público</option>
            <option>🔒 Solo amigos</option>
          </select>
        </div>
        <div className="flex justify-end">
          <Button className="px-6 py-2 font-bold">Publicar</Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="font-semibold">Filtros:</span>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            className="px-4 py-1 text-sm"
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-6">
        {posts
          .filter(
            (p) =>
              selectedCategory === "Todos" || p.category === selectedCategory
          )
          .map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border"
            >
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-bold">@{post.user}</span>·
                <span>{post.time}</span>
                <span className="ml-auto px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                  {post.category}
                </span>
              </div>
              <div className="text-lg">{post.text}</div>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full max-h-60 object-cover rounded-lg my-2"
                />
              )}
              <div className="flex items-center gap-4 text-gray-500 text-sm mt-2">
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" /> {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" /> {post.comments.length}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto"
                >
                  Responder
                </Button>
              </div>
              {/* Comentarios */}
              <div className="pl-4 mt-2 flex flex-col gap-1">
                {post.comments.map((c, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <span className="font-bold">@{c.user}:</span>
                    <span>{c.text}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    placeholder="Agregar comentario..."
                    className="flex-1"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Social;
