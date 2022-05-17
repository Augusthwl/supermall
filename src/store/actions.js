
export default {
    addCart(context, payload){
        return new Promise((resolve, reject) =>{
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            if(oldProduct){//商品数量加一
                context.commit('addCounter', oldProduct)
                resolve('商品数量+1')
            }else{//添加新的商品
                payload.count = 1
                context.commit('addToCart', payload)
                resolve('购物车添加成功！')
            }
        })

    }    
}