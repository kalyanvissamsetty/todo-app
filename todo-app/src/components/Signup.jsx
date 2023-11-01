import "../css/Home.css";
import axios from "axios";
import { useRef, useState } from "react";
import {useNavigate} from "react-router-dom"
function validatePassword(password) {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
  return passwordPattern.test(password);
}
export default function SignUp() {
  
  let usernameEntered = useRef("")
  let emailEntered = useRef("")
  let passwordEntered = useRef("")
  const [isPasswordWrong, setPasswordValid] = useState(false)
  const navigate = useNavigate()
  const handleFormSubmit = async(event)=>{
      event.preventDefault()
      if(!validatePassword(passwordEntered.current.value)){
        setPasswordValid(true)
        return;
      }
      let userData = {
        username: usernameEntered.current.value,
        email: emailEntered.current.value,
        password: passwordEntered.current.value,
        secret_id: "lkjhg"
      };
      
      axios.post("http://localhost:3000/signup",userData).
      then(res=>{
        setPasswordValid(false);
        navigate("/login")
        console.log(res);
      }).catch((error)=>{
        console.log(error)
      });
  }
  
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="card">
        <center>
          <h1>SignUp</h1>
        </center>
        <div className="input-parent">
          <label className="label">Username</label>
          <input
            className="input"
            type="text"
            ref={usernameEntered}
            placeholder="Enter Username"
          ></input>
        </div>
        <div className="input-parent">
          <label className="label">Email</label>

          <input
            className="input"
            type="email"
            ref={emailEntered}
            placeholder="Enter Email"
          ></input>
        </div>
        <div className="input-parent">
          <label className="label">Password</label>

          <input
            className="password"
            type="password"
            placeholder="Enter Password"
            ref={passwordEntered}
            onChange={(e)=>{
              if(e.target.value=='')
                setPasswordValid(false);
            }}
          ></input>
          {isPasswordWrong && (
            <p
              style={{
                fontSize: "10px",
                color: "red",
                marginTop: "1px",
                marginLeft: "2px",
              }}
            >
              Invalid Password
            </p>
          )}
        </div>
        <div className="login-button">
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
}
