const mongoose = require('mongoose');
const UserSchema = mongoose.Schema
        (
                {
                        Id: {
                                type: String,
                                required: true
                        },
                        Title: {
                                type: Date,
                                default: Date.now//current date ape
                        },
                        Task: {
                                type: String,
                                required: true
                        }
                }
        );

module.exports = mongoose.model('schema', UserSchema, 'toDoList');//collection name todolist
// 3rd pera is conection name