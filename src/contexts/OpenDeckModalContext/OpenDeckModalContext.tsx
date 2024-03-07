import { ReactNode, createContext, useCallback, useMemo, useState } from "react";
import { OpenDeckModalContextDefaults, openDeckModalContextDefaults } from "./OpenDeckModalContextDefaults";

export interface OpenDeckModalProviderProps {
  children: ReactNode;
}

export const OpenDeckModalContext = createContext(openDeckModalContextDefaults);

export const OpenDeckModalProvider = ({ children }: OpenDeckModalProviderProps) => {
  const [visible, setVisible] = useState(false);

  const open = useCallback(() => {
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  const value: OpenDeckModalContextDefaults = useMemo(
    () => ({
      visible,
      open,
      close,
    }),
    [visible, open, close]
  );

  return <OpenDeckModalContext.Provider {...{ value }}>{children}</OpenDeckModalContext.Provider>;
};
