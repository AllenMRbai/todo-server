const {APIError}=require('../../middlewares/rest')

const getProduct = async (ctx, next) => {
    let id = ctx.params.id;
    let pro;
    for(let p of mockDB.products){
        if(p.id==id){
            pro=p;
            break;
        }
    }
    if(pro){
        ctx.rest(pro)
    }else{
        throw new APIError('pro:pro_not_found', 'product not found');
    }
};

//假数据库
const mockDB={
    products:[
        {
            id:123,
            name:'iphone X',
            price:9666
        }
    ]
}
module.exports = {
    'GET /api/product/:id': getProduct
};