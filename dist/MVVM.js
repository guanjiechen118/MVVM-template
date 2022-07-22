/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ts/compiler.ts":
/*!************************!*\
  !*** ./ts/compiler.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst watcher_1 = __importDefault(__webpack_require__(/*! ./watcher */ \"./ts/watcher.ts\"));\r\nclass compiler {\r\n    constructor(Context) {\r\n        this.context = Context;\r\n        this.$el = this.context.$el;\r\n        this.$data = this.context.$data;\r\n        this.$methods = this.context.$methods;\r\n        if (this.context.$el) {\r\n            //compile the template\r\n            let temp = this.Node2Fragement(this.$el);\r\n            // if the return val is void , the function should be ended\r\n            if (!temp) {\r\n                console.log(\"Fragement is empty\");\r\n                return;\r\n            }\r\n            var fragemnet = temp;\r\n            this.compile(fragemnet);\r\n            this.$el.appendChild(fragemnet);\r\n        }\r\n    }\r\n    compile(node) {\r\n        var that = this;\r\n        if (node.childNodes && node.childNodes.length) {\r\n            node.childNodes.forEach(child => {\r\n                if (child.nodeType === 1) //element nodes:\r\n                 {\r\n                    //read and deal instructions in \"Deal Attributes\"\r\n                    this.DealAttributes(child);\r\n                    this.compile(child);\r\n                }\r\n                else //text nodes\r\n                 {\r\n                    let text = child.textContent.trim(); //trim() filter the white space ahead and behind\r\n                    console.log(text);\r\n                    if (text) {\r\n                        //step1.trannsfer string into expression\r\n                        let exp = this.Text2Exp(text);\r\n                        //step2.add SUB and PUB here\r\n                        new watcher_1.default(exp, this.context, (newVal) => {\r\n                            child.textContent = newVal;\r\n                        });\r\n                        //完成 Model -> View 的响应式\r\n                    }\r\n                }\r\n            });\r\n        }\r\n    }\r\n    Node2Fragement(node) {\r\n        var fragemnet = document.createDocumentFragment();\r\n        //if and only if the node include other nodes\r\n        if (node.childNodes && node.childNodes.length) {\r\n            node.childNodes.forEach(child => {\r\n                if (!this.ingore(child)) {\r\n                    //here has a side effect , caused be function below:appendChild, which will shift child from origin document\r\n                    fragemnet.appendChild(child);\r\n                }\r\n            });\r\n            return fragemnet;\r\n        }\r\n    }\r\n    /**\r\n     *\r\n     * @param node\r\n     * @returns boolean\r\n     * NodeType === 8 means this is a commment , we ignore\r\n     * NodeType === 1 means this is an text elemnet , if the element is a \"Enter\" , we ignore\r\n     */\r\n    ingore(node) {\r\n        var reg = /^[\\t\\n\\r]+/;\r\n        return (node.nodeType === 8 || (node.nodeType === 3 && reg.test(node.textContent)));\r\n    }\r\n    Text2Exp(text) {\r\n        //reg exp:\r\n        let regText = /\\{\\{(.+?)\\}\\}/g;\r\n        //split the exp\r\n        let pices = text.split(regText);\r\n        //match the exp\r\n        let matches = text.match(regText);\r\n        //tokens are the matched exp\r\n        var tokens = [];\r\n        pices.forEach(item => {\r\n            if (matches && matches.indexOf(\"{{\" + item + \"}}\") > -1) {\r\n                tokens.push(\"(\" + item + \")\");\r\n            }\r\n            else\r\n                tokens.push(\"`\" + item + \"`\");\r\n        });\r\n        console.log(\"tokens joint:\");\r\n        console.log(tokens.join(\"+\"));\r\n        return tokens.join(\"+\");\r\n    }\r\n    compileMethods(scope, node, attrName, attrValue) {\r\n        let type = attrName.slice(1);\r\n        let fn = scope[attrValue];\r\n        if (fn)\r\n            node.addEventListener(type, fn.bind(scope));\r\n    }\r\n    DealAttributes(child) {\r\n        let attrs = [...child.attributes];\r\n        attrs.forEach(attr => {\r\n            let { name: attrname, value: attrValue } = attr;\r\n            if (attrname.indexOf(\"v-\") === 0) {\r\n                let dirname = attrname.slice(2);\r\n                switch (dirname) {\r\n                    case \"text\":\r\n                        new watcher_1.default(attrValue, this.context, newVal => {\r\n                            child.textContent = newVal;\r\n                        });\r\n                        break;\r\n                    case \"model\":\r\n                        new watcher_1.default(attrValue, this.context, newVal => {\r\n                            child.value = newVal;\r\n                        });\r\n                        child.addEventListener(\"input\", e => {\r\n                            this.context[attrValue] = e.target.value;\r\n                        });\r\n                        break;\r\n                }\r\n            }\r\n            if (attrname.indexOf(\"@\") === 0) {\r\n                this.compileMethods(this.context, child, attrname, attrValue);\r\n            }\r\n        });\r\n    }\r\n}\r\nexports[\"default\"] = compiler;\r\n\n\n//# sourceURL=webpack:///./ts/compiler.ts?");

/***/ }),

