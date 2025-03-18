import axios from "axios";

const API_BASE_URL = "https://9410-203-145-47-225.ngrok-free.app/elevator";

export const createElevator = (data: any) => axios.post(API_BASE_URL, data);
export const getElevators = () => axios.get(API_BASE_URL);
export const findNearestElevator = (floor: any, direction: any) =>
  axios.get(
    `${API_BASE_URL}/find-elevator?floor=${floor}&direction=${direction}`
  );
export const callSpecificElevator = (elevatorId: any, floor: any) =>
  axios.post(
    `${API_BASE_URL}/call-specific?elevatorId=${elevatorId}&floor=${floor}`,
    {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    }
  );
export const moveElevators = () => axios.post(`${API_BASE_URL}/move`);
export const openDoor = (elevatorId: any) =>
  axios.post(`${API_BASE_URL}/open-door?elevatorId=${elevatorId}`);
export const closeDoor = (elevatorId: any) =>
  axios.post(`${API_BASE_URL}/close-door?elevatorId=${elevatorId}`);
