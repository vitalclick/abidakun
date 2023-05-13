import React, { useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';

const OGImage = () => {
  const captureRef = useRef(null);

  useEffect(() => {
    const captureImage = async () => {
      try {
        const canvas = await html2canvas(captureRef.current);
        const dataURL = canvas.toDataURL('image/png');
        // Here, you can save or use the generated `dataURL` as needed
        console.log(dataURL);
      } catch (error) {
        console.error('Error capturing OG image:', error);
      }
    };

    captureImage();
  }, []);

  return (
    <div ref={captureRef}>
      {/* Your OG image content goes here */}
      <h1>Welcome to my Next.js App</h1>
      <p>This is an example OG image content</p>
    </div>
  );
};

export default OGImage;