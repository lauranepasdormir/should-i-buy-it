import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // ← 放在 .env 文件中
  dangerouslyAllowBrowser: true,
});


export async function generateFunnyReply(item: string): Promise<string> {
  const prompt = `你是一个毒舌但真实的消费顾问。用户会输入一个想买的物品，请你用幽默、讽刺、甚至毒舌的方式告诉他们是否值得买。
风格参考微博热评、豆瓣毒舌风格。回复尽量有趣并且一针见血，不要人格侮辱，不要太长，一句或者两句话就够了。

现在的物品是：「${item}」`;

  const res = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  return res.choices[0].message.content ?? "我现在太毒舌了，稍等一下 😈";
}
