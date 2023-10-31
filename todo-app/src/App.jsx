// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
export default function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
