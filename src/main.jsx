
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";   // ✅ ADD THIS

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <App />
        <Toaster richColors position="top-right" />   {/* ✅ ADD THIS */}
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
