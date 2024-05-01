'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';
import '../video/Videoplayer.css'

const CaptureVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedFrame, setCapturedFrame] = useState("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [response, setResponse] = useState("");
  const [isAiTaking, setAiTaking] = useState(true);
  const [isFrontCamera, setIsFrontCamera] = useState<boolean>(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRecording) {
      intervalId = setInterval(captureFrame, 6000);
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
   if(isAiTaking){
    if (capturedFrame !== "") {
      setAiTaking(false)
      const image = capturedFrame.split(",")[1];
      const handleResponse = async () => {
        const res = await axios.post('/api/image', { image: image });
        console.log(res.data);
        setAiTaking(true)
      };
      handleResponse();
    }
   }
  }, [capturedFrame ,isAiTaking]);

  const toggleCamera = () => {
    setIsFrontCamera(prevState => !prevState);
  };

  return (
    <div className="capture-video-container">
      <div className="video-wrapper">
        <video ref={videoRef} autoPlay muted playsInline />
        <canvas ref={canvasRef} className="hidden" />
      </div>
      <div className="controls">
        {!isRecording ? (
          <button onClick={startRecording} className="record-button">
            Start Recording
          </button>
        ) : (
          <button onClick={stopRecording} className="record-button">
            Stop Recording
          </button>
        )}
        <button onClick={toggleCamera} className="toggle-camera-button">
          Switch Camera
        </button>
      </div>
      {capturedFrame && (
        <div className="captured-photo">
          <Image width={330} height={330} src={capturedFrame} alt="Captured frame" />
        </div>
      )}
    </div>
  );
};

export default CaptureVideo;
