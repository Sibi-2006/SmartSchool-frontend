import React, { createContext } from "react";

export const GlobalVariableContext = createContext();

export function GlobalVariableProvider({ children }) {
  const baseUrl =process.env.REACT_APP_BASE_URL || "http://192.168.96.101:3500/api"
  const homeUrl = process.env.REACT_APP_HOME_URL || "http://192.168.96.101:3500"
  const appName = "SmartSchool";

  return (
    <GlobalVariableContext.Provider value={{ appName , baseUrl , homeUrl}}>
      {children}
    </GlobalVariableContext.Provider>
  );
}