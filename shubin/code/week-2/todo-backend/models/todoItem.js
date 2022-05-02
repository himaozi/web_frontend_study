const Mongoose = require('mongoose')
// 定义结构
const TodoItemSchema = new Mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  star: {
    type: Boolean,
    required: true,
    default: false
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  }
})

Mongoose.connect('mongodb://127.0.0.1/db_todo')
// 定义模型
const TodoItem = Mongoose.model('TodoItem', TodoItemSchema)
// 暴露给外部
module.exports = TodoItem
