import React from "react";
import { callElevator } from "../services/websocketService";
import { PiElevatorLight } from "react-icons/pi";

interface FloorProps {
  floor: number;
}

const Floor: React.FC<FloorProps> = ({ floor }) => {
  return (
    <div className="floor">
      <PiElevatorLight className="xl:text-5xl" />
      <p>Tầng {floor}</p>
      <button onClick={() => callElevator(floor, "UP")}>⬆ Gọi lên</button>
      <button onClick={() => callElevator(floor, "DOWN")}>⬇ Gọi xuống</button>
    </div>
  );
};

export default Floor;
