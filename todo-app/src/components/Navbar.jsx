import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import "../css/Navbar.css";
import MyContext from "../context/MyContext";
function Navbar() {
    const navigator = useNavigate()
    const handleClick = (url)=>{
        navigator(url)
    }

    const logoutHandler = () =>{
      try{
        localStorage.removeItem("token")
        setLoggedIn(false)
        navigator("/login")
      }catch(err){
        console.log(err)
      }
    }
    const { isLoggedIn, setLoggedIn, username} = useContext(MyContext);
  return (
    <>
      <nav className="navbar">
        <div className="greet">
          {isLoggedIn ? <h4>Hi {username}</h4> : (<h4>Please Login/SignUp</h4>)}
        </div>
        <div className="nav-buttons">
          {isLoggedIn ? (
            <button onClick={logoutHandler}>Logout</button>
          ) : (
            <>
              <button onClick={() => handleClick("/login")}>Login</button>
              <button onClick={() => handleClick("/signup")}>SignUp</button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
