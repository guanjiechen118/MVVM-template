"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dep_1 = __importDefault(require("./dep"));
class Observer {
    constructor(context) {
        this.data = context;
        //search all the obeject and proxy them
        this.dep = new dep_1.default();
        if (this.data)
            this._ProxyData(this.data);
    }
    _ProxyData(data) {
        //the type check will ensure the data is not empty or not "object"
        Object.keys(data).forEach(item => {
            //here to proxy the data
            Object.defineProperty(data, item, {
                enumerable: true,
                configurable: false,
                get: () => {
                    // get the origin val
                    if (dep_1.default.target)
                        this.dep.AddSub(dep_1.default.target);
                    return data[item];
                },
                set: value => {
                    // set a new val to data[item]
                    data[item] = value;
                    //active the update of view
                    this.dep.notify();
                }
            });
            //层层遍历，直到遍历完当前object对象
            if (typeof data[item] === "object" && data[item])
                this._ProxyData(data[item]);
        });
    }
}
exports.default = Observer;
