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
  }else if(result.affectedRows > 0){
    // 如果 result 是 OkPacket（INSERT/UPDATE/DELETE 的执行结果）
    ctx.body = {
      data: null,
      msg: successMsg
    };
  }else {
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

router.get('/api/donationForFundraiser/:id',errorHandler, async (ctx) =>{
  const fundraiserId = ctx.params.id;
  const result = await Model.findDonationbyFundraiserId(fundraiserId);
  handleResponse(ctx, result, 'query success', 'no data')
});
router.post('/api/addDonation', errorHandler, async (ctx) => {
  list = ctx.request.body;
  var values = [list.DATE,list.AMOUNT,list.GIVER,list.FUNDRAISER_ID];
  const result = Model.insertDonationForFundraiser(values)
  handleResponse(ctx, result, 'insert success', 'no data');
});

router.post('/api/addFundraiser', errorHandler, async(ctx) => {
  list = ctx.request.body;
  var values = [list.ORGANIZER,list.CAPTION,list.TARGET_FUNDING,list.CURRENT_FUNDING,list.CITY,list.ACTIVE,list.CATEGORY_ID];
  const result = Model.insertFundraiser(values)
  handleResponse(ctx, result, 'insert success', 'no data');
});

router.put('/api/updateFundraiser/:id', errorHandler, async(ctx) => {
  list = ctx.request.body;
  const fundraiserId = ctx.params.id
  var values = [list.ORGANIZER,list.CAPTION,list.TARGET_FUNDING,list.CURRENT_FUNDING,list.CITY,list.ACTIVE,list.CATEGORY_ID,fundraiserId];
  const result = Model.updateFundraiser(values)
  handleResponse(ctx, result, 'update success', 'no data');
});

router.delete('/api/deleteFundraiser/:id', errorHandler, async(ctx) => {
  const fundraiserId = ctx.params.id
  const donationCheck = await Model.findDonationbyFundraiserId(fundraiserId);
  if (donationCheck.length > 0) {
    // If donations exist, respond with an error message
    ctx.status = 400;
    ctx.body = {
      msg: 'Cannot delete fundraiser with existing donations.'
    };
  }else{
    result= await Model.deleteFundraiser(fundraiserId);
    handleResponse(ctx, result, 'delelte success', 'no data');
  }
})
module.exports = router;