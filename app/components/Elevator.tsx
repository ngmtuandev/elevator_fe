import React from "react";

const Elevator = ({ elevator }: { elevator: any }) => {
  return (
    <div className="elevator">
      <p>🚀 Thang {elevator.id}</p>
      <p>📍 Tầng {elevator.currentFloor}</p>
      <p>🔄 Trạng thái: {elevator.statusElevator}</p>
    </div>
  );
};

export default Elevator;
