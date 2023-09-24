import { AppContext } from "../context/AppContext";
import { MainContext } from "../context/MainContext";
import { useContext } from "react";

export const useAppContextValue = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("Context error");
  }
  return context;
};

export const useMainContextValue = () => {
  const context = useContext(MainContext);
  if (context === undefined) {
    throw new Error("Context error");
  }
  return context;
};
