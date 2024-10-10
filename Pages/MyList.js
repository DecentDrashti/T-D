import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function MyList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get('http://localhost:3001/todos');
            setData(response.data);
        };

        fetch();
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this task?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3001/todos/${id}`)
                    .then(() => {
                        setData(data.filter(item => item._id !== id));
                        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
                    })
                    .catch(err => Swal.fire('Error!', 'Something went wrong.', 'error'));
            }
        });
    };

    return (
        <div>
            <h2>My ToDo List</h2>
            <div className="todo-grid">
                {data.map(task => (
                    <div className="card" style={{ width: '18rem' }} key={task._id}>
                        <div className="card-body">
                            <h5 className="card-title">{task.description}</h5>
                            <p className="card-text">{new Date(task.date).toLocaleDateString()}</p>
                            <button className="btn btn-danger" onClick={() => handleDelete(task._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <Link to="/addtodo" className="btn btn-primary">Add New Task</Link>
        </div>
    );
}

export default MyList;




// const todos = [
//     { id: 1, text: 'Learn React', completed: false },
//     { id: 2, text: 'Build a To-Do App', completed: true },
//     { id: 3, text: 'Master JavaScript', completed: false },
// ];

// return (
//     <div>
//         <h2>My To-Do List</h2>
//         <ul>
//             {todos.map(todo => (
//                 <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
//                     {todo.text}
//                 </li>
//             ))}
//         </ul>
//     </div>
