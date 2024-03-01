// import React, { useEffect, useState} from 'react';
// import { createTodo, readTodos } from './functions';
// import { deleteTodo, updateTodo } from './api';
// import M from 'materialize-css';

// function DropDown({ onEdit , todoId}) {
//     useEffect(() => {
//         // Initialize dropdown when component mounts
//         const options = {}; // Add any options you need
//         const elems = document.querySelectorAll('.dropdown-trigger');
//         const instances = M.Dropdown.init(elems, options);

//         // Clean up function to remove any event listeners or clean up any resources
//         return () => {
//             // Destroy the initialized dropdown instances when the component unmounts
//             instances.forEach((instance) => {
//                 instance.destroy();
//             });
//         };
//     }, []); // Empty dependency array ensures this effect runs only once after the component mounts

//     return (
//         <div>
//             <button className="material-icons btn-floating btn-small waves-effect waves-light dropdown-trigger btn secondary-content" href="#" data-target='dropdown1'>more_vert</button>
//             {/* <a className=' btn' href='#' data-target='dropdown1'>Drop Me!</a> */}
//             <ul id='dropdown1' className='dropdown-content'>
//                 <li><a href='#!' onClick={() => { onEdit(todoId) }}>Edit</a></li>
//                 <li><a href="#!">Copy</a></li>
//                 <li><a href="#!" >Delete</a></li>
//                 {/* <li className="divider" tabIndex="-1"></li>
//                 <li><a href="#!">three</a></li>
//                 <li><a href="#!"><i className="material-icons">view_module</i>four</a></li>
//                 <li><a href="#!"><i className="material-icons">cloud</i>five</a></li> */}
//             </ul>
//         </div>
//     );
// }

// export default DropDown;