import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GlobalVariableProvider } from "./Context/GlobalVariable"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalVariableProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GlobalVariableProvider>
);
