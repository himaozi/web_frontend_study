const router = require('koa-router')()
const TodoItem = require('../models/todoItem')

const successResponse = { code: 1, messgae: 'success' }
const failureResponse = { code: 0, messgae: 'failure' }
router.post('todo-item', async (ctx, next) => {
  const todoItem = new TodoItem(ctx.request.body)
  console.log('wait to saved:' + todoItem)
  // 没有等待直接返回了... 收到的响应为 Not Found
  todoItem.save((err) => {
    if (err) {
      console.error('save failure: ' + err)
      ctx.response.body = failureResponse
    } else {
      console.log('save success: ' + todoItem._id)
      // response还没有设置，就直接返回了
      ctx.response.body = successResponse
    }
  })
  await next()
})

router.put('todo-item', async (ctx, next) => {
  const body = ctx.request.body
  await TodoItem.findByIdAndUpdate(body.id, { star: body.star, completed: body.completed }).exec().then(console.log)
  ctx.response.body = successResponse
  await next()
})

router.get('todo-items', async (ctx, next) => {
  await TodoItem.find({}).exec().then(function (todoItems) {
    successResponse.data = todoItems
    ctx.response.body = successResponse
    // 这里成功打印数据
    console.log(successResponse)
  })
  // 响应 not found
  await next()
})

router.get('todo-item', async (ctx, next) => {
  ctx.response.body = { messgae: 'get' }
  await next()
})

router.del('todo-item', async (ctx, next) => {
  const id = ctx.request.body
  console.log('wait to delete: ' + id)
  TodoItem.findOneAndDelete({ _id: id })
  ctx.response.body = successResponse
  await next()
})

module.exports = router
