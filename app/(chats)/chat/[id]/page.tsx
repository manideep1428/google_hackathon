"use client"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { SendIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast, ToastContainer } from "react-toastify"
import ResponsePage from "@/app/components/ResponsePage"
import ImagePreview from "@/app/components/ImagePreview"
import FileInput from "@/app/components/ui/ImageInput"
import { GeminiImage } from "@/app/lib/actions/GetImageAiResponse"
import { run } from "@/app/lib/actions/GetAIData"
import { useRouter } from "next/navigation"

export default function Component() {
  const [response , setResponse] = useState<String>("");
  const [image ,setImage]  =useState<any>('');
  const [selectedImage, setSelectedImage] = useState('');
  const [role, setRole] = useState<string>('');
  const [loading ,setLoading] = useState<Boolean>(false);
  const [question, setQuestion] = useState<String>('');
  const router  = useRouter()
  const removeImage = () => {
    setSelectedImage('');
    setImage('');
  };

  const handleResponse = async () => {
    setLoading(true);
    console.log(`Send to Server : ${question}`);
    console.log(`Image for this: ${image}`);
    console.log(`Role for this: ${role}`);

    try {
      if (question === '' || question.trim() === '') {
        throw new Error('Input should not be empty');
      }
      if (selectedImage !== '') {
        const res = await GeminiImage(question, image, role);
        setResponse(res);
        setLoading(false);
      }
      const res = await run(question, role);
      setResponse(res);
      setLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
      setLoading(false);
    }
  };


  const handleImageChange = async (event: any) => {
    const { id } = event.target;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      //@ts-ignore
      setSelectedImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    const fileInputEl: any = document.querySelector(`#${id}`);
    //@ts-ignore
    const imageParts = await Promise.all([...fileInputEl.files].map(fileToGenerativePart));
    setImage(imageParts);
  };

  async function fileToGenerativePart(file: any) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      //@ts-ignore
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }


  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 onClick={()=>router.push('/')} className="cursor-pointer text-2xl font-bold">Gemini</h1>
        <Button variant="ghost">Exit Chat</Button>
      </header>
      <main className="flex-grow overflow-auto p-4">
        <Card className="bg-gray-800 border-gray-700 mb-4">
          <CardContent className="p-4">
        { response ? <ResponsePage response="nsdjnsdfknsfkjdnk" />
            : <p className="text-gray-400">Sorry For Inconvience Gemini API Removed The Free Trails. 
              Developer Soon Fix This</p>}
          </CardContent>
        </Card>
        {selectedImage ? (
        <div className="absolute left-8 bottom-28">
          <ImagePreview imageSrc={selectedImage} onclick={removeImage}/>
        </div>
        ) : "" }
      </main>
      <footer className="bg-gray-800 p-4 space-y-4">
        <div className="flex justify-between items-center">
          <Select>
            <SelectTrigger className="w-[200px] bg-gray-700 border-gray-600">
              <SelectValue placeholder="Select AI Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem onClick={()=>setRole('general')} value="general">General Assistant</SelectItem>
              <SelectItem onClick={()=>setRole('coder')} value="coder">Code Expert</SelectItem>
              <SelectItem onClick={()=>setRole('contentWriter')} value="creative">Creative Writer</SelectItem>
              <SelectItem onClick={()=>setRole('bug hunter in coding')} value="bug hunter">Bug Hunter </SelectItem>
              <SelectItem onClick={()=>setRole('Teacher')} value="teacher">Teacher</SelectItem>
            </SelectContent>
          </Select>
          <FileInput onchange={(e)=>handleImageChange(e)} />
        </div>
        <div className="flex space-x-2">
          <Input
            onChange={(event)=>setQuestion(event.target.value)}
            className="flex-grow bg-gray-700 border-gray-600 text-white" 
            placeholder="Type your message..." 
          />
         {loading ?
         ( <Button disabled size="icon" onClick={handleResponse}>
            <SendIcon className="h-4 w-4" />
           </Button> 
          ) : (
            <Button size="icon" onClick={handleResponse}>
              <SendIcon className="h-4 w-4" />
            </Button>
          ) }
        </div>
      </footer>
    </div>
  )
}