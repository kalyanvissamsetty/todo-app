import { useContext, useRef, useState } from "react";
import "../css/Home.css";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "../context/MyContext";

export default function Login() {
  const {setLoggedIn,setUsername,isLoggedIn} = useContext(MyContext)
  console.log(isLoggedIn)
  let emailRef = useRef("")
  let passwordRef = useRef("")
  const navigate = useNavigate();
  const [areInvalidCredentials,setInvalidCredentials] = useState(false)
  const handleSubmit = (event)=>{
    event.preventDefault()
    const loginData = {
      email:emailRef.current.value,
      password:passwordRef.current.value
    }
    axios.post("http://localhost:3000/login", loginData)
    .then(res=>{ 
      localStorage.setItem('token','Bearer '+ res.data.token)
      setUsername(res.data.username)
      setLoggedIn(true)
      navigate("/")
    })
    .catch(err=>{
      setInvalidCredentials(true)
      console.log(err)
    });
  }

  if(isLoggedIn){
    return <Navigate to={'/'}/>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="card">
        <center>
          <h1>Login</h1>
        </center>
        <div className="input-parent">
          <label className="label">Email</label>

          <input
            className="input"
            ref={emailRef}
            placeholder="Enter Email"
          ></input>
        </div>
        <div className="input-parent">
          <label className="label">Password</label>

          <input
            className="password"
            ref={passwordRef}
            placeholder="Enter Password"
          ></input>
        </div>
        <div className="login-button">
          <button type="submit">Login</button>
        </div>
        {
          areInvalidCredentials && 
        <center>
          <p style={{ color: "red", fontSize: "14px",marginTop:"1px" }}>Invalid Credentials</p>
        </center>
          
        }
      </div>
    </form>
  );
}
