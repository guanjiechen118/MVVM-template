"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dep_1 = __importDefault(require("./dep"));
var $uid = 0;
class Watcher {
    constructor(exp, scope, callback) {
        this.exp = exp;
        this.scope = scope;
        this.callback = callback;
        this.id = $uid++;
        this.update();
    }
    /**
     * calculate the exp
     */
    get() {
        //set the flag os Dep.target , it will be added to subs later at observer
        dep_1.default.target = this;
        //in compteExpression, it will execute get() anyway,thus,in observer ,
        let newVal = Watcher.computeExpression(this.exp, this.scope);
        dep_1.default.target = null;
        return newVal;
    }
    /**
     * update and execute callback
     */
    update() {
        let newVal = this.get();
        if (this.callback)
            this.callback(newVal);
    }
    static computeExpression(exp, scope) {
        //the data is proxyed by obsever
        //when use the data in scope , it will execute get() function in Obsever
        let fn = new Function("scope ", "with(scope){return" + exp + "}");
        return fn(scope);
    }
}
exports.default = Watcher;
