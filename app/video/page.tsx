'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const CaptureVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedFrame, setCapturedFrame] = useState("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [text, setText] = useState('');
  const [isFrontCamera, setIsFrontCamera] = useState<boolean>(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRecording) {
        intervalId = setInterval(captureFrame, 7000);
    }
    return () => clearInterval(intervalId);
  }, [isRecording]);

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
  const stopRecording = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    const tracks = stream?.getTracks();
    tracks?.forEach(track => track.stop());
    setIsRecording(false);
    setText("");
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
        const handleResponse = async () => {
          const res = await axios.post('/api/image', { image: image });
          const result = res.data.message
          setText(result)
        };
        handleResponse();
      }
  }, [capturedFrame]);

  useEffect(()=>{
    const handleSpeech = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
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
      <ToastContainer/>
    </div>
  );
};

export default CaptureVideo;
