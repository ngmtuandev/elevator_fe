// components/Elevator.js
import React from "react";

const Elevator = ({ elevator }: any) => {
  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "5px" }}>
      <h3>Thang máy số {elevator.position}</h3>
      <p>Tầng hiện tại: {elevator.currentFloor}</p>
      <p>Hướng hiện tại: {elevator.direction}</p>
      <p>Trang thái: {elevator.statusElevator}</p>
      <p>Tầng đang đợi: {elevator.pendingFloors.join(", ")}</p>
    </div>
  );
};

export default Elevator;
