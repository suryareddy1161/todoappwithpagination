import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react';
import arrowLeft from './pictures/arrow-left.png'
import arrowRight from './pictures/arrow-right.png'

function App() {
  const [todos, setTodos] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then(res => setTodos(res.data))
  }, [])

  const handleClick = (index) => {
    let _todos = [...todos];
    _todos[index].completed = !_todos[index].completed
    setTodos(_todos)
  }

  const handlePage = (direction) => {
    if (direction === "next" && page < todos.length / 10) {
      setPage(page + 1)
    } else if (direction === "previous" && page > 1) {
      setPage(page - 1)
    }
  }

  return (
    <div className="App">
      <div className='todo-control'>
        <img src={arrowLeft} onClick={() => handlePage("previous")} />
        {page}
        <img src={arrowRight} onClick={() => handlePage("next")} />
      </div>
      <div className='todo-container'>
        {
          todos.map((todo, index) => {
            if (index + 1 <= page * 10 && index >= (page - 1) * 10) {
              return (
                <div>
                  <span>{todo.id} </span>
                  <span className={todo.completed ? 'line' : ''}>{todo.title} </span>
                  <input
                    type={"checkbox"}
                    checked={todo.completed}
                    onClick={() => handleClick(index)}
                  />
                </div>
              )
            }
          })
        }
      </div>
    </div>
  );
}

export default App;