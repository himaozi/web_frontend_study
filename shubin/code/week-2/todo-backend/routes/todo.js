const router = require('koa-router')()
const TodoItem = require('../models/todoItem')

const successResponse = {
  code: 1,
  messgae: 'success',
  data: {
    rows: []
  }
}

// 处理跨域预检请求
router.options('todo-item', 'todo-item/:itemId', (ctx, next) => {
  ctx.response.body = successResponse
  ctx.response.set('Access-Control-Allow-Origin', '*')
  ctx.response.set('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE')
  ctx.response.set('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type')
})

router.post('todo-item', async (ctx, next) => {
  const todoItem = new TodoItem(ctx.request.body)
  console.log('wait to saved:' + todoItem)
  await todoItem.save().then(
    (response) => {
      ctx.response.body = successResponse

      ctx.response.set('Access-Control-Allow-Origin', '*')
    }
  )
  console.log('saved:' + todoItem)
})

router.put('todo-item', async (ctx, next) => {
  const body = ctx.request.body
  await TodoItem.findOneAndUpdate({ id: body.id }, { star: body.star, completed: body.completed })
    .exec()
    .then((res) => {
      console.log('update result: ', res)
      ctx.response.body = successResponse
      // 为什么需要了预检请求还让要下面的请求也设置一次？
      ctx.response.set('Access-Control-Allow-Origin', '*')
    })
})

router.get('todo-items', async (ctx, next) => {
  await TodoItem.find({}).exec().then(res => {
    successResponse.data.rows = res
    ctx.response.body = successResponse
    ctx.response.set('Access-Control-Allow-Origin', '*')
  })
})

router.get('todo-item/:itemId', async (ctx, next) => {
  await TodoItem.findOne({ id: ctx.params.itemId }).then(res => {
    ctx.response.body = res
    ctx.response.set('Access-Control-Allow-Origin', '*')
  })
})

// 如果只有 ctx 则无法获取到body的内容;
// http delete 不能接受参数
router.del('todo-item/:itemId', async (ctx, next) => {
  const id = ctx.request.params.itemId
  console.log('wait to delete: ' + id)
  await TodoItem.findOneAndDelete({ id: id }).then(res => {
    ctx.response.body = successResponse
    ctx.response.set('Access-Control-Allow-Origin', '*')
    console.log('delete success: ' + id)
  })
})

module.exports = router
