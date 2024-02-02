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
  const [lastHoveredBoxId, setLastHoveredBoxId] = useState(null);

  // Function to check whether mouse is in box area or not.
  const handleMouseMove = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / zoom; // Adjust mouse x coordinate based on zoom
    const y = (event.clientY - rect.top) / zoom; // Adjust mouse y coordinate based on zoom
    const hoveredBox = boxes.find(
      (box) => x >= box.x && x <= box.w && y >= box.y && y <= box.h
    );

    if (hoveredBox) {
      if (hoveredBox.id !== lastHoveredBoxId) {
        onItemHover(hoveredBox.id);
        setLastHoveredBoxId(hoveredBox.id); // Update the last hovered box ID
      }
    } else if (lastHoveredBoxId !== null) {
      onItemHoverLeave(); // Call onItemHoverLeave if the mouse moves out of any box
      setLastHoveredBoxId(null); // Reset the last hovered box ID
    }
  };

  useEffect(() => {
    const img = new Image();
    img.src = `../../${src}`;
    img.onload = () => {
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
          if (hoveredItemId === box.id) {
            ctx.strokeStyle = "yellow";
            ctx.fillStyle = "rgba(255, 255, 0, 0.5)";
          } else {
            ctx.strokeStyle = box.strokeColor;
            ctx.fillStyle = box.fillColor;
          }
          ctx.lineWidth = 2;
          const scaledX = box.x * zoom;
          const scaledY = box.y * zoom;
          const scaledW = (box.w - box.x) * zoom; // Calculate width
          const scaledH = (box.h - box.y) * zoom; // Calculate height

          ctx.beginPath();
          ctx.rect(scaledX, scaledY, scaledW, scaledH);
          ctx.fill();
          ctx.stroke();
        });
      }
    };

    canvasRef.current.addEventListener("mousemove", handleMouseMove);

    // Cleanup function to remove event listener
    return () => {
      canvasRef.current.removeEventListener("mousemove", handleMouseMove);
    };
  }, [
    src,
    zoom,
    boxes,
    imageLoaded,
    hoveredItemId,
    onItemHover,
    onItemHoverLeave,
  ]);

  return <canvas ref={canvasRef} />;
};

export default DocumentPage;
