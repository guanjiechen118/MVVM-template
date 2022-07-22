export default class Dep {
    subs: any
    //target is used to notify if there is new target to be added to subs
    //if target is set to be null,it won't active the update of subs
    //verse, it will update subs
    //target will be set at watcher,subs will be updated at observer
    static target: any = null
    constructor() {
        //save all the Watcher
        this.subs = {}

    }


    /**
     * 将对象加入订阅者中
     * @param target the varity to be added
     */
    AddSub(target) {
        this.subs[target.id] = target
    }

    /*
    *将订阅者全部唤醒并更新
    */
    notify() {
        console.log("subs:")
        console.log(this.subs)
        for (let uid in this.subs) {
            this.subs[uid].update()
        }
    }
}