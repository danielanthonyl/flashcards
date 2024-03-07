import { useContext } from "react";
import { OpenDeckModalContext } from "./OpenDeckModalContext";

export const useOpenDeckModalContext = () => useContext(OpenDeckModalContext);