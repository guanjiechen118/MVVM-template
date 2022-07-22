<<<<<<< HEAD
# 简单的 MVVM 模型

**姓名：陈冠杰**

**学校：南京大学**

**专业：计算机科学与技术**

**年级：2020级本科生**

**学号：201220061**

**QQ：2936127220**

**电话：18951393381**

## 1.安装支持库:
### 安装 typescript
```python
#check first
tsc -v
Version 3.x.x
#this is okk,else do follow steps
npm instal -g typescript 
```
### 安装webpack

```python
npm install --save-dev webpack webpack-cli
```
### 安装ts-loader
```python
npm install --save-dev ts-loader
```
依赖的工具包安装完成

---

## 2.编译步骤：
本模型使用`typeScript`编写，使用webpack打包，在编译ts文件时，需要在`shell`中执行以下步骤:
```shell
1.cd ...\MVVM
2.npm run make
3.检查是否在dist中出现:MVVM.js
4.执行demo\demo.html，查看页面
```
`MVVM.js`即为最终打包完成的MVVM框架

`demo.html`主要用于测试

---

## 3.项目简介
本项目使用`TypeScript`完成了一个简单的MVVM框架
实现以下功能：

- 数据劫持
- 发布订阅模式
- 数据单向绑定
- 数据双向绑定
- 一定的测试覆盖

项目组织结构大体如下：

1. demo
   1. demo.css
   2. demo.html
2. dist
   1. MVVM.js
3. ts
   1. compiler.ts
   2. dep.ts
   3. observer.ts
   4. vue.ts
   5. watch.ts
4. json
5. node_modules
6. README.md

`demo`中是测试相关的代码

`MVVM.js`是完成汇编和打包后的最终js代码

`ts`文件夹下是主要逻辑代码，`compiler`完成模板编译，`observer`和`vue`完成数据绑定，在`dep`中实现了`发布订阅模式`的基本框架，`watch`和`obsever`协作，实现`发布者和订阅者的关系绑定``，在observer`中解析attribution：`v-mode`，借助发布订阅模式的支持，完成**双向的数据绑定**。

`json`中是主要配置文件，`node_module`中是打包依赖的库

---


## 4.参考
本项目借鉴下面仓库中的代码：
https://github.com/Fhasghrge/mvvmFramework/blob

借鉴了部分代码和大体思路，在模块划分和部分实现方法上有借鉴，可能会有相似之处。
=======
# 结课作业提交仓库

姓名：
学校：
专业：
年级：
QQ：

- 提交方式
fork 本仓库提交你的代码即可
>>>>>>> 331b7845a328af35bc9df7647e1d597d2ae5863b
