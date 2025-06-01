"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.DEEPSEEK_API_KEY) {
    console.error("Error: DEEPSEEK_API_KEY is not set in environment variables.");
    console.error("Please create a .env file in the backend directory with:");
    console.error("DEEPSEEK_API_KEY=your_api_key_here");
    process.exit(1);
}
const openai = new openai_1.default({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.DEEPSEEK_API_KEY,
    defaultHeaders: {
        "HTTP-Referer": "<YOUR_SITE_URL>",
        "X-Title": "<YOUR_SITE_NAME>",
    },
});
async function main() {
    const completion = await openai.chat.completions.create({
        model: "deepseek/deepseek-r1-0528:free",
        messages: [
            {
                role: "user",
                content: "What is the meaning of life?",
            },
        ],
    });
    console.log(completion.choices[0].message);
}
main();
