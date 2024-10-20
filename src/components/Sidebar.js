import React from "react";
import sidebarBlocks, { controlColor, motionColor } from "../constants/sidebarBlocks";

export default function Sidebar() {
  const handleDragStart = (e, actionType, payload, text) => {
    e.dataTransfer.setData("actionType", actionType);
    e.dataTransfer.setData("text", text);
    e.dataTransfer.setData("payload", JSON.stringify(payload));
  };

  return (
    <div className="w-64 flex-none h-full overflow-y-auto flex flex-col items-start p-4 border-r border-gray-300 bg-gray-50 shadow-lg">
      {Object.keys(sidebarBlocks).map((key) => (
        <div key={key} className="mb-4 w-full">
          <div className="font-semibold text-lg text-gray-800 mb-2">{key}</div>
          <div>
            {sidebarBlocks[key].map((block, index) => {
              let bgColor = "";
              let textColor = "";
              let hoverBgColor = ""; // New variable for hover background color
              let hoverTextColor = ""; // New variable for hover text color

              switch (key) {
                case "Motion":
                  bgColor = motionColor.bgColor;
                  textColor = motionColor.textColor;
                  hoverBgColor = "bg-opacity-70 hover:bg-opacity-90"; // Example hover background opacity
                  hoverTextColor = "text-white"; // Example hover text color
                  break;
                case "Control":
                  bgColor = controlColor.bgColor;
                  textColor = controlColor.textColor;
                  hoverBgColor = "bg-opacity-70 hover:bg-opacity-90"; // Example hover background opacity
                  hoverTextColor = "text-white"; // Example hover text color
                  break;
                default:
                  break;
              }

              return (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, block.type, block.defaultPayload, block.text)}
                  className={`flex flex-row items-center ${bgColor} ${textColor} px-3 py-2 my-1 text-sm cursor-pointer rounded-md transition duration-300 ease-in-out hover:shadow-md ${hoverBgColor} ${hoverTextColor}`}
                >
                  {block.text}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
