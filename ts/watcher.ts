import Dep from "./dep";

var $uid:number = 0
export default class Watcher{
    id:number;
    exp:any;
    scope:any;
    callback:any;
    constructor(exp,scope,callback)
    {
        this.exp = exp
        this.scope = scope
        this.callback = callback
        this.id = $uid++
        this.update()
    }
    /**
     * calculate the exp
     */
    get(){
        //set the flag os Dep.target , it will be added to subs later at observer
        Dep.target = this
        //in compteExpression, it will execute get() anyway,thus,in observer ,
        let newVal = Watcher.computeExpression(this.exp,this.scope)
        Dep.target = null
        return newVal
    }
    /**
     * update and execute callback
     */
    update(){
        let newVal = this.get();
        if(this.callback)
        this.callback(newVal)
    }

    static computeExpression(exp,scope){
        //the data is proxyed by obsever
        //when use the data in scope , it will execute get() function in Obsever
        // console.log("exp:")
        // console.log(exp)
        // console.log("scope:")
        // console.log(scope)
        let fn = new Function("scope ", "with(scope){return " + exp + "}");
        return fn(scope)
    }
}