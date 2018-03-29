const {APIError}=require('../../middlewares/rest')
const costService=require('../../services/costService')

//添加
const addCost = async (ctx, next) => {
    let cost={}

    let result=await costService.addCostList(ctx,cost)
    if(result){
        ctx.rest({result})
    }else{
        throw new APIError('data:add_data_fail', '数据添加失败');
    }
};



module.exports = {
    'POST /api/cost': addCost,
    // 'PUT /api/cost': updateCost,
    // 'GET /api/cost': getCost,
    //'post /api/signUp': signUp,
};