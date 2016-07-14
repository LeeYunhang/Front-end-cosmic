# Less学习笔记

## Less是什么

> Less是一种动态样式语言, 是CSS的超集, Less赋予CSS动态语言的特性, 如: 变量, 继承, 运算, 函数. Less既可以在游览器上直接运行 (支持IE 6+, Webkit, Firefox), 也可以借助Node.js或者Rhino在服务端运行。

## 如何使用Less?

### 1. 在游览器使用Less :smirk:

引入你的.less样式文件的时候要设置rel属性值为'stylesheet/less'
如 

`<link rel="stylesheet/less" type="text/css" href="styles.less">`

然后点击[下载Less](http://cloud.github.com/downloads/cloudhead/less.js/less-1.3.1.min.js)
导入你下载的less的js文件,
如: 

`<script src="less.js" type="text/javascript"></script>`

### 2. 在服务器端使用Less

使用npm安装less.

`npm install less@latest`

```javascript
var less = require('less');

less.render('.class { width: 1 + 1 }', function (e, css) {
    console.log(css);
});
```

如果你选择全局安装less

`npm i -g less@latest`

那你还可以直接在命令行使用lessc命令.

`lessc styles.less > styles.css`

### 3. LESS 变量

Less的变量是@开头的. 比如说:

less文件

```less
@nice-blue: #5B83AD;
@light-blue: @nice-blue + #111;

#header { color: @light-blue; }
```
输出的css文件

```css
#header { color: #6c94be; }
```
