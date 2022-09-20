import React from "react";
import { SearchScreen, ViewScreen } from "./Screens";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchScreen />} />
        <Route path="/view/:id" element={<ViewScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
