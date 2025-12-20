import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SingleProfile from "./pages/SingleProfile";
import { ThemeContext } from "../context/themeContext";

const App = () => {
  return (
    <ThemeContext>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route path="/:city/:id" element={<SingleProfile />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext>
  );
};

export default App;
