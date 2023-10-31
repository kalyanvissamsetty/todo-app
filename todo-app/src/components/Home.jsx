import "../css/Home.css"
export default function Home() {
  return (
    <div className="card">
      <div className="input-parent">
        <label className="label">Title</label>

        <input className="input" placeholder="Enter title"></input>
      </div>
      <div className="input-parent">
        <label className="label">Description</label>

        <textarea className="input" placeholder="Enter description"></textarea>
      </div>
      <div className="login-button">
        <button>Add</button>
      </div>
    </div>
  );
}
