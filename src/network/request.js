import axios from 'axios'

export function request(config){
    //1.创建 axios 的实例
    const instance = axios.create({
      baseURL:'http://123.207.32.32:8000',
      timeout: 5000
    })
    //2.axios 拦截器分为，全局拦截：axios.interceptors 以及实例拦截：instance.interceptors
    instance.interceptors.request.use(config => {//请求成功发送时
      //使用情况：
      // 1.比如 config中的一些信息不符合服务器的请求时，需要进行配置
      // 2.在请求过程中加入一些动画：请求中……
      // 3.某些网络请求（登录 token），必须携带一些特殊信息， 如果没有携带，可以拦截跳转到登录界面
      return config //拦截下来之后，还需要将请求返回出去
    }, err => {//发送请求失败
      console.log('发送请求失败');
      console.log(err)
    })
    instance.interceptors.response.use(res =>{//请求成功响应时
      //拦截到结果后进行一些处理
      return res.data //将最终结果返回
    }, err =>{//请求没有成功响应时
      console.log(err);
    })
    //发送真正的网络请求
     return instance(config)
  }