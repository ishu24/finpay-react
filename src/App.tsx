import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
    </Routes>
  );
}
