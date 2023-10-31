import "../css/Home.css";
import axios from "axios";
import { useRef } from "react";
export default function SignUp() {
  
  let usernameEntered = useRef("")
  let emailEntered = useRef("")
  let passwordEntered = useRef("")
  
  const handleFormSubmit = async(event)=>{
      event.preventDefault()
      let userData = {
        username: usernameEntered.current.value,
        email: emailEntered.current.value,
        password: passwordEntered.current.value,
        secret_id: "lkjhg"
      };
      
      axios.post("http://localhost:3000/signup",userData).
      then(res=>{
        alert("Data added")
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
          ></input>
        </div>
        <div className="login-button">
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
}
