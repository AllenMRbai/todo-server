const costDao=require('../daos/costDao')
const {APIError}=require('../middlewares/rest')

const costService={
    async addCost(ctx,cost){
        return await costDao.addCost(cost);
    }
}


module.exports=costService;