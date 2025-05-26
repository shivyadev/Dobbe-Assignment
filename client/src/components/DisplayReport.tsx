import { useImageContext } from "@/context/ImageContext";
import { firstWordUpper } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

export default function DisplayReport() {
  const { analysis, isLoading } = useImageContext();

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dental Analysis Report
          </h1>
          <p className="text-gray-600 mt-2">
            Comprehensive diagnostic assessment
          </p>
        </div>

        {/* Report Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-16">
          {/* Pathologies Section */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Detected Pathologies
            </h2>
            <div className="space-y-4">
              {!isLoading ? (
                analysis?.pathologies?.map((pathologyItem, index) => (
                  <div
                    key={index}
                    className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">
                          Pathology
                        </h3>
                        <p className="text-gray-800">
                          {firstWordUpper(pathologyItem.pathology)}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">
                          Location
                        </h3>
                        <p className="text-gray-800">
                          {firstWordUpper(pathologyItem.location)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="space-y-3">
                  <Skeleton className="h-9 w-full bg-gray-100" />
                  <Skeleton className="h-9 w-full bg-gray-100" />
                </div>
              )}
            </div>
          </div>

          {/* Clinical Advice Section */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Clinical Recommendations
            </h2>
            <div className="space-y-3">
              {!isLoading ? (
                analysis?.clinical_advice?.map((advice, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{advice}</p>
                  </div>
                ))
              ) : (
                <div className="space-y-3">
                  <Skeleton className="h-9 w-full bg-gray-100" />
                  <Skeleton className="h-9 w-full bg-gray-100" />
                  <Skeleton className="h-9 w-full bg-gray-100" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
