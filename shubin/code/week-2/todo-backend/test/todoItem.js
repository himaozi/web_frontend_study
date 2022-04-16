const { default: mongoose } = require('mongoose')
const TodoItem = require('../models/todoItem')

mongoose.connect('mongodb://127.0.0.1/db_todo')
// const todoItem = new TodoItem({ message: 'text' })
// todoItem.save((error) => {
//   if (error) {
//     console.error('save error:' + todoItem)
//   } else {
//     console.log('save success:' + todoItem)
//   }
// })
// TodoItem.find({ message: 'text' }, function (err, docs) {
//   if (err) {
//     console.log(docs)
//   }
// }).exec()
// Promise API 不熟悉
// TodoItem.find({ message: 'text' }).exec().then(function (todoItems) {
//   console.log(todoItems)
// })

// TodoItem.deleteOne({ _id: '625abb3aa600101b402ef161' }).exec().then(
//   (err) => console.log(err)
// )

TodoItem.findByIdAndUpdate('625abb0d22aa3ed593dfc2be', { star: true, completed: true }).exec().then(
  (err) => console.log(err)
)
