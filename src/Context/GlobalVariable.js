import React, { createContext } from "react";

export const GlobalVariableContext = createContext();

export function GlobalVariableProvider({ children }) {
  const appName = "SmartSchool";

  return (
    <GlobalVariableContext.Provider value={{ appName }}>
      {children}
    </GlobalVariableContext.Provider>
  );
}
