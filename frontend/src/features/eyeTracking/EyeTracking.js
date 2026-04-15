import { useEffect, useRef } from 'react';

const EyeTracking = ({ onGaze }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Webcam error:", err);
      });

    window.webgazer
      .setGazeListener((data) => {
        if (data && onGaze) {
          onGaze(data.x, data.y);
        }
      })
      .begin();

    window.webgazer.showPredictionPoints(true);

    return () => {
      window.webgazer.end();
    };
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        style={{
          width: '200px',
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          borderRadius: '10px',
          border: '2px solid #00ff88'
        }}
      />
    </div>
  );
};

export default EyeTracking;