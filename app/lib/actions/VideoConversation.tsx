'use server'

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyDBF8PcsICb6f80ZvOtlaTiysqOfrgmHBg");

export default async function GeminiAssitant({image}:any) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    
    const imageParts = [
      {
      inlineData: { 
                      data:`${image}`,
                      mimeType: 'image/jpeg'
                  }
  }
  ]
    console.log(imageParts)
    let prompt = `what is image about?`;

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text)
     return text; 
}


