import React from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";

export default function App() {
  return (
    <div className="bg-green-700 min-h-screen font-sans"> {/* Changed to a solid color */}
      <div className="h-screen flex flex-row space-x-4 px-4 py-6">
        <div className="flex-1 flex h-full overflow-hidden bg-white shadow-lg rounded-2xl border border-gray-200">
          <Sidebar />
          <MidArea />
        </div>
        <div className="w-1/3 flex h-full overflow-hidden bg-white shadow-lg rounded-2xl border border-gray-200">
          <PreviewArea />
        </div>
      </div>
    </div>
  );
}
