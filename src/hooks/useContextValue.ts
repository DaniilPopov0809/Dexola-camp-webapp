import { AppContext } from "../context/AppContext";
import {  useContext } from "react";

export const useContextValue = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
      throw new Error('Context error');
    }
    return context;
  };