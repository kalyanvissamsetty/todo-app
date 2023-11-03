/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

function ContentTable(props) {
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
      <center style={{marginTop:"40px"}}>
        <table border={1}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {props.todoData.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </>
  );
}

export default ContentTable