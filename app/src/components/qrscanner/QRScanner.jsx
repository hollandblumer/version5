import React, { useState, useRef, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import "../../styles/qrscanner/qrscanner.css"; // Add appropriate CSS

function QRScanner({ onClose, onScan }) {
  const [scannedImage, setScannedImage] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [mediaStream, setMediaStream] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setScannedImage(data);

      if (data.startsWith("joindivot.com")) {
        onScan(data); // Call your scan callback function
      } else {
        // Handle URLs without 'joindivot.com' here
        alert("QR code is not related to joindivot.com");
      }
    }
  };

  const handleCloseScanner = () => {
    setIsCameraOn(false);
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
      setMediaStream(null);
    }
    onClose();
    window.location.reload(); // Refresh the page to turn off the camera
  };

  useEffect(() => {
    if (isCameraOn) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          setMediaStream(stream);
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
          setIsCameraOn(false);
        });
    }
  }, [isCameraOn]);

  return (
    <div className="qr-scanner-container">
      <div className="qr-camera-feed">
        {isCameraOn && (
          <>
            <div className="qr-overlay">Position QR Code Here</div>
            <QrReader
              delay={300}
              onError={(err) => console.error(err)}
              onScan={handleScan}
              style={{ width: "100%" }}
            />
          </>
        )}
      </div>
      <div className="scanned-image">
        {scannedImage && <img src={scannedImage} alt="Scanned QR Code" />}
      </div>
      <button className="close-qr-scanner" onClick={handleCloseScanner}>
        X
      </button>
    </div>
  );
}

export default QRScanner;
