import { useContext } from "react";
import { HostContext } from "../context/host-context";

export const useHost = () => {
  const context = useContext(HostContext);
  if (!context) {
    throw new Error("useHost must be used inside a HostProvider");
  }
  return context;
};
