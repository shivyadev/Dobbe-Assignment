import type {
  AnalysisResponse,
  ImageContextType,
  PredictionResponse,
} from "@/lib/types";
import React, { createContext, useContext, useState } from "react";

const ImageContext = createContext<ImageContextType | null>(null);

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [imageBase64, setImageBase64] = useState<string>("");
  const [annotations, setAnnotations] = useState<PredictionResponse | null>(
    null
  );
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <ImageContext.Provider
      value={{
        imageBase64,
        setImageBase64,
        annotations,
        setAnnotations,
        analysis,
        setAnalysis,
        isLoading,
        setIsLoading,
      }}
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