/***/ "./ts/dep.ts":
/*!*******************!*\
  !*** ./ts/dep.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Dep {\r\n    constructor() {\r\n        //save all the Watcher\r\n        this.subs = {};\r\n    }\r\n    AddSub(target) {\r\n        this.subs[target.id] = target;\r\n    }\r\n    notify() {\r\n        console.log(\"subs:\");\r\n        console.log(this.subs);\r\n        for (let uid in this.subs) {\r\n            this.subs[uid].update();\r\n        }\r\n    }\r\n}\r\nexports[\"default\"] = Dep;\r\n//target is used to notify if there is new target to be added to subs\r\n//if target is set to be null,it won't active the update of subs\r\n//verse, it will update subs\r\n//target will be set at watcher,subs will be updated at observer\r\nDep.target = null;\r\n\n\n//# sourceURL=webpack:///./ts/dep.ts?");

/***/ }),

/***/ "./ts/observer.ts":
/*!************************!*\
  !*** ./ts/observer.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst dep_1 = __importDefault(__webpack_require__(/*! ./dep */ \"./ts/dep.ts\"));\r\n// 进行数据劫持\r\nclass Observer {\r\n    constructor(data) {\r\n        this.data = data;\r\n        // 遍历对象完成所有数据的劫持\r\n        this.walk(this.data);\r\n    }\r\n    /**\r\n     * 遍历对象\r\n     * @param {*} data\r\n     */\r\n    walk(data) {\r\n        if (!data || typeof data !== 'object') { // 递归结束条件\r\n            return;\r\n        }\r\n        Object.keys(data).forEach(key => {\r\n            this.defineReactive(data, key, data[key]);\r\n        });\r\n    }\r\n    /**\r\n     * 动态设置响应式数据\r\n     * @param {*} data\r\n     * @param {*} key\r\n     * @param {*} value\r\n     */\r\n    defineReactive(data, key, value) {\r\n        let dep = new dep_1.default();\r\n        Object.defineProperty(data, key, {\r\n            enumerable: true,\r\n            configurable: false,\r\n            get: () => {\r\n                dep_1.default.target && dep.AddSub(dep_1.default.target);\r\n                return value;\r\n            },\r\n            set: newValue => {\r\n                console.log('set');\r\n                value = newValue;\r\n                dep.notify();\r\n            }\r\n        });\r\n        this.walk(value); // 为了完成递归遍历\r\n    }\r\n}\r\nexports[\"default\"] = Observer;\r\n\n\n//# sourceURL=webpack:///./ts/observer.ts?");

/***/ }),

/***/ "./ts/vue.ts":
/*!*******************!*\
  !*** ./ts/vue.ts ***!
  \*******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst compiler_1 = __importDefault(__webpack_require__(/*! ./compiler */ \"./ts/compiler.ts\"));\r\nconst observer_1 = __importDefault(__webpack_require__(/*! ./observer */ \"./ts/observer.ts\"));\r\nclass Vue {\r\n    constructor(options) {\r\n        //获取dom对象\r\n        console.log(options);\r\n        this.$el = document.querySelector(options.el);\r\n        //转存数据\r\n        this.$data = options.data || {};\r\n        this.$methods = options.methods ? options.methods : {};\r\n        //数据代理\r\n        this._ProxyData(this.$data);\r\n        this._ProxyMethods(this.$methods);\r\n        //数据劫持\r\n        new observer_1.default(this.$data);\r\n        //模板编译\r\n        new compiler_1.default(this);\r\n    }\r\n    _ProxyData(data) {\r\n        Object.keys(data).forEach(key => {\r\n            Object.defineProperty(this, key, {\r\n                set(val) {\r\n                    data[key] = val;\r\n                },\r\n                get() {\r\n                    return data[key];\r\n                }\r\n            });\r\n        });\r\n    }\r\n    _ProxyMethods(methods) {\r\n        Object.keys(methods).forEach(key => {\r\n            this[key] = methods[key];\r\n        });\r\n    }\r\n}\r\nwindow.Vue = Vue; //不报错\r\n\n\n//# sourceURL=webpack:///./ts/vue.ts?");

/***/ }),

/***/ "./ts/watcher.ts":
/*!***********************!*\
  !*** ./ts/watcher.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst dep_1 = __importDefault(__webpack_require__(/*! ./dep */ \"./ts/dep.ts\"));\r\nvar $uid = 0;\r\nclass Watcher {\r\n    constructor(exp, scope, callback) {\r\n        this.exp = exp;\r\n        this.scope = scope;\r\n        this.callback = callback;\r\n        this.id = $uid++;\r\n        this.update();\r\n    }\r\n    /**\r\n     * calculate the exp\r\n     */\r\n    get() {\r\n        //set the flag os Dep.target , it will be added to subs later at observer\r\n        dep_1.default.target = this;\r\n        //in compteExpression, it will execute get() anyway,thus,in observer ,\r\n        let newVal = Watcher.computeExpression(this.exp, this.scope);\r\n        dep_1.default.target = null;\r\n        return newVal;\r\n    }\r\n    /**\r\n     * update and execute callback\r\n     */\r\n    update() {\r\n        let newVal = this.get();\r\n        if (this.callback)\r\n            this.callback(newVal);\r\n    }\r\n    static computeExpression(exp, scope) {\r\n        //the data is proxyed by obsever\r\n        //when use the data in scope , it will execute get() function in Obsever\r\n        // console.log(\"exp:\")\r\n        // console.log(exp)\r\n        // console.log(\"scope:\")\r\n        // console.log(scope)\r\n        let fn = new Function(\"scope \", \"with(scope){return \" + exp + \"}\");\r\n        return fn(scope);\r\n    }\r\n}\r\nexports[\"default\"] = Watcher;\r\n\n\n//# sourceURL=webpack:///./ts/watcher.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./ts/vue.ts");
/******/ 	
/******/ })()
;