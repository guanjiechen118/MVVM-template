"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Dep {
    constructor() {
        //save all the Watcher
        this.subs = {};
    }
    AddSub(target) {
        this.subs[target.id] = target;
    }
    notify() {
        this.subs.forEach(id => {
            this.subs[id].update();
        });
    }
}
exports.default = Dep;
//target is used to notify if there is new target to be added to subs
//if target is set to be null,it won't active the update of subs
//verse, it will update subs
//target will be set at watcher,subs will be updated at observer
Dep.target = null;
