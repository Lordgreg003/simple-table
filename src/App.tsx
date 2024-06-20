import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TaskScreen } from "./TaskScreens/Index";
import { UserDetail } from "./components/Index";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskScreen />}></Route>
        <Route path="/user-detail/:id" element={<UserDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
