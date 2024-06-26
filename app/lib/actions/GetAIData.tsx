import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY || "AIzaSyCH_IIsrh9p2bt3kzhXlHUIj3VK46Vyc7I");

export async function run(question: String, role: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  let geminiPrompt = ""

  if (role === "Frontend dev") {
    geminiPrompt = `Act as a senior frontend developer proficient in all Frontend Libraries and Frameworks like
     ReactJS, NextJS, VueJS, NuxtJS, TailwindCSS, and VanillaCSS. \n Explain the given code in markdown format in a structured manner
    , separating the React code or any code by using triple backticks before and after the Frontend code. 
    \n ${question}`;
  } else if (role === "Teacher") {
    geminiPrompt = `${question}`
    
  } else if (role === "Doctor") {
    geminiPrompt = `${question}`
  } else {
    geminiPrompt =`${question}`
  }

  const result = await model.generateContent(geminiPrompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}