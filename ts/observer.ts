import Dep from "./dep"

// 进行数据劫持

export default class Observer {
    data: any
    constructor(data) {
        this.data = data
        // 遍历对象完成所有数据的劫持
        this.walk(this.data)
    }

    /**
     * 遍历对象，劫持全部数据
     * @param {*} data 
     */
    walk(data:object|null) {
        if (!data) { // 递归结束条件
            return
        }
        //劫持数据，绑定关系
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }

    /**
     * 动态设置响应式数据
     * @param {*} data 
     * @param {*} key 
     * @param {*} value 
     */
    defineReactive(data, key, value) {
        let dep = new Dep()
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get: () => {
                Dep.target && dep.AddSub(Dep.target)
                return value;
            },
            set: newValue => {
                console.log('set')
                value = newValue;
                dep.notify()
            }
        })
        this.walk(value)// 为了完成递归遍历
    }
}