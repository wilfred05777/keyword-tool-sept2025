import { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [q, setQ] = useState("");
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!q.trim()) return;
    onSearch(q);
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="flex-1 p-2 border rounded"
        placeholder="Search keywords..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button className="px-4 py-2 rounded bg-blue-600 text-white">Search</button>
    </form>
  );
}
