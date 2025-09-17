import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ResultsTable from "./components/ResultsTable";
import { search } from "./api/api";

export default function App() {
  const [results, setResults] = useState({ hits: [], total: 0 });
  const [loading, setLoading] = useState(false);

  const handleSearch = async (q: string) => {
    setLoading(true);
    try {
      const res = await search(q);
      setResults(res);
    } catch (err) {
      console.error(err);
      alert("Search failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl mb-4">Keyword Search</h1>
      <SearchBar onSearch={handleSearch} />
      {loading ? <p>Loading...</p> : <ResultsTable results={results.hits} />}
      <p className="mt-4 text-sm text-gray-500">Total: {results.total}</p>
    </div>
  );
}
