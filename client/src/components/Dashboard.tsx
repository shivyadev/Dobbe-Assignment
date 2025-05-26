import Analysis from "./Analysis";
import Visualizer from "./Visualizer";

const Dashboard = () => {
  return (
    <div className="w-screen h-screen bg-amber-200 grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr]">
      <div className="bg-white">
        <Visualizer />
      </div>

      {/* Vertical Separator (only shown on large screens) */}
      <div className="hidden lg:block bg-gray-400 w-px h-full" />

      <div className="bg-white">
        <Analysis />
      </div>
    </div>
  );
};

export default Dashboard;
