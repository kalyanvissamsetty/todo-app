import "../css/Home.css";
export default function Login() {
  return (
    <div className="card">
      <center>
        <h1>Login</h1>
      </center>
      <div className="input-parent">
        <label className="label">Email</label>

        <input className="input" placeholder="Enter Email"></input>
      </div>
      <div className="input-parent">
        <label className="label">Password</label>

        <input className="password" placeholder="Enter Password"></input>
      </div>
      <div className="login-button">
        <button>Login</button>
      </div>
    </div>
  );
}