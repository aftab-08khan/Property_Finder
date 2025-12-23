import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SingleProfile from "./pages/SingleProfile";
import { ThemeContext } from "../context/themeContext";
import Footer from "./components/footer";
import Contact from "./pages/Contact";
import { BarCharts } from "./components/BarCharts";
import Analysis from "./pages/Analysis";

const App = () => {
  return (
    <ThemeContext>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Analysis />} path="/analysis" />

          <Route element={<Contact />} path="/contact" />

          <Route path="/:city/:id" element={<SingleProfile />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </ThemeContext>
  );
};

export default App;
