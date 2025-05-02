import React from "react";
import ReactDOM from "react-dom/client";
import { Providers } from "@/app/providers";
import "react-phone-number-input/style.css";
import "./index.css";

// Ініціалізуємо i18next
import "./shared/i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers />
  </React.StrictMode>,
);
