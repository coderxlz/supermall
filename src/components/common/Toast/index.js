import Toast from "./Toast";
const obj = {}

//存在默认参数vue对象
obj.install = function (vue){
  console.log('toast install');

  //1.创建组件构造器
  const toastConstructor = vue.extend(Toast);

  //2.根据组件构造器，创建出一个组件对象
  const toast = new toastConstructor();

  //3.将组件对象手动挂载到一个元素之上
  toast.$mount(document.createElement('div'));

  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el);

  vue.prototype.$toast = toast;
}

export default obj;