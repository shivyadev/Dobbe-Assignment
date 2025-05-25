import { useImageContext } from "@/context/ImageContext";
import { getRandomTailwind500Color } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const BoundingBox = () => {
  const { imageBase64, annotations } = useImageContext();
  const [imgDims, setImgDims] = useState({ width: 0, height: 0 });
  const [classColors, setClassColors] = useState<Record<string, string> | null>(
    null
  );

  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = () => {
    if (imgRef.current) {
      const rect = imgRef?.current!.getBoundingClientRect();
      setImgDims({ width: rect.width, height: rect.height });

      const classMap = annotations?.predictions.reduce((acc, curr) => {
        acc[curr.class] = getRandomTailwind500Color();
        return acc;
      }, {} as Record<string, string>);

      if (classMap) {
        setClassColors(classMap);
      }
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
    <div className="bg-red-100 relative" ref={containerRef}>
      <img
        ref={imgRef}
        onLoad={handleImageLoad}
        src={`data:image/jpeg;base64,${imageBase64}`}
        alt="Uploaded medical image"
        className="object-contain w-full h-full rounded-lg"
        style={{
          maxWidth: "calc(35vw - 1rem)",
          maxHeight: "calc(100vh - 1rem)",
          minWidth: "400px",
          minHeight: "300px",
        }}
      />
      {imgDims.height > 0 &&
        imgDims.width > 0 &&
        annotations?.predictions.map((pred) => {
          const scaleX = imgDims.width / annotations!.image.width;
          const scaleY = imgDims.height / annotations!.image.height;

          // Convert center coordinates to top-left coordinates
          const left = (pred.x - pred.width / 2) * scaleX;
          const top = (pred.y - pred.height / 2) * scaleY;
          const width = pred.width * scaleX;
          const height = pred.height * scaleY;

          return (
            <div
              key={pred.detection_id}
              style={{
                position: "absolute",
                left: `${left}px`,
                top: `${top}px`,
                width: `${width}px`,
                height: `${height}px`,
                border: `2px solid ${classColors![pred.class]}`,
                pointerEvents: "none",
              }}
            >
              <span
                className="absolute -top-6 left-0 text-white text-xs p-1 rounded whitespace-nowrap"
                style={{
                  pointerEvents: "auto",
                  background: classColors![pred.class],
                }}
              >
                {pred.class} ({(pred.confidence * 100).toFixed(0)}%)
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default BoundingBox;
