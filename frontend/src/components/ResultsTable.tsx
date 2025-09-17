interface Result {
  id: string;
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
  trend?: string;
}

interface ResultsProps {
  results?: Result[];
}

function HighVolumeBadge({volume}: {volume: number}) {
  if (volume >= 10000) return <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">High</span>;
  if (volume >= 1000) return <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">Medium</span>;
  return <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">Low</span>;
}

export default function ResultsTable({results}: ResultsProps) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-left">
          <th className="p-2">Keyword</th>
          <th className="p-2">Volume</th>
          <th className="p-2">Difficulty</th>
          <th className="p-2">CPC</th>
          <th className="p-2">Trend</th>
        </tr>
      </thead>
      <tbody>
        {results?.map(k => (
          <tr key={k.id} className="border-t">
            <td className="p-2">{k.keyword}</td>
            <td className="p-2 flex items-center gap-2">
              <HighVolumeBadge volume={k.volume} />
              <span>{k.volume.toLocaleString()}</span>
            </td>
            <td className="p-2">{k.difficulty}</td>
            <td className="p-2">${k.cpc}</td>
            <td className="p-2">{k.trend}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
