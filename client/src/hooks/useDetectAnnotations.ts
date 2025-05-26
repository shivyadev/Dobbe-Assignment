import { useImageContext } from "@/context/ImageContext";
import type { DetectResponse } from "@/lib/types";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export function useDetectAnnotations() {
  const { setImageBase64, setAnnotations } = useImageContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function detect(formData: FormData) {
    setIsLoading(true);
    try {
      // Upload to server and get base64 response
      const { data }: { data: DetectResponse } = await axios.post(
        "/roboflow/detect",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImageBase64(data.base64Image);
      setAnnotations(data.annotations);
    } catch {
      setIsError(true);
      toast("Something went wrong", {
        description: "Upload Failed",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    isError,
    detect,
  };
}
