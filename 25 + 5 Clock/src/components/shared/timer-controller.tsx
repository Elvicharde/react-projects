import { MinusIcon, PlusIcon } from "lucide-react";

import { Button } from "../ui/button";
import { useFocusConfig, type TDuration } from "@/context/focus-config";

type TDurationType = "Session" | "Break";

interface TimerControllerProps {
  durationType: TDurationType;
  value: number;
  handleSetDuration: (field: keyof TDuration, delta: number) => void;
}

const TimerController = ({
  durationType,
  value,
  handleSetDuration,
}: TimerControllerProps) => {
  const isSession = durationType === "Session";
  const {
    config: { timerRunning },
  } = useFocusConfig();
  return (
    <div className="flex justify-between">
      <div>
        <p
          className="font-medium"
          id={isSession ? "session-label" : "break-label"}
        >
          {durationType}
        </p>
        <p id={isSession ? "session-length" : "break-length"}>{value}</p>
      </div>
      <div className="flex w-[120px] h-[28px] text-[#1D2739] rounded-[8px] justify-between items-center text-base font-bold">
        <Button
          variant="secondary"
          disabled={value === 1 || timerRunning}
          onClick={() =>
            handleSetDuration(durationType.toLowerCase() as keyof TDuration, -1)
          }
          className="w-8 h-8 rounded-full cursor-pointer hover:bg-[#0a7fed] hover:text-white"
          id={isSession ? "session-decrement" : "break-decrement"}
        >
          <MinusIcon className="w-4 h-4" />
        </Button>
        {value}
        <Button
          variant="secondary"
          disabled={value === 60 || timerRunning}
          onClick={() =>
            handleSetDuration(durationType.toLowerCase() as keyof TDuration, +1)
          }
          className="w-8 h-8 rounded-full cursor-pointer hover:bg-[#0a7fed] hover:text-white"
          id={isSession ? "session-increment" : "break-increment"}
        >
          <PlusIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default TimerController;
