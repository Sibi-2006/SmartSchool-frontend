import React, { createContext } from "react";

export const GlobalVariableContext = createContext();

export function GlobalVariableProvider({ children }) {
  const baseUrl = "http://192.168.97.101:3500/api"
  const appName = "SmartSchool";

  return (
    <GlobalVariableContext.Provider value={{ appName , baseUrl }}>
      {children}
    </GlobalVariableContext.Provider>
  );
}
