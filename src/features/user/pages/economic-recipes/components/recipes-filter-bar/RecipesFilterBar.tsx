import { useState } from "react";

const availableTags = [
  "vegetariano",
  "rápido",
  "clásico",
  "oriental",
  "almuerzo",
  "cena",
];

function RecipesFilterBar() {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(10);
  const [maxTime, setMaxTime] = useState(60);

  const toggleTags = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow flex flex-col gap-4 md:flex-row md:items-center md:justify-between ">
      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Buscar receta..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 rounded-md border dark:border-zinc-700 bg-gray-50 dark:bg-zinc-700 dark:text-white w-full md:w-64"
      />

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTags(tag)}
            className={`px-3 py-1 rounded-full text-sm font-medium border transition cursor-pointer ${
              selectedTags.includes(tag)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 dark:bg-zinc-700 text-gray-800 dark:text-white border-gray-300 dark:border-zinc-600"
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Price */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-700 dark:text-gray-300">S/ ≤</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-20 p-1 rounded border dark:border-zinc-700 dark:bg-zinc-700 dark:text-white"
          min={1}
          max={100}
        />
      </div>

      {/* Time */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-700 dark:text-gray-300">⏱️ ≤</label>
        <input
          type="number"
          value={maxTime}
          onChange={(e) => setMaxTime(Number(e.target.value))}
          className="w-20 p-1 rounded border dark:border-zinc-700 dark:bg-zinc-700 dark:text-white"
          min={5}
          max={120}
        />
        <span className="text-sm text-gray-500 dark:text-gray-300">min</span>
      </div>
    </div>
  );
}

export default RecipesFilterBar;
