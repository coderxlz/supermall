import axios from 'axios'

export function request(config){

//  创建axios实例对象
  const instance1 = axios.create({
    baseURL:'http://152.136.185.210:8000/api/w6',
    timeout:5000
  })

  instance1.interceptors.request.use((req) => {
      console.log('拦截到request');
      return req;
  },
    (error => {
      console.log('请求失败');
    }))

  instance1.interceptors.response.use(rep => {
      console.log('拦截到response');
      return rep;
  },
    error => {
      console.log("响应失败");
    })

  return instance1(config);
}

