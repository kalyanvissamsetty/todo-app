import { useRef } from "react";
import "../css/Home.css"
export default function Home() {
  let titleRef = useRef("")
  let descRef = useRef("")
  return (
    <div className="card">
      <div className="input-parent">
        <label className="label">Title</label>

        <input className="input" ref={titleRef}placeholder="Enter title"></input>
      </div>
      <div className="input-parent">
        <label className="label">Description</label>

        <textarea className="input" ref={descRef}placeholder="Enter description"></textarea>
      </div>
      <div className="login-button">
        <button>Add</button>
      </div>
    </div>
  );
}
