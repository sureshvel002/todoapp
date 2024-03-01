import { useEffect, useRef, useState } from 'react';
import Preloader from './components/Preloader';
import { createTodo, readTodos } from './functions';
import { deleteTodo, updateTodo } from './api';


// const DropDown = ({onEdit}) => {
//   return (
//     <div>
//       <button className="material-icons btn-floating btn-small waves-effect waves-light dropdown-trigger btn secondary-content" href="#" data-target='dropdown1'>more_vert</button>
//       {/* <a className=' btn' href='#' data-target='dropdown1'>Drop Me!</a> */}
//       <ul id='dropdown1' className='dropdown-content'>
//         <li><a href='#!' onClick={onEdit}>Edit</a></li>
//         <li><a href="#!">Copy</a></li>
//         <li><a href="#!" >Delete</a></li>
//         {/* <li className="divider" tabIndex="-1"></li>
//               <li><a href="#!">three</a></li>
//               <li><a href="#!"><i className="material-icons">view_module</i>four</a></li>
//               <li><a href="#!"><i className="material-icons">cloud</i>five</a></li> */}
//       </ul>
//     </div>
//   )
// }

const App = () => {
  const [todo, setTodo] = useState({ title: '', content: '' })
  const [todos, setTodos] = useState(null);
  const [currentId, setCurrentId] = useState(0);
  const [copy, setCopy] = useState('');
  const cpyelement = useRef(null);

  const clear = () => {
    setTodo({ title: '', content: '' });
    setCurrentId(0)
  }

  useEffect(() => {
    const clearTodo = (e) => {
      if (e.keyCode === 27) {
        clear();
      }
    }
    window.addEventListener('keydown', clearTodo)
    return () => window.removeEventListener('keydown', clearTodo)
  }, [])
  // useEffect(() => {
  //   const submitTodo = (e) => {
  //     if (e.keyCode == 13 ) {
  //       onSubmithandler();
  //       // clear()
  //       alert("hi")
  //     }
  //   }
  //   window.addEventListener('keydown', submitTodo)
  //   return () => window.removeEventListener('keydown', submitTodo)
  // }, [])
  useEffect(() => {
    let currentTodo = currentId !== 0 ? todos.find(todo => todo._id === currentId) :
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
  // const handleEdit = (id) => {
  //   console.log(id);  
  //   setCurrentId(id)
  // }

  const onSubmithandler = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      const result = await createTodo(todo)
      // console.log(result);
      setTodos([...todos, result])
      clear();
    } else {
      await updateTodo(currentId, todo)
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

  const Localtime = (ltime) => {
    var localTime = new Date(ltime).toLocaleString();
    return localTime;
  }

  const copyElement = (e) => {
    cpyelement.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopy('copied!');
  }

  return (
    <div className="container">
      <h4 className='center'>TODO_APP</h4>
      <div className="row">
        {/* <pre>{JSON.stringify(todo)}</pre> */}
        <form className="col s12" >
          <div className="row">
            <div className="input-field col s6" >
              <i className="material-icons prefix">Title</i>
              <input id="icon_prefix" type="text" className="validate" ref={cpyelement} value={todo.title} onChange={e => setTodo({ ...todo, title: e.target.value })} />
              <label htmlFor="icon_prefix">Name</label>
              {/* <a className="prefix" onClick={() => copyElement()}>
              {copy}
                <button className="material-icons btn-floating btn-small waves-effect waves-light">content_copy</button>
              </a> */}
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">description</i>
              <input id="description" type="text" className="validate" value={todo.content} onChange={e => setTodo({ ...todo, content: e.target.value })} />
              <label htmlFor="description">Comments</label>
            </div>

          </div>
          <div className="row">
            {showClear && <button className="wave-effect.waves-effect waves-light btn col" onClick={clear} style={{marginRight:5}}>Clear</button>}
            <button className="wave-effect.waves-effect waves-light btn col" onClick={onSubmithandler}>Submit</button>
          </div>
        </form>
        {!todos ? <Preloader /> : todos.length > 0 ? <ul className="collection">
          {todos.map(todo => <li key={todo.id}
            className="collection-item">
            <div>
              <div className='secondary-content'>
                <a onClick={() => setCurrentId(todo._id)}>
                  <button className="material-icons btn-floating btn-small waves-effect waves-light" style={{marginRight:5}}>create</button>
                </a>
                <a onClick={() => removeTodo(todo._id)}>
                  <button className="material-icons btn-floating btn-small waves-effect waves-light">delete</button>
                </a>
              </div>
              <span>
                <h5>{todo.title}</h5>
                <p>{todo.content}</p>
              </span>
              <p>{Localtime(todo.updatedAt)}</p>
            </div>
          </li>
          )}
        </ul> : <div>Nope!!!</div>}
      </div>
    </div>
  );
}

export default App;
