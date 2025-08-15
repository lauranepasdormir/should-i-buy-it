import { useState } from "react";
import { generateFunnyReply } from "../utils/generateAnswer";
import { motion, AnimatePresence } from "framer-motion";

export default function ShouldIBuyIt() {
  const [item, setItem] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const aiReply = await generateFunnyReply(item);
      setResult(`「${aiReply}」`);
    } catch (error) {
      setResult("一边翻白眼一边打翻了冰美式");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-rose-200 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 border-4 border-dashed border-pink-400"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-extrabold mb-4 text-center text-pink-700"
        >
          买？不买？
        </motion.h1>

        <motion.input
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          type="text"
          placeholder="你想买啥，说吧宝贝～"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="w-full border-2 border-pink-300 rounded-lg px-4 py-2 mb-4 text-pink-900 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          disabled={!item || loading}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
        >
          {loading ? "翻白眼中……" : "开呛！"}
        </motion.button>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
              className="mt-6 text-lg text-center font-semibold text-pink-800 whitespace-pre-wrap border-t pt-4 border-pink-300"
            >
              {result}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs text-center text-gray-500 mt-4"
        >
          * 所言仅代表态度，不代表理智
        </motion.p>
      </motion.div>
    </div>
  );
}
