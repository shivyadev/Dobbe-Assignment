import Analysis from "./Analysis";
import Visualizer from "./Visualizer";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-[1fr_1px_1fr] w-screen h-screen bg-amber-200">
      <div className="bg-white">
        <Visualizer />
      </div>

      {/* Vertical Separator */}
      <div className="bg-gray-400 w-px h-full" />

      <div className="bg-white">
        <Analysis />
      </div>
    </div>
  );
};

export default Dashboard;
