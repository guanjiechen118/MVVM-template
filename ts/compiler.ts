import Watcher from "./watcher"

export default class compiler {
    $el: any
    $data: any
    $methods: any
    context: any
    constructor(Context) {
        this.context = Context
        this.$el = this.context.$el
        this.$data = this.context.$data
        this.$methods = this.context.$methods
        if (this.context.$el) {
            //compile the template
            let temp = this.Node2Fragement(this.$el)
            // if the return val is void , the function should be ended
            if (!temp) {
                console.log("Fragement is empty")
                return
            }
            var fragemnet = temp
            this.compile(fragemnet)
            this.$el.appendChild(fragemnet)
        }

    }
    /**
     * it deal node by two case:
     * case1-node is element
     * case2-node is text
     * @param node node is the object of DocumentFragment
     */
    compile(node: any) {
        var that = this
        if (node.childNodes && node.childNodes.length) {
            node.childNodes.forEach(child => {
                if (child.nodeType === 1)//element nodes:
                {
                    //read and deal instructions in "Deal Attributes"
                    //view->model的响应式在v-model中实现
                    this.DealAttributes(child)
                    this.compile(child)
                }
                else//text nodes
                {
                    let text = child.textContent.trim();//trim() filter the white space ahead and behind
                    console.log(text)
                    if (text) {
                        //step1.trannsfer string into expression
                        let exp = this.Text2Exp(text)
                        //step2.add SUB and PUB here
                        new Watcher(exp, this.context, (newVal) => {
                            child.textContent = newVal
                        })
                        //完成 Model -> View 的响应式
                    }
                }
            })
        }
    }
    /**
     * 
     * @param node Node type varity
     * @returns Fragement varity
     */
    Node2Fragement(node: Node) {
        var fragemnet: any = document.createDocumentFragment();
        //if and only if the node include other nodes
        if (node.childNodes && node.childNodes.length) {
            node.childNodes.forEach(child => {
                if (!this.ingore(child)) {
                    //here has a side effect , caused be function below:appendChild, which will shift child from origin document
                    fragemnet.appendChild(child);
                }
            })
            return fragemnet
        }
    }

    /**
     * @param node 
     * @returns boolean
     * NodeType === 8 means this is a commment , we ignore
     * NodeType === 1 means this is an text elemnet , if the element is a "Enter" , we ignore
     */
    ingore(node: Node): boolean {
        var reg: any = /^[\t\n\r]+/;
        return (
            node.nodeType === 8 || (node.nodeType === 3 && reg.test(node.textContent))
        )
    }

    /**
     * 
     * @param text string type
     * @returns a formed string:exp
     */
    Text2Exp(text: string) {
        //reg exp:
        let regText = /\{\{(.+?)\}\}/g;
        //split the exp
        let pices = text.split(regText)
        //match the exp
        let matches = text.match(regText)
        //tokens are the matched exp
        var tokens: any[] = []

        pices.forEach(item => {
            if (matches && matches.indexOf("{{" + item + "}}") > -1) {
                tokens.push("(" + item + ")");
            }
            else
                tokens.push("`" + item + "`")

        })
        console.log("tokens joint:")
        console.log(tokens.join("+"))
        return tokens.join("+")
    }

    /**
     * 编译Method的模板
     * @param scope 作用域
     * @param node 作用节点
     * @param attrName 指令名称
     * @param attrValue 指令的数据
     */
    compileMethods(scope, node, attrName, attrValue) {
        let type = attrName.slice(1)
        let fn = scope[attrValue]
        if(fn)
        node.addEventListener(type, fn.bind(scope))
    }

    /**
     * 这里处理v-model,v-text等指令
     * @param child 待处理节点
     */
    DealAttributes(child) {
        let attrs = [...child.attributes]
        attrs.forEach(attr => {
            let { name: attrname, value: attrValue } = attr
            if (attrname.indexOf("v-") === 0) {
                let dirname = attrname.slice(2);
                switch (dirname) {
                    case "text":
                        new Watcher(attrValue, this.context, newVal => {
                            child.textContent = newVal
                        })
                        break
                    case "model":
                        new Watcher(attrValue, this.context, newVal => {
                            child.value = newVal
                        })
                        child.addEventListener("input", e => {
                            this.context[attrValue] = e.target.value
                        })
                        break
                }
            }
            if (attrname.indexOf("@") === 0) {
                this.compileMethods(this.context, child, attrname, attrValue)
            }
        })
    }
}