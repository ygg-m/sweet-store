import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./Contexts/AuthContext";
import { StoreProvider } from "./Contexts/StoreContext";
import "./Styles/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <AuthProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </AuthProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
