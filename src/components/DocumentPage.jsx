/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

const DocumentPage = ({
  src,
  zoom,
  boxes,
  hoveredItemId,
  onItemHover,
  onItemHoverLeave,
}) => {
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
        boxes.forEach((box) => {
          // Check if the current box is the one being hovered
          if (hoveredItemId === box.id) {
            ctx.strokeStyle = "yellow"; // Highlight border color
            ctx.fillStyle = "rgba(255, 255, 0, 0.5)"; // Transparent yellow fill
          } else {
            ctx.strokeStyle = box.strokeColor;
            ctx.fillStyle = box.fillColor;
          }
          ctx.lineWidth = 2;
          canvasRef.current.addEventListener(
            "mouseenter",
            () => onItemHover(box.id),
            false
          );
          canvasRef.current.addEventListener(
            "mouseleave",
            onItemHoverLeave,
            false
          );
          const scaledX = box.x * zoom;
          const scaledY = box.y * zoom;
          const scaledW = (box.w - box.x) * zoom; // Width calculation
          const scaledH = (box.h - box.y) * zoom; // Height calculation

          ctx.beginPath();
          ctx.rect(scaledX, scaledY, scaledW, scaledH);
          ctx.fill();
          ctx.stroke();
        });
      }
    };
  }, [src, zoom, boxes, imageLoaded, hoveredItemId]); // Depend on imageLoaded to re-trigger effect

  return <canvas ref={canvasRef} />;
};

export default DocumentPage;
