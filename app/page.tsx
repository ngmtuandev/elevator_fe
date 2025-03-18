"use client";
import * as api from "../app/services/elevatorService";
import { useEffect, useState } from "react";
import ElevatorControl from "./components/ElevatorControl";
import Elevator from "./components/Elevator";
import Floor from "./components/Floor";
import { TDirection } from "./types/TDirection";
import { TStatusElevator } from "./types/TStatusElevator";

type TElevator = {
  id: string;
  position: number;
  currentFloor: number;
  direction: TDirection;
  statusElevator: TStatusElevator;
  pendingFloors: number[];
};

export default function Home() {
  const [elevators, setElevators] = useState([]);
  const [selectedElevator, setSelectedElevator] = useState<
    TElevator | undefined
  >(undefined);

  useEffect(() => {
    const socket = new WebSocket("ws://203.145.47.225:9090/ws");
    socket.onmessage = (event) => {
      console.log("connect ws database:", event.data);

      try {
        const updatedElevators = JSON.parse(event.data);

        setElevators(updatedElevators);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("ws error:", error);
    };

    socket.onclose = () => {
      console.log("ws closed");
    };

    return () => socket.close();
  }, []);

  const fetchElevators = async () => {
    const response = await api.getElevators();
    setElevators(response.data.data);
  };

  const handleCallElevator = async (floor: any, direction: any) => {
    const response = await api.findNearestElevator(floor, direction);
    if (response.data.data) {
      await api.callSpecificElevator(response.data.data.id, floor);
      fetchElevators();
    }
  };

  const handleMoveToFloor = async (elevatorId: string, floor: any) => {
    await api.callSpecificElevator(elevatorId, floor);
    fetchElevators();
  };

  const handleOpenDoor = async (elevatorId: string) => {
    await api.openDoor(elevatorId);
    fetchElevators();
  };

  const handleCloseDoor = async (elevatorId: string) => {
    await api.closeDoor(elevatorId);
    fetchElevators();
  };

  console.log("elevators: =====> ", elevators);
  return (
    <div className="p-[8px]">
      <h1 className="uppercase py-[20px] text-[30px]">Test The Chad Digital</h1>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          {[...Array(10)].map((_, index) => (
            <Floor
              key={index}
              floorNumber={index + 1}
              onCallElevator={handleCallElevator}
              onOpenDoor={() =>
                selectedElevator && handleOpenDoor(selectedElevator.id)
              }
              onCloseDoor={() =>
                selectedElevator && handleCloseDoor(selectedElevator.id)
              }
            />
          ))}
        </div>
        <div className="flex-1 flex-col">
          {elevators.map((elevator: TElevator) => (
            <div key={elevator.id} style={{ marginRight: "20px" }}>
              <Elevator elevator={elevator} />
              <button onClick={() => setSelectedElevator(elevator)}>
                Chọn
              </button>
              {selectedElevator && selectedElevator.id === elevator.id && (
                <ElevatorControl
                  elevator={elevator}
                  onMoveToFloor={handleMoveToFloor}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
