import { useDetectAnnotations } from "@/hooks/useDetectAnnotations";
import { useFetchAnalysis } from "@/hooks/useFetchAnalysis";
import { useEffect, useState } from "react";
import BoundingBox from "./BoundingBox";
import Dropbox from "./Dropbox";

const Visualizer = () => {
  const [isUploaded, setIsUploaded] = useState(false);
  const { detect, isLoading } = useDetectAnnotations();
  const { fetchAnalysis } = useFetchAnalysis();

  useEffect(() => {
    if (!isUploaded) return;
    fetchAnalysis();
  }, [isUploaded, fetchAnalysis]);

  async function handleUpload(formData: FormData) {
    await detect(formData);
    setIsUploaded(true);
  }

  return (
    <div className="p-10 h-full">
      <h1 className="text-4xl tracking-tight font-semibold">Dobbe.ai</h1>
      <div className="flex justify-center items-center h-full">
        {!isUploaded ? (
          <div className="max-w-2xl">
            <Dropbox isUploading={isLoading} onUpload={handleUpload} />
          </div>
        ) : (
          <BoundingBox />
        )}
      </div>
    </div>
  );
};

export default Visualizer;
