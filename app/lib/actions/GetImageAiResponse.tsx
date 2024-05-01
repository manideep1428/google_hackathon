'use server'

const { GoogleGenerativeAI } = require("@google/generative-ai");


interface InputProps{
  question :string,
  image : string,
  imageType:string
}

const genAI = new GoogleGenerativeAI("AIzaSyDBF8PcsICb6f80ZvOtlaTiysqOfrgmHBg");

export async function GeminiImage(question:String, image:any, role:string) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    let prompt = `${question}`;
     
    console.log(image)
    if(role === "Frontend Dev"){
      let prompt = `Act as Senior FullStack Engg proficiency in Most Popular Libraries 
                    like ReactJs ,AngularJs ,VeuJs , Typescript , Tailwind ,Css ,..etc \n 

                    Decribe the minimum 300 words \n
                    
                    Observe the given Image carefully if the prompt given is realted to image
                    answer according to it \n.
                    
                    ${question}              `
    }
    else if(role === "Doctor"){
       let prompt = `Act as Senior Doctor 
                     your role is describe the issue given in the image or prompt 
                     answer according to and  advice them go to near hospital.
                     Decribe the minimum 300 words \n
                     ${question}
                     `  
    }
    else if(role === "Teacher"){
      let prompt = `Act as Teacher 
                    your role is describe the issue given in the image or prompt as 5th Standard
                    can understand with very simple english  \n

                    Decribe the minimum 300 words\n

                    ${question}
                    `  
   }

    const result = await model.generateContent([prompt, ...image]);
    const response = await result.response;
    const text = response.text();
     return text; 
}


