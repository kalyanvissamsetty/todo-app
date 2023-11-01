import { useContext, useRef } from "react";
import "../css/Home.css"
import MyContext from "../context/MyContext";
import Login from "./Login";

export default function Home() {
  let titleRef = useRef("")
  let descRef = useRef("")
  const {isLoggedIn} = useContext(MyContext)

  return <>{

    isLoggedIn?(
    <div className="card">
      <div className="input-parent">
        <label className="label">Title</label>

        <input
          className="input"
          ref={titleRef}
          placeholder="Enter title"
          ></input>
      </div>
      <div className="input-parent">
        <label className="label">Description</label>

        <textarea
          className="input"
          ref={descRef}
          placeholder="Enter description"
          ></textarea>
      </div>
      <div className="login-button">
        <button>Add</button>
      </div>
    </div>):(<Login/>)
  }
    
    </>
  
}
