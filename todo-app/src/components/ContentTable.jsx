/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
function ContentTable(props) {
  const headers = {
    Authorization: localStorage.getItem("token"),
  };
  const checkBoxClickHandler = (id) =>{
      axios.put(`http://localhost:3000/updateTodo/${id}`,{
        _id:id
      },{headers}).then(res=>{
        console.log(props.todoData);
        props.getTodosForUser(props.setTodoData);
      }).catch((err)=>{
        console.log(err)
      });
  }

  const deleteTodoHandler = (id)=>{
    try{
      axios.delete(`http://localhost:3000/deleteTodo/${id}`,{headers}).then((res)=>{
        props.getTodosForUser(props.setTodoData);
      }).catch(err=>{
        console.log(err)
      });
    }catch(err){
      console.log(err)
    }
  }
  if(props.todoData.length == 0){
    return (
      <>
        <center>
        <h3> No Todos Added</h3>

        </center>
      </>
    )
  }
  return (
    <>
      <center style={{ marginTop: "40px" }}>
        <table border={1}>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {props.todoData.map((item) => (
              <tr key={item._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => checkBoxClickHandler(item._id)}
                  />
                </td>
                <td>
                  {item.done ? <del>{item.title}</del> : (<>{item.title}</>)}
                </td>
                <td>
                  {item.done ? <del>{item.description}</del> : item.description}
                </td>
                <td>
                  <center>
                    <button
                      style={{
                        padding: "5px",
                        backgroundColor: "red",
                      }}
                      onClick={() => deleteTodoHandler(item._id)}
                    >
                      Delete
                    </button>
                  </center>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </>
  );
}

export default ContentTable