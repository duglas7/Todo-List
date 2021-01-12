import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

function App() {

  const listIcon = <FontAwesomeIcon icon={faClipboardList} />
  const trashIcon = <FontAwesomeIcon icon={faTrashAlt} />
  
  const [newTodo, setNewTodo] = useState("")
  const [todos, setTodos] = useState([]) 

  useEffect(() => {

    fetch("https://assets.breatheco.de/apis/fake/todos/user/duglas7", {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/duglas7", {
      method: "PUT",
      body: JSON.stringify(
        todos.map((label) => {
          return { label: label, done: false };
        })
      ),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    
    }, [todos]);

  function handleNewTodoChange(event){
    event.preventDefault()
    setNewTodo(event.target.value)
  }

  function handleNewTodo(event){
    event.preventDefault()
    if (newTodo === "")  return
    setTodos([...todos, {id: Date.now(), text: newTodo}])
    event.target.reset()
  }

  function removeTodo(id){
    setTodos(todos.filter((todo)=> todo.id !== id))
  }
  
  return (
    <div className="container">
      <h1>Todo List <span>{listIcon}</span></h1>
      <form onSubmit={handleNewTodo}>
        <div className="input-group flex-nowrap">
          <input onChange={handleNewTodoChange} type="text" className="form-control" placeholder={todos.length === 0 ? "Aun sin tareas que realizar" : "Que mas necesitas realizar?"} aria-label="Username" aria-describedby="addon-wrapping" />
        </div>
        <ul className="list-group">
          {todos.map((todo) =>(<li class="list-group-item" key={todo.id}>{todo.text}<span class="" onClick={()=> removeTodo(todo.id)}> {trashIcon}</span></li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;

