// components/BoundingBoxOverlay.tsx
import { useImageContext } from "../context/ImageContext";
import { useState, useEffect, useRef } from "react";

const BoundingBoxOverlay = () => {
  const { imageBase64, predictions } = useImageContext();
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const [imgDims, setImgDims] = useState({ width: 0, height: 0 });

  const handleImageLoad = () => {
    if (imgRef.current) {
      const rect = imgRef?.current!.getBoundingClientRect();
      setImgDims({ width: rect.width, height: rect.height });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (imgRef.current) {
        const rect = imgRef?.current!.getBoundingClientRect();
        setImgDims({ width: rect.width, height: rect.height });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center col-span-1 p-4">
      <div className="relative w-fit max-w-full max-h-full" ref={containerRef}>
        <img
          src={`data:image/jpeg;base64,${imageBase64}`}
          alt="Uploaded medical image"
          ref={imgRef}
          onLoad={handleImageLoad}
          className="object-contain w-full h-full rounded-lg"
          style={{
            maxWidth: "calc(35vw - 1rem)",
            maxHeight: "calc(100vh - 1rem)",
            minWidth: "400px",
            minHeight: "300px",
          }}
        />

        {/* Bounding boxes */}
        {imgDims.width > 0 &&
          imgDims.height > 0 &&
          predictions.predictions?.map((pred, i) => {
            // Calculate scale factors based on original image dimensions
            const scaleX = imgDims.width / predictions!.image.width;
            const scaleY = imgDims.height / predictions!.image.height;

            // Convert center coordinates to top-left coordinates
            const left = (pred.x - pred.width / 2) * scaleX;
            const top = (pred.y - pred.height / 2) * scaleY;
            const width = pred.width * scaleX;
            const height = pred.height * scaleY;

            const style = {
              position: "absolute",
              left: `${left}px`,
              top: `${top}px`,
              width: `${width}px`,
              height: `${height}px`,
              border: "2px solid red",
              pointerEvents: "none",
            };

            return (
              <div key={pred.detection_id || i} style={style}>
                <span
                  className="absolute -top-6 left-0 bg-red-600 text-white text-xs p-1 rounded whitespace-nowrap"
                  style={{ pointerEvents: "auto" }}
                >
                  {pred.class} ({(pred.confidence * 100).toFixed(0)}%)
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BoundingBoxOverlay;
