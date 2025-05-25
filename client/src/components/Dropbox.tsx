import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useImageContext } from "@/context/ImageContext";

const supportedFormats = "DCM, RVG";

interface Props {
  setUploaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dropbox = ({ setUploaded }: Props) => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const { setImageBase64, setPredictions } = useImageContext();

  const handleUpload = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (!file) {
      toast("Something went wrong", {
        description: "No file selected",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      // Upload to server and get base64 response
      const response = await axios.post("/roboflow/detect", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Assuming your backend returns the base64 image in the response
      // Adjust the response.data path based on your actual API response structure
      const base64Image = response.data.base64Image;
      const predictions = response.data.predictions;

      if (base64Image && predictions) {
        setImageBase64(base64Image);
        setPredictions(predictions);
      }

      setUploaded(true);
      toast("Success", {
        description: "Image uploaded successfully",
      });
    } catch (err) {
      toast("Something went wrong", {
        description: "Upload Failed",
      });
      console.error(err);
    } finally {
      setUploading(false);
    }
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
            "py-24 px-56 mb-3 border-2 border-blue-500 dark:border-gray-500 rounded-2xl bg-gray-100 flex justify-center items-center flex-col",
            dragging ? "bg-blue-100" : "border-dashed"
          ),
        })}
      >
        <input {...getInputProps()} />

        {uploading ? (
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
