import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  const GetAllTodos = ()=>{
    useEffect(()=>{
      fetch('https://dummyjson.com/todos').then((data)=>{
        data.json().then((result)=>{
          console.log(result)
          setTodos(result.todos)
        })
      })
    },[]);
  }

  GetAllTodos()

  const addNewTodo = ()=>{
    if(newTodo.trim()){
      setTodos([...todos,{id: new Date().valueOf(),text: newTodo}])
      setNewTodo('')
    }
  }

  const changeStatusTodo = (id)=>{
    setTodos(todos.map((todo,index)=>{
      if(todo.id===id){
        todo.completed=!todo.completed
      }

      return todo;
    }))
  }

  const deleteTodo =  (index)=>{
    setTodos(todos.filter((e)=> e.id !== index))
  }

  return (
    <div className="nes-container with-title is-centered">
      <p class="title">Lista de Tarefas</p>
      <div class="nes-field is-inline">
        <input type="text" id="inline_field" class="nes-input" placeholder="Nova Tarefa" value={newTodo} onChange={(e)=>setNewTodo(e.target.value)}/>
        <label for="inline_field"><button className="nes-btn is-success" onClick={addNewTodo}>Adicionar</button></label>
      </div>
      <div className='lists'>
      <ul className='nes-list is-disc'>
        {todos.map((todo,index)=>(<li key={todo.id} className={todo.completed?"line-through":""}>{todo.todo}
          
          <p><label><input type='checkbox' class="nes-checkbox" checked={todo.completed} onChange={()=>changeStatusTodo(todo.id)}></input><span></span></label><button onClick={()=>deleteTodo(todo.id)} className="nes-btn is-error">🗑️</button></p></li>))}
      </ul>
      </div>
      
    </div>
  );
}

export default App;
 