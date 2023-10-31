import { useNavigate } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
    const navigator = useNavigate()
    const handleClick = (url)=>{
        navigator(url)
    }
  return (
    <>
      <nav className="navbar">
        <div className="greet">
          <h4>Hi Kalyan</h4>
        </div>
        <div className="nav-buttons">
          <button onClick={() => handleClick("/login")}>Login</button>
          <button onClick={() => handleClick("/signup")}>SignUp</button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
