import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const supportedFormats = "DCM, RVG";

interface Props {
  isUploading: boolean;
  onUpload: (formData: FormData) => void;
}

const Dropbox = ({ onUpload, isUploading }: Props) => {
  const [dragging, setDragging] = useState<boolean>(false);

  const handleUpload = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (!file) {
      toast("Something went wrong", {
        description: "No file selected",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    onUpload(formData);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    maxFiles: 1,
    noClick: true,
    accept: {
      "application/dicom": [".dcm"],
      "image/rvg": [".rvg"],
    },
    onDropAccepted: handleUpload,
    onDropRejected: () => {
      setDragging(false);
      toast("Something went wrong", {
        description: "Invalid File Format",
      });
    },
  });

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  return (
    <div
      className="w-full rounded-2xl bg-gray-200 p-3 shadow-md"
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
    >
      <div
        {...getRootProps({
          className: cn(
            "py-16 px-56 mb-3 border-2 border-blue-500 dark:border-gray-500 rounded-2xl bg-gray-100 flex justify-center items-center flex-col",
            dragging ? "bg-blue-100" : "border-dashed"
          ),
        })}
      >
        <input {...getInputProps()} />

        {isUploading ? (
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <Loader className="h-10 w-10 animate-spin text-blue-500" />
            <p className="tracking-normal">Uploading your image</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            {/* Uploader Image */}
            <img
              src="/svgs/upload.svg"
              alt="upload-icon"
              width={55}
              height={55}
            />

            {/* Description Text */}
            <p className="text-center">Drag your file here</p>

            {/* Separator Group */}
            <div className="flex w-full max-w-20 items-center justify-center gap-4">
              <Separator className="bg-gray-300 dark:bg-gray-500" />
              <p className="text-sm font-light text-gray-500">OR</p>
              <Separator className="bg-gray-300 dark:bg-gray-500" />
            </div>

            {/* CTA */}
            <Button
              onClick={open}
              className="bg-blue-600 text-white hover:bg-blue-800 transition-all delay-75"
            >
              Browse Files
            </Button>
          </div>
        )}
      </div>

      <p className="text-left text-xs tracking-normal text-gray-500">
        Supported formats: <span className="font-bold">{supportedFormats}</span>
      </p>
    </div>
  );
};

export default Dropbox;
