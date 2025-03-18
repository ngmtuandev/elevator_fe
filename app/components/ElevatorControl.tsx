// components/ElevatorControl.js
import React from "react";

const ElevatorControl = ({ elevator, onMoveToFloor }: any) => {
  return (
    <div className="mb-8">
      <h3>Kiểm soát thang máy</h3>
      <p>Chọn tầng:</p>
      <div className="flex items-center gap-6">
        {[...Array(10)].map((_, index) => (
          <button
            className="p-[8px] bg-gray-600 text-white cursor-pointer"
            key={index}
            onClick={() => onMoveToFloor(elevator.id, index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ElevatorControl;
