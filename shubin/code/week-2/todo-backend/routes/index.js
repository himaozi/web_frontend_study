const router = require('koa-router')()
router.get('/hello', async function (ctx, next) {
  ctx.response.body = { name: 'lishubin' }
  await next()
})
module.exports = router
