import { Toaster } from "sonner";
import "sonner/dist/styles.css";
import Dashboard from "./components/Dashboard";
import { ImageProvider } from "./context/ImageContext";

function App() {
  return (
    <>
      <ImageProvider>
        <Dashboard />
      </ImageProvider>
      <Toaster />
    </>
  );
}

export default App;
