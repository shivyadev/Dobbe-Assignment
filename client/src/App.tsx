import { Toaster } from "sonner";
import { useState } from "react";
import "sonner/dist/styles.css";
import Dropbox from "./components/Dropbox";
import BoundingBoxOverlay from "./components/BoundingBoxOverlay";

function App() {
  const [uploaded, setUploaded] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 w-screen h-screen">
        {!uploaded && (
          <div className="flex flex-col justify-center items-center col-span-1 px-28 py-36">
            <div className="w-full">
              <h1 className="mb-10 text-center font-stretch-50% text-2xl">
                Upload Image
              </h1>
              <Dropbox setUploaded={setUploaded} />
            </div>
          </div>
        )}

        {uploaded && <BoundingBoxOverlay />}
      </div>

      <Toaster />
    </>
  );
}

export default App;
