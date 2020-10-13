import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { AiFillCloseCircle } from "react-icons/ai";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const updateList = async () => {
    console.log(taskList);
    await fetch("https://assets.breatheco.de/apis/fake/todos/user/natalia",
    {
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify(taskList),
    })
    .then(response => response.text())
    .then(newResponse => {
      console.log(newResponse);
    })
    .catch(error => console.log(error))
  }

  const handleTaskList = async (e) => {
    e.preventDefault()
    const taskNew =  [
      ...taskList,
      { label: task, done: false}
    ]
    setTaskList(
      [
        ...taskNew
      ]
    )
    await updateList();
  }

  const getList = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/natalia",
      {
        headers: {
          "Content-Type": "application/json"
        },
        method: "GET",
  
      })

      .then(response => response.text())
      .then(newResponse => {
        setTaskList(JSON.parse(newResponse))
        console.log(newResponse);
      })
      .catch(error => console.log(error))
  }


  useEffect(() => {
    getList();
  }, [])

  
  
  const removeTask = (index) => {  
      const filterData = taskList.filter(item => item !== taskList[index]);
      setTaskList(filterData);
  }

    return (

      <div className="App">
        <div className="container notebook">
          <h1 className="title display-3">to do list</h1>
          <form onSubmit={(e) => {handleTaskList(e)}}>
            <input className="form-control input-group-lg"
              placeholder="New Task" 
              onChange={e => setTask(e.target.value)}/>
          </form>
          <ul >
            {taskList.map((item, index) => (
              <li className="list-group-item d-flex justify-content-between align-items-center"
                key={index} >
                {item.label} <AiFillCloseCircle  onClick={() => {removeTask(index)}}  />
              </li>
            ))}
            <div>
              <small>
                {taskList.length} &nbsp; Item left
            </small>
            </div>
          </ul>
        </div>
      </div>
    );
  }

  export default App;