'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';


const CaptureVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedFrame, setCapturedFrame] = useState("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [text, setText] = useState('');
  const [speak, setSpeak] = useState(false);
  const [isAiTaking, setAiTaking] = useState(true);
  const [isFrontCamera, setIsFrontCamera] = useState<boolean>(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRecording) {
      if(isAiTaking){
        intervalId = setInterval(captureFrame, 7000);
      }
    }
    return () => clearInterval(intervalId);
  }, [isRecording,isAiTaking]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: isFrontCamera ? "user" : "environment" },
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleStop = () => {
   
    setSpeak(false);
  };
  

  const stopRecording = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    const tracks = stream?.getTracks();
    tracks?.forEach(track => track.stop());
    speechSynthesis.cancel();
    setIsRecording(false);
  };

  const captureFrame = async () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageDataURL = canvas.toDataURL('image/jpeg');
      setCapturedFrame(imageDataURL);
    }
  };


useEffect(() => {
      if (capturedFrame !== "") {
        const image = capturedFrame.split(",")[1];
        setAiTaking(false)
        const handleResponse = async () => {
          const res = await axios.post('/api/image', { image: image });
          const result = res.data.message
          setText(result)
        };
        handleResponse();
      }
  }, [capturedFrame, isAiTaking]);

  useEffect(()=>{
    const handleSpeech = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
      setAiTaking(true)
    };
    handleSpeech();
  },[text])

  const toggleCamera = () => {
    setIsFrontCamera(prevState => !prevState);
    stopRecording();
    startRecording();
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 m-4">
      <div className="relative">
        <video ref={videoRef} autoPlay muted playsInline className="w-full" />
        <canvas ref={canvasRef} className="hidden" />
      </div>
      <div className="space-x-4">
        {!isRecording ? (
          <button onClick={startRecording} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Start Recording
          </button>
        ) : (
          <button onClick={stopRecording} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Stop Recording
          </button>
        )}
        <button onClick={toggleCamera} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Switch Camera
        </button>
      </div>
      {capturedFrame && (
        <div className="relative w-72 h-72">
          <Image layout="fill" objectFit="cover" src={capturedFrame} alt="Captured frame" />
        </div>
      )}
    </div>
  );
};

export default CaptureVideo;
