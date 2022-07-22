"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compiler_1 = __importDefault(require("./compiler"));
const observer_1 = __importDefault(require("./observer"));
class Vue {
    constructor(options) {
        //获取dom对象
        this.$el = document.querySelector(options.$el);
        //转存数据
        this.$data = options.$data ? options.$data : {};
        this.$methods = options.$methods ? options.$methods : {};
        //数据代理
        this._ProxyData(this.$data);
        this._ProxyMethods(this.$methods);
        //数据劫持
        new observer_1.default(this.$data);
        //模板编译
        new compiler_1.default(this);
    }
    _ProxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                set(val) {
                    data[key] = val;
                },
                get() {
                    return data[key];
                }
            });
        });
    }
    _ProxyMethods(methods) {
        Object.keys(methods).forEach(key => {
            this[key] = methods[key];
        });
    }
}
