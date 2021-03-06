import Toast from './Toast'
const obj = {}
obj.install = function(Vue){//默认传入 Vue
    //1. 创建组件构造器
    const toastContrustor = Vue.extend(Toast)
    
    //2. new 的方式，根据组件构造器，可以创建出来一个组件对象
    const toast = new toastContrustor()

    //3.将该组件对象手动挂载到某一个 div 上
    toast.$mount(document.createElement('div'))

    //4. toast.$el 对应的就是上面创建的 div
    document.body.appendChild(toast.$el)

    //5. 添加到原型
    Vue.prototype.$toast = toast
}

export default obj