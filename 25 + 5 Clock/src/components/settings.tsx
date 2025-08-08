import useFocusConfig, {
  type TDuration,
  type TNotifications,
} from "@/context/focus-config";
import TimerController from "./shared/timer-controller";
import { Separator } from "./ui/separator";
type TSessionType = "sessionNotifications" | "breakNotifications";

const Settings = () => {
  const { config, updateConfig } = useFocusConfig();

  const handleSetDuration = (field: keyof TDuration, delta: number): void => {
    const newValue = config.duration[field] + delta;

    // Optional: clamp the value to a minimum of 1 and maximum of 60
    if (newValue < 1 || newValue > 60) return;

    const newDuration = {
      ...config.duration,
      [field]: newValue,
    };

    updateConfig({ duration: newDuration });
  };

  const handleSetSound = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { name, value } = event.currentTarget;

    const [typePrefix, key] = name.split(".") as [
      TSessionType,
      keyof TNotifications
    ];

    const newNotification = {
      ...config[typePrefix],
      [key]: value,
    };

    updateConfig({ [typePrefix]: newNotification });
  };

  return (
    <div className="w-[90%] max-w-[928px] !mx-auto !mt-16 text-[#121417]">
      <h2 className="font-bold text-2xl !mb-4">Settings</h2>
      <Separator />
      <div className="!py-4">
        <div className="flex flex-col gap-4">
          <p className="font-bold text-lg">Duration (minutes)</p>

          <div className="flex flex-col gap-4">
            <TimerController
              handleSetDuration={handleSetDuration}
              durationType="Session"
              value={config.duration.session}
            />
            <TimerController
              handleSetDuration={handleSetDuration}
              durationType="Break"
              value={config.duration.break}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
