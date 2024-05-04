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
    const timestamp = Date.now();
    const currentDate = new Date(timestamp);
    
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    
    console.log(`Current time: ${hours}:${minutes}:${seconds}`);
    
    
    const imageParts = [
        {
        inlineData: { 
                        data:`${image}`,
                        mimeType: 'image/jpeg'
                    }
    }
    ]
    let prompt = `Describe the image what you see in maximum 3 seconds not more then that \n
                  if not human read the image carefully reply them?

                  `;

    const result = await model.generateContent([prompt, ...imageParts]);
    let inside =  0
    const response = await result.response;
    const text = await response.text();
    inside++
    console.log(text , inside)
    return NextResponse.json({message: text});

}
