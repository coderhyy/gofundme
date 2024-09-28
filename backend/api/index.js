const Router = require('koa-router');
const Model = require('../lib/mysql');
const router = new Router();

// 通用响应处理函数
const handleResponse = (ctx, result, successMsg, errorMsg) => {
  if (result && result.length) {
    ctx.body = {
      data: result,
      total: result.length,
      msg: successMsg
    };
  } else {
    ctx.body = {
      data: null,
      msg: errorMsg
    };
  }
};

// 错误处理中间件
const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error('operation error:', err);
    ctx.status = err.status || 500;
    ctx.body = {
      msg: 'operation failed'
    };
  }
};

// 查询所有的筹款人
router.get('/api/allFundraiser', errorHandler, async (ctx) => {
  const result = await Model.allFundraiser(ctx.query);
  handleResponse(ctx, result, 'query success', 'no data');
});

// 根据 FUNDRAISER_ID 查询特定的筹款人
router.get('/api/fundraiser/:id', errorHandler, async (ctx) => {
  const fundraiserId = ctx.params.id;
  const result = await Model.findFundraiserById(fundraiserId);
  handleResponse(ctx, result, 'query success', 'no data')
});

// 查询所有类别
router.get('/api/allCategories', errorHandler, async (ctx) => {
  const result = await Model.allCategories();
  handleResponse(ctx, result, 'query success', 'no data');
});

module.exports = router;