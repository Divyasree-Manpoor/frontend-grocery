import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext"; // 👈 ADD THIS
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider> {/* 👈 WRAP HERE */}
        <App />
        <Toaster position="top-right" richColors closeButton />
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);