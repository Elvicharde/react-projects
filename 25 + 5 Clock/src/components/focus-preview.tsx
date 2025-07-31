import { useCallback, useEffect, useState } from "react";
import TimerDisplay from "./shared/timer-display";
import { Button } from "./ui/button";

interface ITimerCount {
  hours: number;
  minutes: number;
  seconds: number;
}

type TimerActions = "start" | "reset" | null;

const defaultTimerCount: ITimerCount = { hours: 0, minutes: 25, seconds: 0 };


const FocusPreview = () => {
  const [timerControl, setTimerControl] = useState<TimerActions>(null);
  const [timerCount, setTimerCount] = useState<ITimerCount>(defaultTimerCount);

  const handleCountDown = useCallback(
    ({ timerAction }: { timerAction: "start" | "reset" }) => {
      if (timerAction === "reset") {
        setTimerCount(defaultTimerCount);
        setTimerControl(timerAction);
        return;
      }

      if (timerAction === "start") {
        setTimerCount((prev) => {
          const { minutes, seconds } = prev;

          if (minutes === 0 && seconds === 0) {
            return { ...prev }; // Do nothing if time is up
          }

          if (seconds === 0) {
            return {
              ...prev,
              minutes: minutes - 1,
              seconds: 59,
            };
          }

          return {
            ...prev,
            seconds: seconds - 1,
          };
        });

        setTimerControl(timerAction);
      }
    },
    [setTimerCount, setTimerControl]
  );

  const handleControlClick: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void = ({ currentTarget: { name: controlName } }) => {
    controlName === "startButton"
      ? handleCountDown({ timerAction: "start" })
      : handleCountDown({ timerAction: "reset" });
  };

  // update timer to match realtime-time count
  useEffect(() => {
    const interval = setInterval(() => {
      if (timerControl === "start") {
        handleCountDown({ timerAction: "start" });
      }
    }, 1000); // update every second

    return () => clearInterval(interval); // cleanup on unmount
  }, [timerControl, handleCountDown]);

  return (
    <main className="w-full h-screen max-w-[928px] !mx-auto !pt-16">
      <div className="flex flex-col gap-y-4 space-y-5">
        <h1 className="font-bold text-[#121417] text-[28px] flex items-center justify-center h-16">
          Focus Flow
        </h1>
        <div className="flex !px-4 !py-6 gap-4">
          <TimerDisplay timeUnit="minutes" timerCount={timerCount["minutes"]} />
          <TimerDisplay timeUnit="seconds" timerCount={timerCount["seconds"]} />
        </div>
        <div className="flex gap-3 text-[#121417] !px-4 !py-3 items-center justify-center">
          <Button
            className="bg-[#0A80ED] text-white hover:bg-[#0A80ED] hover:text-white w-full max-w-[216px] h-10 cursor-pointer rounded-[20px]"
            variant={"outline"}
            name="startButton"
            onClick={handleControlClick}
          >
            Start
          </Button>
          <Button
            className="bg-[#F2F2F5] w-full max-w-[216px] h-10 cursor-pointer rounded-[20px]"
            variant={"outline"}
            name="resetButton"
            onClick={handleControlClick}
          >
            Reset
          </Button>
        </div>
      </div>
    </main>
  );
};

export default FocusPreview;
