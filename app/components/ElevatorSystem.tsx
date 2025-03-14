import React, { useEffect, useState } from "react";
import {
  connectWebSocket,
  addListener,
  removeListener,
} from "../services/websocketService";
import Elevator from "./Elevator";
import Floor from "./Floor";

const ElevatorSystem: React.FC = () => {
  const [elevators, setElevators] = useState<IElevator[]>([]);

  useEffect(() => {
    connectWebSocket();
    const handleWebSocketData = (data: IElevator[]) => setElevators(data);
    addListener(handleWebSocketData);
    return () => removeListener(handleWebSocketData);
  }, []);

  return (
    <div className="elevator-system">
      <div className="floors">
        {[...Array(10)].map((_, i) => (
          <Floor key={i} floor={10 - i} />
        ))}
      </div>
      <div className="elevators">
        {elevators.map((elevator) => (
          <Elevator key={elevator.id} elevator={elevator} />
        ))}
      </div>
    </div>
  );
};

export default ElevatorSystem;
