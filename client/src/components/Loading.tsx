import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-full bg-gray-50 p-6">
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Pathology Section */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Detected Pathology
            </h2>
            <div className="bg-red-50 px-4 py-3 rounded border-l-4 border-red-400">
              <Skeleton className="h-5 w-3/4" />
            </div>
          </div>

          {/* Location Section */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Affected Region
            </h2>
            <div className="bg-blue-50 px-4 py-3 rounded border-l-4 border-blue-400">
              <Skeleton className="h-5 w-2/3" />
            </div>
          </div>

          {/* Clinical Advice Section */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Clinical Recommendations
            </h2>
            <div className="space-y-3">
              {/* Multiple advice items skeleton */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start space-x-3">
                  <Skeleton className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-full" />
                    {item === 1 && <Skeleton className="h-4 w-4/5" />}
                    {item === 2 && <Skeleton className="h-4 w-3/4" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>
            This report is generated for informational purposes. Please consult
            with a qualified dental professional for proper diagnosis and
            treatment.
          </p>
        </div>
      </div>
    </div>
  );
}
