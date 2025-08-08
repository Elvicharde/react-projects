import { createContext, useContext, useState, type ReactNode } from "react";

export type TDuration = {
  session: number;
  break: number;
};

export type TNotifications = {
  start: string;
  end: string;
};

export interface IFocusConfig {
  duration: TDuration;
  sessionNotifications: TNotifications;
  breakNotifications: TNotifications;
  timerRunning: boolean;
}

export interface IFocusConfigContext {
  config: IFocusConfig;
  updateConfig: (newConfig: Partial<IFocusConfig>) => void;
}

const defaultConfig: IFocusConfig = {
  duration: {
    session: 25,
    break: 5,
  },
  sessionNotifications: {
    start: "",
    end: "",
  },
  breakNotifications: {
    start: "",
    end: "",
  },
  timerRunning: false,
};

const FocusConfigContext = createContext<IFocusConfigContext | null>(null);

export const useFocusConfig = () => {
  const config = useContext(FocusConfigContext);
  if (!config) {
    throw new Error(
      "useFocusConfigContext must be used within a valid FocusConfig provider!"
    );
  }
  return config;
};

// Provider component
export const FocusConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<IFocusConfig>(defaultConfig);

  const updateConfig = (newConfig: Partial<IFocusConfig>) => {
    setConfig((prev) => ({
      ...prev,
      ...newConfig,
    }));
  };

  return (
    <FocusConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </FocusConfigContext.Provider>
  );
};

export default useFocusConfig;
