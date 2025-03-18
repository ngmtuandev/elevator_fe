import React from "react";

type FloorProps = {
  floorNumber: number;
  onCallElevator: (floor: number, type: string) => void;
  onOpenDoor: () => void;
  onCloseDoor: () => void;
};

const Floor = ({
  floorNumber,
  onCallElevator,
  onOpenDoor,
  onCloseDoor,
}: FloorProps) => {
  return (
    <div
      className="flex flex-col justify-center"
      style={{ border: "1px solid gray", padding: "10px", margin: "5px" }}
    >
      <h3 className="uppercase">Tầng {floorNumber}</h3>
      <button
        className=" font-semibold cursor-pointer"
        onClick={() => onCallElevator(floorNumber, "UP")}
      >
        Lên
      </button>
      <button
        className=" font-semibold cursor-pointer"
        onClick={() => onCallElevator(floorNumber, "DOWN")}
      >
        Xuống
      </button>
      <button
        className=" font-semibold cursor-pointer"
        onClick={() => onOpenDoor()}
      >
        Mở cửa
      </button>
      <button
        className=" font-semibold cursor-pointer"
        onClick={() => onCloseDoor()}
      >
        Đóng cửa
      </button>
    </div>
  );
};

export default Floor;
