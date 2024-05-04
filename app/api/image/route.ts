import { NextRequest, NextResponse } from 'next/server';
const { GoogleGenerativeAI } = require("@google/generative-ai");

  let request = 0

export async function POST(req: NextRequest) {
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY || "");
     request++
     console.log(request)
    const { image } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    console.log(request)
    
    const imageParts = [
        {
        inlineData: { 
                        data:`${image}`,
                        mimeType: 'image/jpeg'
                    }
    }
    ]
    let prompt = `Describe the image waht you see in maximum 40 word
                  start with Iam looking if humans are appered decribe about them in a 
                  beautiful way and what they are doing \n
                  
                  if not human read the image carefully if questions are in it reply them?
                  `;

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = await response.text();
    console.log(text)
    return NextResponse.json({message: text});
}
