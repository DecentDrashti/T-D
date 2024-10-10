import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddTo_Do = () => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  
  const addCard = () => {
    setCards([...cards, { id: cards.length + 1, items: [{ id: 1, text: '', completed: false }] }]);
  };

  const handleInputChange = (cardId, itemId, value) => {
    setCards(cards.map(card => 
      card.id === cardId 
        ? { ...card, items: card.items.map(item => item.id === itemId ? { ...item, text: value } : item) } 
        : card
    ));
  };

  const handleEdit = (cardId, itemId) => {
    // You can add edit functionality here if needed
  };

  const handleCheckboxChange = (cardId, itemId) => {
    setCards(cards.map(card => 
      card.id === cardId 
        ? { ...card, items: card.items.map(item => item.id === itemId ? { ...item, completed: !item.completed } : item) } 
        : card
    ));
  };

  const addItem = (cardId) => {
    setCards(cards.map(card =>
      card.id === cardId 
        ? { ...card, items: [...card.items, { id: card.items.length + 1, text: '', completed: false }] }
        : card
    ));
  };

  const addTask = (cardId) => {
    const card = cards.find(card => card.id === cardId);
    if (card.items.some(item => !item.text)) {
      Swal.fire('Oops...', 'All items must have text!', 'error');
    } else {
      axios.post('http://localhost:3001/todos', { card })  // Ensure this URL is correct
        .then(response => {
          console.log('Response data:', response.data);  // Debugging line
          Swal.fire('Success', 'Task added successfully!', 'success').then(() => {
            navigate('/'); // Redirect to MyList page after adding task
          });
        })
        .catch(err => {
          console.error('Error:', err);  // Debugging line
          Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
        });
    }
  };
  


  return (
    <div>
      <h2>Add ToDo</h2>
      <button onClick={addCard}>Add Card</button>
      <div>
        {cards.map(card => (
          <div key={card.id} className="card col-3 mb-3" style={{ width: '20rem', float: 'left' }}>
            <div className="card-body" style={{ backgroundColor: 'blueviolet' }}>
              <h5 className="card-title" style={{ display: 'flex', alignItems: 'center' }}>
                <input type="text" placeholder="Due-Date Here" style={{ flexGrow: 1, marginRight: 10 }} />
                <i className="bi bi-pencil-square" style={{ fontSize: '2.25rem' }} onClick={() => handleEdit(card.id, 0)}></i>
              </h5>
              <div className="card">
                <ul className="list-group list-group-flush">
                  {card.items.map(item => (
                    <li className="list-group-item" key={item.id}>
                      <input 
                        type="checkbox" 
                        id={`item-${card.id}-${item.id}`} 
                        checked={item.completed} 
                        onChange={() => handleCheckboxChange(card.id, item.id)} 
                      />
                      <input 
                        type="text" 
                        value={item.text} 
                        onChange={(e) => handleInputChange(card.id, item.id, e.target.value)}
                        style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
                      />
                      <i className="bi bi-pencil-square" style={{ fontSize: '1.25rem', marginLeft: '10px' }} onClick={() => handleEdit(card.id, item.id)}></i>
                    </li>
                  ))}
                </ul>
                <button onClick={() => addItem(card.id)}>Add Item</button>
                <button onClick={() => addTask(card.id)}>Save Task</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddTo_Do;





// import React, { useState } from 'react';

// function AddTodo() {
//   const [cards, setCards] = useState([]);

//   const addCard = () => {
//     setCards([...cards, { id: cards.length + 1, title: '', task: [] }]);
//   };

//   return (
//     <div>
//       <button onClick={addCard}>Add Card</button>
//       <div>
//         {cards.map(card => (
//           <div key={card.id} className="card col-3 mb-3" style={{ width: '20rem', float: 'left' }}>
//             <div className="card-body" style={{ backgroundColor: 'blueviolet' }}>
//               <h5 className="card-title" style={{ display: 'flex', alignItems: 'center' }}>
//                 <input type="text" placeholder="Due-Date Here" style={{ flexGrow: 1, marginRight: 10 }} />
//                 <i className="bi bi-pencil-square" style={{ fontSize: '2.25rem' }}></i>
//               </h5>
//               <div className="card">
//                 <ul className="list-group list-group-flush">
//                   <li className="list-group-item">
//                     <input type="checkbox" id={`item1-${card.id}`} />
//                     <label htmlFor={`item1-${card.id}`}>An item</label>
//                   </li>
//                   <li className="list-group-item">
//                     <input type="checkbox" id={`item2-${card.id}`} />
//                     <label htmlFor={`item2-${card.id}`}>A second item</label>
//                   </li>
//                   <li className="list-group-item">
//                     <input type="checkbox" id={`item3-${card.id}`} />
//                     <label htmlFor={`item3-${card.id}`}>A third item</label>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AddTodo;


// import { Link, useLocation } from 'react-router-dom';
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import '../styles/AddBook.css';
// import axios from 'axios';

// function AddToDo() {
//     const [data, setData] = useState({ Id: "", Title: "",Task: ""});
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         if (location.state && location.state.todos) {
//             setData(location.state.todos);
//         }
//     }, [location.state]);

//     const handleSubmit = async () => {
//         if (!data.Id || !data.Title || !data.Task ) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: 'Please fill in all the fields!',
//                 confirmButtonColor: '#3085d6',
//                 confirmButtonText: 'Okay'
//             });
//             return;
//         }

//         <div>
//       <button onClick={addCard}>Add Card</button>
//       <div>
//         {cards.map(card => (
//           <div key={card.id} className="card col-3 mb-3" style={{ width: '20rem', float: 'left' }}>
//             <div className="card-body" style={{ backgroundColor: 'blueviolet' }}>
//               <h5 className="card-title" style={{ display: 'flex', alignItems: 'center' }}>
//                 <input type="text" placeholder="Due-Date Here" style={{ flexGrow: 1, marginRight: 10 }} />
//                 <i className="bi bi-pencil-square" style={{ fontSize: '2.25rem' }}></i>
//               </h5>
//               <div className="card">
//                 <ul className="list-group list-group-flush">
//                   <li className="list-group-item">
//                     <input type="checkbox" id={`item1-${card.id}`} />
//                     <label htmlFor={`item1-${card.id}`}>An item</label>
//                   </li>
//                   <li className="list-group-item">
//                     <input type="checkbox" id={`item2-${card.id}`} />
//                     <label htmlFor={`item2-${card.id}`}>A second item</label>
//                   </li>
//                   <li className="list-group-item">
//                     <input type="checkbox" id={`item3-${card.id}`} />
//                     <label htmlFor={`item3-${card.id}`}>A third item</label>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>

//         const apiUrl = location.state && location.state.todos
//             ? http://localhost:3001/todos/${data.Id} 
//             : "http://localhost:3001/todos";  


//         try {
//             const response = await axios({
//                 method: location.state && location.state.todos ? "put" : "post",
//                 url: apiUrl,
//                 data: data,
//                 headers: { "Content-Type": "application/json" }
//             });

//             Swal.fire({
//                 icon: 'success',
//                 title: location.state && location.state.todos ? 'Updated!' : 'Submitted!',
//                 text: location.state && location.state.todos ? 'todos details updated successfully!' : 'Book details submitted successfully!',
//                 showConfirmButton: true,
//                 confirmButtonColor: '#28a745',
//                 confirmButtonText: 'Great!'
//             }).then(() => {
//                 navigate('/todos');
//             });
//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: 'There was an error submitting your data. Please try again.',
//                 confirmButtonColor: '#3085d6',
//                 confirmButtonText: 'Okay'
//             });
//         }
//     };

//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter') {
//             const form = e.target.form;
//             const index = Array.prototype.indexOf.call(form, e.target);
//             form.elements[index + 1]?.focus();
//             e.preventDefault();
//         }
//     };

//     return (
//         <>
//             <div className='backtohome' style={{ margin: '20px' }}>
//                 <Link to="/" className="back-button">
//                     Back to Home
//                 </Link>
//             </div>
//             <div className="container mt-3 d-flex justify-content-center">
//                 <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "600px", border: 'none', backgroundColor: '#1e1e2f' }}>
//                     <div className="text-center fs-3 mb-4 text-light">{location.state && location.state.todos ? 'Edit todos Details' : 'Enter todos Details'}</div>

//                     <form>
//                         <div className="form-group mb-3">
//                             <label htmlFor="text2" className="form-label text-light"> Id</label>
//                             <input
//                                 value={data.Id}
//                                 onChange={(e) => setData({ ...data, Id: e.target.value })}
//                                 onKeyDown={handleKeyDown}
//                                 type="text"
//                                 className="form-control shadow-sm"
//                                 placeholder="Enter Book ID"
//                             />
//                         </div>

//                         <div className="form-group mb-3">
//                             <label htmlFor="text1" className="form-label text-light">Title</label>
//                             <input
//                                 value={data.Title}
//                                 onChange={(e) => setData({ ...data, Title: e.target.value })}
//                                 onKeyDown={handleKeyDown}
//                                 type="text"
//                                 className="form-control shadow-sm"
//                                 placeholder="Enter your date here"
//                             />
//                         </div>

//                         <div className="form-group mb-3">
//                             <label htmlFor="text3" className="form-label text-light">Tasks</label>
//                             <input
//                                 value={data.Tasks}
//                                 onChange={(e) => setData({ ...data, Task: e.target.value })}
//                                 onKeyDown={handleKeyDown}
//                                 type="text"
//                                 className="form-control shadow-sm"
//                                 placeholder="Enter your tasks here "
//                             />
//                         </div>

//                         {/* <div className="form-group mb-4">
//                             <label htmlFor="text4" className="form-label text-light">Description</label>
//                             <input
//                                 value={data.description}
//                                 onChange={(e) => setData({ ...data, description: e.target.value })}
//                                 onKeyDown={handleKeyDown}
//                                 type="text"
//                                 className="form-control shadow-sm"
//                                 placeholder="Enter description"
//                             />
//                         </div> */}

//                         <div className="text-center">
//                             <button
//                                 onClick={handleSubmit}
//                                 className="btn btn-success px-4 py-2 shadow"
//                                 type="button">
//                                 {location.state && location.state.todos ? 'Update' : 'Submit'}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// }
// export default AddToDo;

