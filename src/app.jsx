import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { App, ZMPRouter, AnimationRoutes, Route } from "zmp-ui";
import HomePage from "./pages/index/index.jsx";
import "zmp-ui/zaui.css";
import "./css/app.scss";

const getSavedTheme = () => {
  try {
    const saved = localStorage.getItem("zma_zipcode_theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch (e) {}
  return "light";
};

const MyApp = () => {
  const [initialTheme] = useState(getSavedTheme);

  return (
    <App theme={initialTheme}>
      <ZMPRouter>
        <AnimationRoutes>
          <Route path="/" element={<HomePage />} />
        </AnimationRoutes>
      </ZMPRouter>
    </App>
  );
};

const root = createRoot(document.getElementById("app"));
root.render(<MyApp />);
