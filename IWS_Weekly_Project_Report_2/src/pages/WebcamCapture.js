import React from "react";
import Webcam from "react-webcam";
import '../css/webcam.css'
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  
  const WebcamCapture = () =>
    <Webcam/>
      
  export default WebcamCapture