interface TimerDisplayProps {
  timerCount: number;
  timeUnit: "hours" | "minutes" | "seconds" | "milli-seconds";
}

const formatTimerDisplay = (value: number) => String(value).padStart(2, "0");

const TimerDisplay = ({ timerCount, timeUnit }: TimerDisplayProps) => {
  return (
    <div className="text-center font-normal text-[#121417] h-[96px] flex flex-col gap-4 w-full">
      <div className="font-bold text-lg bg-[#F2F2F5] flex-1 flex items-center justify-center rounded-2xl">
        {formatTimerDisplay(timerCount)}
      </div>
      <span className="text-sm h-5">{timeUnit}</span>
    </div>
  );
};

export default TimerDisplay;
