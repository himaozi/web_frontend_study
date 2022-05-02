// 1. import
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/db_todo')

// 定义model document
const Cat = mongoose.model('Cat', { name: String })

const kitty = new Cat({ name: 'Shubin' })

kitty.save(function (err) {
  if (err) {
    console.log('save error:' + err)
  }
  console.log('save success')
})
