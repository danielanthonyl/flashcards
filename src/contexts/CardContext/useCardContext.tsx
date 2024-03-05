import { useContext } from "react";
import { CardContext } from "./CardContext";

export const useCardContext = () => useContext(CardContext);