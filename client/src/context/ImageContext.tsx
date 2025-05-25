import React, { createContext, useContext, useState } from "react";

export interface Prediction {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  class: string;
  class_id: number;
  detection_id: string;
}

// Complete prediction response interface
export interface PredictionResponse {
  inference_id: string;
  time: number;
  image: {
    width: number;
    height: number;
  };
  predictions: Prediction[];
}

interface ImageContextType {
  imageBase64: string;
  setImageBase64: React.Dispatch<React.SetStateAction<string>>;
  predictions: PredictionResponse[];
  setPredictions: React.Dispatch<React.SetStateAction<PredictionResponse[]>>;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [imageBase64, setImageBase64] = useState<string>("");
  const [predictions, setPredictions] = useState<PredictionResponse[]>([]);

  return (
    <ImageContext.Provider
      value={{ imageBase64, setImageBase64, predictions, setPredictions }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
};
