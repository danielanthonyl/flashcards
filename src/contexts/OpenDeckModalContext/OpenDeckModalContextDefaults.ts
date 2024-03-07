export interface OpenDeckModalContextDefaults {
  visible: boolean;
  open: () => void;
  close: () => void;
}

export const openDeckModalContextDefaults: OpenDeckModalContextDefaults = {
  visible: false,
  open: () => null,
  close: () => null,
};
