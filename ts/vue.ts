import compiler from "./compiler";
import Observer from "./observer"
class Vue{
    $el:any;
    $data:any;
    $methods:any;
    constructor(options){
        //获取dom对象
        console.log(options)
        this.$el = document.querySelector(options.el)
        //转存数据
        this.$data = options.data||{}
        this.$methods = options.methods?options.methods:{}
        //数据代理
        this._ProxyData(this.$data)
        this._ProxyMethods(this.$methods)
        //数据劫持
        new Observer(this.$data)
        //模板编译
        new compiler(this)
    }

    _ProxyData(data:object){
        Object.keys(data).forEach(key => {
            Object.defineProperty(this,key,{
                set(val){
                    data[key] = val
                },
                get(){
                    return data[key]
                }
            })
        })
    }

    _ProxyMethods(methods:object){
        Object.keys(methods).forEach(key => {
            this[key] = methods[key];
        })
    }

}

declare global {  //设置全局属性
    interface Window {  //window对象属性
      Vue: any;   //加入对象
    }
  }
  window.Vue=Vue //不报错
  