import { useEffect, useState } from 'react';
import Preloader from './components/Preloader';
import { createTodo, readTodos } from './functions';
import { deleteTodo, updateTodo } from './api';
function App() {

  const [todo, setTodo] = useState({ title: '', content: '' })
  const [todos, setTodos] = useState(null);
  const [currentId, setCurrentId] = useState(0);

  const clear = () => {
    setTodo({ title: '', content: '' });
    setCurrentId(0)
  }

  useEffect(() => {
    const clearTodo = (e) => {
      if (e.keyCode == 27 ) {
        clear();
      }
    }
    window.addEventListener('keydown', clearTodo)
    return () => window.removeEventListener('keydown', clearTodo)
  }, [])
  // useEffect(() => {
  //   const submitTodo = (e) => {
  //     if (e.keyCode == 13 ) {
  //       // onSubmithandler();
  //       // clear()
  //       alert("hi")
  //     }
  //   }
  //   window.addEventListener('keydown', submitTodo)
  //   return () => window.removeEventListener('keydown', submitTodo)
  // }, [])
  useEffect(() => {
    let currentTodo = currentId != 0 ? todos.find(todo => todo._id === currentId) :
      { title: '', content: '' };
    setTodo(currentTodo);
  }, [currentId])
  useEffect(() => {
    const fetchData = async () => {
      const result = await readTodos();
      // console.log(result);
      setTodos(result);
    }
    fetchData();
  }, [currentId])
  // useEffect(() => {
  //   const listener = event => {
  //     if (event.code === "Enter" || event.code === "NumpadEnter") {
  //       console.log("Enter key was pressed. Run your function.");
  //       event.preventDefault();
  //       onSubmithandler();
  //       // callMyFunction();
  //     }
  //   };
  //   document.addEventListener("keydown", listener);
  //   return () => {
  //     document.removeEventListener("keydown", listener);
  //   };
  // }, []);
  const onSubmithandler = async (e) => {
    e.preventDefault();
    if(currentId === 0) {
      const result = await createTodo(todo)
      // console.log(result);
      setTodos([...todos,result])
      clear();
    }else{
      await updateTodo(currentId,todo)
      clear();
    }
  }

  const removeTodo = async (id) => {
    await deleteTodo(id);
    const todosCpy = [...todos];
    todosCpy.filter(todo => todo._id !== id);
    setTodos(todosCpy);
  }
  const showClear = todo.title || todo.content;
  return (
    <div className="container">
      <div className="row">
        <pre>{JSON.stringify(todo)}</pre>
        <form className="col s12" >
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">title</i>
              <input id="icon_prefix" type="text" className="validate" value={todo.title} onChange={e => setTodo({ ...todo, title: e.target.value })} />
              <label htmlFor="icon_prefix">Title</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">description</i>
              <input id="description" type="tel" className="validate" value={todo.content} onChange={e => setTodo({ ...todo, content: e.target.value })} />
              <label htmlFor="description">Content</label>
            </div>
          </div>
          <div className="row">
            {showClear && <button className="wave-effect.waves-effect waves-light btn col s2" onClick={clear}>Clear</button>}
            <button className="wave-effect.waves-effect waves-light btn col s2" onClick={onSubmithandler}>Submit</button>
          </div>
        </form>
        {!todos ? <Preloader /> : todos.length > 0 ? <ul className="collection">
          {todos.map(todo => <li key={todo.id}
            onClick={() => setCurrentId(todo._id)}
            className="collection-item">
            <div>
              <h5>{todo.title}</h5>
              <p>{todo.content}
              <a className="secondary-content" onClick={() => removeTodo(todo._id)}>
                <i className="material-icons">delete</i>
              </a>
              </p>
            </div>
          </li>
          )}
        </ul> : <div>Nothing to do </div>}
      </div>
    </div>
  );
}

export default App;
