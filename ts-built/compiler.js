"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const watcher_1 = __importDefault(require("./watcher"));
class compiler {
    constructor(Context) {
        this.context = Context;
        this.$el = this.context.$el;
        this.$data = this.context.$data;
        this.$methods = this.context.$methods;
        if (this.context.$el) {
            //compile the template
            let temp = this.Node2Fragement(this.$el);
            // if the return val is void , the function should be ended
            if (!temp)
                return;
            var fragemnet = temp;
            this.compile(fragemnet);
        }
    }
    compile(node) {
        if (node.childNodes && node.childNodes.length) {
            node.childNodes.forEach(child => {
                if (child.nodeType === 1) //element nodes:
                 {
                    //TODO: instructions
                    let attrs = [...child.attributes];
                    attrs.forEach(attr => {
                        let { name: attrname, value: attrValue } = attr;
                        if (attrname.indexOf("v-") === 0) {
                            let dirname = attrname.slice(2);
                            switch (dirname) {
                                case "text":
                                    new watcher_1.default(attrValue, this.context, newVal => {
                                        child.textContent = newVal;
                                    });
                                    break;
                                case "model":
                                    new watcher_1.default(attrValue, this.context, newVal => {
                                        child.value = newVal;
                                    });
                                    child.addEventListener("input", e => {
                                        this.context[attrValue] = e.target.value;
                                    });
                                    break;
                            }
                        }
                        if (attrname.indexOf("@") === 0) {
                            this.compileMethods(this.context, child, attrname, attrValue);
                        }
                    });
                    this.compile(child);
                }
                else if (child.NodeType === 3) //text nodes
                 {
                    let text = child.textContent.trim(); //trim() filter the white space ahead and behind
                    if (text) {
                        //step1.trannsfer string into expression
                        //step2.add SUB and PUB here
                        //完成 Model -> View 的响应式
                        let exp = this.Text2Exp(text);
                        new watcher_1.default(exp, this.context, (newVal) => {
                            child.textContent = newVal;
                        });
                    }
                }
            });
        }
    }
    Node2Fragement(node) {
        var fragemnet = document.createDocumentFragment();
        //if and only if the node include other nodes
        if (node.childNodes && node.childNodes.length) {
            node.childNodes.forEach(child => {
                if (!this.ingore(child)) {
                    //here has a side effect , caused be function below:appendChild, which will shift child from origin document
                    fragemnet.appendChild(child);
                }
            });
            return fragemnet;
        }
    }
    /**
     *
     * @param node
     * @returns boolean
     * NodeType === 8 means this is a commment , we ignore
     * NodeType === 1 means this is an text elemnet , if the element is a "Enter" , we ignore
     */
    ingore(node) {
        var reg = /^[\t\n\r]+/;
        return (node.nodeType === 8 || (node.nodeType === 3 && reg.test(node.textContent)));
        return false;
    }
    Text2Exp(text) {
        //reg exp:
        let regText = /\{\{(.+?)\}\}/g;
        //split the exp
        let pices = text.split(regText);
        //match the exp
        let matches = text.match(regText);
        //tokens are the matched exp
        var tokens = [];
        pices.forEach(item => {
            if (matches && matches.indexOf("{{" + item + "}}") > -1) {
                tokens.push("(" + item + ")");
            }
            else
                tokens.push("`" + item + "`");
        });
        return tokens.join("+");
    }
    compileMethods(scope, node, attrName, attrValue) {
        let type = attrName.slice(1);
        let fn = scope[attrValue];
        node.addEventListener(type, fn.bind(scope));
    }
}
exports.default = compiler;
