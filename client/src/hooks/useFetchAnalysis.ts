import { useImageContext } from "@/context/ImageContext";
import type { AnalysisResponse } from "@/lib/types";
import axios from "axios";
import { useCallback, useState } from "react";

export function useFetchAnalysis() {
  const { imageBase64, annotations, setIsLoading, setAnalysis } =
    useImageContext();
  const [isError, setIsError] = useState(false);

  const fetchAnalysis = useCallback(
    async function () {
      setIsLoading(true);
      try {
        const { data }: { data: AnalysisResponse } = await axios.post(
          "/openai/analyze",
          {
            image_base64: imageBase64,
            image_width: annotations?.image.width,
            image_height: annotations?.image.height,
            prediction: annotations?.predictions,
          }
        );

        setAnalysis(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [imageBase64, annotations, setAnalysis, setIsLoading]
  );

  return {
    isError,
    fetchAnalysis,
  };
}
