// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import MyContext from "./context/MyContext";

export default function App() {
  const [isLoggedIn,setLoggedIn] = useState(!!localStorage.getItem("token"))
  const [username,setUsername] = useState('')
  return (
    <>
      <MyContext.Provider value={{isLoggedIn,setLoggedIn,username,setUsername}}>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/login"
            element={
              <Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
            }
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </MyContext.Provider>
    </>
  );
}
