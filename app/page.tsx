"use client";

import { useEffect } from "react";
import { connectWebSocket } from "./services/websocketService";
import useFetchApi from "./hooks/useFetchApi";
import ElevatorComponent from "./components/Elevator";
import ElevatorSystem from "./components/ElevatorSystem";

let TOTAL_FLOOR = 10;

export default function Home() {
  const { data } = useFetchApi("/elevator");
  console.log("🚀 ~ Home ~ data:", data);

  useEffect(() => {
    connectWebSocket();
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ElevatorSystem></ElevatorSystem>
    </div>
  );
}
