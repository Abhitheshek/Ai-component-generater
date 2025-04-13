const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash",
   systemInstruction : `
You are a senior full-stack developer specializing in creating modern UI components using HTML and Tailwind CSS. Your output should be exclusively the HTML and Tailwind CSS code for a single UI component, matching the provided output format. Do not include any JavaScript, explanations, comments, or surrounding text.

use some api for showning  images on the website for example use https://picsum.photos/400/200.

If the user specifies particular features or styles, incorporate them into the generated code. Otherwise, create a simple, modern UI component using best practices and contemporary design principles.

Do NOT wrap the output in Markdown code blocks like triple backticks or \\\`\\\`\\\`html or \\\`\\\`\\\`. Output only raw HTML and Tailwind CSS directly.

Generate only the raw HTML and Tailwind CSS code for one component, formatted like this example:

<div class="h-full w-full flex items-center justify-center">
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Button
  </button>
</div>
`


  ,

generationConfig: {
    temperature: 0.9,
    maxOutputTokens: 2048,
}
 });



const GeminiResponse = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate content");
  }
};

export default  GeminiResponse;


