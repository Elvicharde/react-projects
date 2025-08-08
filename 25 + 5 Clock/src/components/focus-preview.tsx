import { useCallback, useEffect, useRef, useState } from "react";
import TimerDisplay, { formatTimerDisplay } from "./shared/timer-display";
import { Button } from "./ui/button";
import { LucideTimer, LucideTimerOff, LucideTimerReset } from "lucide-react";
import useFocusConfig from "@/context/focus-config";

interface ITimerCount {
  hours: number;
  minutes: number;
  seconds: number;
}

type TimerActions = "start" | "reset" | "pause" | "resume" | null;

const defaultTimerCount: ITimerCount = { hours: 0, minutes: 0, seconds: 0 };
const mainButtonDisplay: Record<
  Exclude<TimerActions, null>,
  React.ReactNode
> = {
  start: (
    <div className="flex items-center gap-1">
      Start&nbsp;
      <LucideTimer />
    </div>
  ),
  pause: (
    <div className="flex items-center gap-1">
      Pause&nbsp;
      <LucideTimerOff />
    </div>
  ),
  resume: (
    <div className="flex items-center gap-1">
      Resume&nbsp;
      <LucideTimer />
    </div>
  ),
  reset: (
    <div className="flex items-center gap-1">
      Reset&nbsp;
      <LucideTimerReset />
    </div>
  ),
};

const FocusPreview = () => {
  const {
    config: { duration },
    updateConfig,
  } = useFocusConfig();
  const [timerControl, setTimerControl] = useState<TimerActions>(null);
  const [isBreak, setBreak] = useState<boolean>(false);
  const [timerCount, setTimerCount] = useState<ITimerCount>({
    ...defaultTimerCount,
    minutes: isBreak ? duration.break : duration.session,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleCountDown = useCallback(
    ({ timerAction }: { timerAction: "start" | "reset" }) => {
      if (timerAction === "reset") {
        setTimerCount({
          ...defaultTimerCount,
          // minutes: isBreak ? duration.break : duration.session,
          minutes: 25,
          seconds: 0,
        });
        setBreak(false);
        setTimerControl(null);
        updateConfig({ duration: { session: 25, break: 5 } });

        // manage audio
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        return;
      }

      if (timerAction === "start") {
        setTimerCount((prev) => {
          const { minutes, seconds } = prev;

          // session or break ended
          if (minutes === 0 && seconds === 0) {
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play();
            }

            const nextIsBreak = !isBreak;

            setTimerControl("pause"); // Pause current control

            setTimeout(() => {
              setBreak(nextIsBreak); //toggle break
              setTimerCount({
                ...defaultTimerCount,
                minutes: nextIsBreak ? duration.break : duration.session,
                seconds: 0,
              });
              setTimerControl("start");
            }, 1000);

            // setTimerControl(null); // Stop timer and prepare next phase (but don’t auto-start)
            // return {
            //   ...defaultTimerCount,
            //   minutes: isBreak ? duration.break : duration.session,
            // };
            return prev;
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
      }
    },
    [isBreak, duration]
  );

  const handleControlClick: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void = ({ currentTarget: { name: controlName } }) => {
    if (controlName === "startButton") {
      if (timerControl === "start") {
        setTimerControl("resume");
      } else {
        setTimerControl("start"); // ✅ no immediate countdown
      }
    } else {
      handleCountDown({ timerAction: "reset" });
    }
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

  useEffect(() => {
    setTimerCount((prev) => ({
      ...prev,
      minutes: isBreak ? duration.break : duration.session,
      seconds: 0,
    }));
  }, [duration, isBreak]);

  useEffect(() => {
    if (timerControl === "start") {
      updateConfig({ timerRunning: true });
    } else {
      updateConfig({ timerRunning: false });
    }
  }, [timerControl]);

  // isBreak && console.log(timerCount);

  return (
    <main className="w-[90%] max-w-[928px] !mx-auto !pt-16">
      <div className="flex flex-col gap-y-4 space-y-5">
        <h1 className="font-bold text-[#121417] text-[28px] flex items-center justify-center h-16">
          Focus Flow
        </h1>
        <div>
          <p className="text-sm text-center font-[#61758A]" id="timer-label">
            {isBreak ? "Break" : "Session"}
          </p>
          <p className="hidden" id="time-left">{`${formatTimerDisplay(
            timerCount["minutes"]
          )}:${formatTimerDisplay(timerCount["seconds"])}`}</p>
          <div className="flex !px-4 !py-6 gap-4">
            <TimerDisplay
              timeUnit="minutes"
              timerCount={timerCount["minutes"]}
            />
            <TimerDisplay
              timeUnit="seconds"
              timerCount={timerCount["seconds"]}
            />
          </div>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap gap-3 text-[#121417] !px-4 !py-3 items-center justify-center">
          <Button
            className="bg-[#0A80ED] text-white hover:bg-[#0a7fed] hover:text-white w-full max-w-[216px] h-10 cursor-pointer rounded-[20px]"
            variant={"outline"}
            name="startButton"
            onClick={handleControlClick}
            disabled={!timerCount.minutes && !timerCount.seconds}
            id="start_stop"
          >
            {timerControl === "start"
              ? mainButtonDisplay.pause
              : timerControl === "resume"
              ? mainButtonDisplay.resume
              : mainButtonDisplay.start}
          </Button>
          <Button
            className="bg-[#F2F2F5] hover:bg-[#DBE8F2] w-full max-w-[216px] h-10 cursor-pointer rounded-[20px]"
            variant={"outline"}
            name="resetButton"
            onClick={handleControlClick}
            id="reset"
          >
            {mainButtonDisplay.reset}
          </Button>
        </div>
      </div>
      <audio
        id="beep"
        ref={audioRef}
        preload="auto"
        src="./assets/audio/default-beep.mp3"
        className="hidden"
      />
    </main>
  );
};

export default FocusPreview;
