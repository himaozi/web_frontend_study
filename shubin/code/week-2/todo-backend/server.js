const Koa = require('koa')
const koaBody = require('koa-body')
const router = require('koa-router')()
const index = require('./routes/index')
const todo = require('./routes/todo')
const app = new Koa()

// 中间件栈， 最外层最先调用但最后返回
const logHander = async (ctx, next) => {
  // todo Request | 1649779047718 | /main | data: undefined

  console.log(`Request  | ${Date.now()} | ${ctx.request.path} | data: ${ctx.request.body ? 'empty' : ctx.request.body}`)
  next()
  console.log(`Response | ${Date.now()} | ${ctx.request.path} | data: ${ctx.response.body}`)
}

const errorHandler = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500
    ctx.response.body = {
      message: err.message
    }
  }
}
router.use('/index', index.routes(), index.allowedMethods())
// 子路由的路径就不需要加入'/'了
router.use('/', todo.routes(), todo.allowedMethods())
app.use(errorHandler)
app.use(logHander)
app.use(koaBody())
app.use(router.routes())
app.listen(3000)
