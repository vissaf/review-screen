/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

const DocumentPage = ({ src, zoom, boxes }) => {
  const canvasRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = `../../${src}`;
    img.onload = () => {
      console.log("here", img);
      setImageLoaded(true); // Image is loaded, trigger re-render
      const ctx = canvasRef.current.getContext("2d");
      const scaledWidth = img.width * zoom;
      const scaledHeight = img.height * zoom;
      canvasRef.current.width = scaledWidth;
      canvasRef.current.height = scaledHeight;
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        scaledWidth,
        scaledHeight
      );

      if (boxes && boxes.length > 0) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        boxes.forEach((box) => {
          const scaledX = box.x * zoom;
          const scaledY = box.y * zoom;
          const scaledW = box.w * zoom;
          const scaledH = box.h * zoom;
          ctx.strokeRect(scaledX, scaledY, scaledW, scaledH);
        });
      }
    };
  }, [src, zoom, boxes, imageLoaded]); // Depend on imageLoaded to re-trigger effect

  return <canvas ref={canvasRef} />;
};

export default DocumentPage;
