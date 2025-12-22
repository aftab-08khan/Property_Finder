import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SingleProfile from "./pages/SingleProfile";
import { ThemeContext } from "../context/themeContext";
import Footer from "./components/footer";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <ThemeContext>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Contact />} path="/contact" />

          <Route path="/:city/:id" element={<SingleProfile />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </ThemeContext>
  );
};

export default App;
