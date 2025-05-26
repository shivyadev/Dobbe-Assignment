export interface Prediction {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  pathology: string;
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

export interface DetectResponse {
  base64Image: string;
  annotations: PredictionResponse;
}

export interface ImageContextType {
  imageBase64: string;
  setImageBase64: React.Dispatch<React.SetStateAction<string>>;
  annotations: PredictionResponse | null;
  setAnnotations: React.Dispatch<
    React.SetStateAction<PredictionResponse | null>
  >;
  analysis: AnalysisResponse | null;
  setAnalysis: React.Dispatch<React.SetStateAction<AnalysisResponse | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Pathology {
  pathology: string;
  location: string;
}

export interface AnalysisResponse {
  pathologies: Pathology[];
  clinical_advice: string[];
}
