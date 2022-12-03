import React, { useState } from "react";
import Webcam from "react-webcam";

import Button from "../Button/Button"

const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
};

const WebcamCapture = ({ onClick, setImage, image, width, height }) => {
    const [hasPermissions, setHasPermissions] = useState(false);
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef?.current?.getScreenshot();
        console.log(imageSrc)
        setImage(imageSrc)
    }, [setImage]);

    return (
        <>
            {image === '' ? <Webcam
                className="my-2"
                audio={true}
                height={height}
                width={width}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                style={{ objectFit: "cover" }}
                onUserMediaError={e => alert(e)}
                onUserMedia={() => setHasPermissions(true)}
            /> : <img src={image} height="200" className="my-2" alt="Captured" />}
            {
                hasPermissions ? (image !== '' ?
                    <><Button onClick={(e) => { setImage('') }}>Retake</Button><Button onClick={onClick} variant="success">Done</Button></> :
                    <Button onClick={(e) => { capture() }}>Capture</Button>
                ) : ''
            }
        </>
    )
}

export default WebcamCapture