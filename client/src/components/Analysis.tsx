import { useImageContext } from "@/context/ImageContext";
import { Info } from "lucide-react";
import DisplayReport from "./DisplayReport";

const Analysis = () => {
  const { analysis, isLoading } = useImageContext();

  return (
    <div className="p-4 lg:p-10 h-full">
      <div className="lg:p-10 h-full">
        <div className="h-full flex justify-center items-center">
          {analysis == null && !isLoading ? (
            <div className="flex flex-col justify-center items-center gap-5">
              <Info size={40} className="text-blue-800" />
              <p className="text-3xl tracking-tight text-center font">
                Upload your .dcm or .rvg images <br /> and get the analysis
              </p>
            </div>
          ) : (
            <div className="w-full h-full">
              <DisplayReport />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
