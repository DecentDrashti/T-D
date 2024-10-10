const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const schema = require('./schema');

const app = express();
app.use(cors({
  origin: '*', // Allow all origins for testing purposes
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Get all tasks
app.get('/todos', async (req, res) => {
  try {
    const todos = await schema.find();
    res.send(todos);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch tasks' });
  }
});

// Get task by ID
app.get('/todos/:id', async (req, res) => {
  try {
    const todo = await schema.findOne({ _id: req.params.id });
    res.send(todo);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch task' });
  }
});

// Add a new task
app.post('/todos', async (req, res) => {
  try {
    const newTodo = new schema({ ...req.body });
    const savedTodo = await newTodo.save();
    res.send(savedTodo);
  } catch (err) {
    res.status(500).send({ error: 'Failed to add task' });
  }
});

// Update a task by ID
app.put('/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await schema.findOneAndUpdate(
      { _id: req.params.id }, req.body, { new: true }
    );
    res.send(updatedTodo);
  } catch (err) {
    res.status(500).send({ error: 'Failed to update task' });
  }
});

// Delete a task by ID
app.delete('/todos/:id', async (req, res) => {
  try {
    await schema.deleteOne({ _id: req.params.id });
    res.send({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to delete task' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb+srv://Drashti:drashti2305@cluster0.cgje9.mongodb.net/todo', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch


//const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const UserModel = require('./schema.js');
// const bodyParser = require('body-parser')
// const cores=require('cors');
// const my_note = require('./schema.js');
    
//     mongoose.connect('mongodb+srv://Drashti:drashti2305@cluster0.cgje9.mongodb.net/my_note')
//     .then(console.log("database connected"));
//     // after .net/ database name 

//     app.use(bodyParser.json());
//     app.use(cores());
    
//     //create
//     app.post('/notes',async(req,res)=>{
//         note = new UserModel ({...req.body});
//         const ans = await note.save();
//         res.send();
//     })

//     //get all notes 
//     app.get('/notes',async(req,res)=>{
//         const ans = await UserModel.find();
//         res.send(ans);
//     })


//     //get by id
//     app.get('/notes/:id',async (req,res)=>{
//         const ans = await my_note.findOne({
//             id:req.params.id
//         });
//         res.send(ans);
//     });

//     //delete by id
//     app.delete('/notes/:id',async (req,res)=>{
//         const ans = await my_note.deleteOne({
//             id:req.params.id
//         });
//         res.send(ans);
//     });
    
//     //update  by id 
//     app.patch('/notes/:id',async (req,res)=>{
//         const ans = await my_note.findOne({
//             id:req.params.id
//         });
//         res.send(ans);
//     });

// app.listen(3008,()=>{
//     console.log('server started @ 3008')
// })