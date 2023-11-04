/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
import "../css/Home.css"
import MyContext from "../context/MyContext";
import Login from "./Login";
import axios from "axios";
import ContentTable from "./ContentTable";

export default function Home({ getTodosForUser }) {
  let titleRef = useRef("");
  let descRef = useRef("");
  const [todoData, setTodoData] = useState([]);
  const { isLoggedIn } = useContext(MyContext);
  const headers = {
    Authorization: localStorage.getItem("token"),
  };
  useEffect(()=>getTodosForUser(setTodoData), []);
  const forSubmitHandler = (event) => {
    event.preventDefault();
    const todoData = {
      title: titleRef.current.value,
      description: descRef.current.value,
      done:false
    };

    axios
      .post("http://localhost:3000/addtodo", todoData, { headers })
      .then((res) => {
        getTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getTodos = () => {
    axios.get("http://localhost:3000/getTodos", { headers }).then((res) => {
      setTodoData(res.data);
      console.log(res.data);
    });
  };
  return (
    <>
      {isLoggedIn ? (
        <>
          <form onSubmit={forSubmitHandler}>
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
                <button type="submit">Add</button>
              </div>
            </div>
          </form>

          <ContentTable
            todoData={todoData}
            getTodosForUser={getTodosForUser}
            setTodoData={setTodoData}
          />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
