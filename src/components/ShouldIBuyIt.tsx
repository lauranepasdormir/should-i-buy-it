import { useState } from "react";
import { generateFunnyReply } from "../utils/generateAnswer";

export default function ShouldIBuyIt() {
  const [item, setItem] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const aiReply = await generateFunnyReply(item);
      setResult(`${aiReply}`);
    } catch (error) {
      setResult("出错了，请稍后再试 🙈");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">我该买吗？🛒</h1>
        <input
          type="text"
          placeholder="想买的东西..."
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />
        <button
          onClick={handleClick}
          disabled={!item || loading}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? "生成中..." : "帮我决定！"}
        </button>
        {result && (
          <div className="mt-6 text-lg text-center font-medium text-gray-800 whitespace-pre-wrap">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
