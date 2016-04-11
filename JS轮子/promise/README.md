# $Promise对象

$Promise对象主要用来让你对于一系列任务进行控制(肯定包括异步任务了),看一下示例代码是怎么样的

```javascript
var promise = new $Promise(); //建立一个promise对象
promise.then(function(msg) {
  console.log(msg)
  promise.resolve('洗手完成', '开始吃饭')
}).then(function(msg1, msg2){
  console.log(msg1)
  console.log(msg2)
  promise.resolve('吃好饭啦')
}).then(function(msg) {
  console.log(msg)
}).start('吃饭之前先洗手')
```

首先要new 一个promise对象，promise用来控制你的一系列任务的流程，对这几个你陌生的东西做一下说明

- $Promise构造函数可以传参数(第一个要执行的任务)
- then方法添加要执行的任务，任务执行的顺序和添加的顺序一致
- start方法开始执行任务，开始执行任务是异步式的，不会阻塞当前要执行的代码
- promise.resolve方法其实是告诉promise这次任务执行成功，并且可以通过传参数给resolve，resolve会执行下一个任务并且将得到的参数原模原样的传过去

## 如果任务执行失败或任务遇到错误怎么处理

看下代码

```javascript
var promise = new $Promise(); //建立一个promise对象
promise.then(function(msg) {
  console.log(msg)
  promise.reject('没有水啦....没法洗手')
}).then(function(msg1, msg2){
  console.log(msg1)
  console.log(msg2)
  promise.resolve('吃好饭啦')
}).then(function(msg) {
  console.log(msg)
}).start('吃饭之前先洗手').error(function(e) {
  console.error(e)
})
```

注意到error方法在start之后被调用， 但是这个调用顺序其实是不会影响到任务的正确执行顺序的，你甚至先start，再执行then等操作， 有几个东西必须说一下.

- promise.reject 当你的任务执行遇到错误的时候， 你应该调用这个方法，参数是字符串， 传达了错误的内容
- error 这个方法用于设置当错误发生的时候的回调函数 promise会给你的回调函数传递一个字符串参数，这个参数是任务执行错误的信息
