import { NextRequest, NextResponse } from 'next/server';
const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function POST(req: NextRequest) {
    const genAI = new GoogleGenerativeAI("AIzaSyDBF8PcsICb6f80ZvOtlaTiysqOfrgmHBg");
    const { image } = await req.json();
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
    const text = await response.text();
    console.log(text)
    return NextResponse.json({ request: "HI" , message: text});
}
