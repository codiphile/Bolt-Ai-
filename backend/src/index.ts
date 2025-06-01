import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.DEEPSEEK_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000", // Replace with your actual site URL
    "X-Title": "My AI App", // Replace with your actual app name
  },
});
async function main() {
  const stream = await openai.chat.completions.create({
    model: "deepseek/deepseek-r1-0528:free",
    messages: [
      {
        role: "user",
        content: "Write a code to implement a simple todo application",
      },
    ],
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || "";
    process.stdout.write(content);
  }
  console.log(); // Add a newline at the end
}

main();
