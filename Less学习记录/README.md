# Less学习笔记

## Less是什么

> Less是一种动态样式语言, 是CSS的超集(所以可以在Less里只写css, 但是就不能发挥Less的威力了）, Less赋予CSS动态语言的特性, 如: 变量, 继承, 运算, 函数. Less既可以在游览器上直接运行 (支持IE 6+, Webkit, Firefox), 也可以借助Node.js或者Rhino在服务端运行。

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

Less的变量是@开头的. 可以用来定义颜色, 整数, 内容等等. 比如说:

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

### 4.混合

例子:

```less
//less在css的注释基础上增加了行内注释(CSS怎么能没有行内注释呢...)

@switch: light;      //声明一个变量, 值为light

/**
 * 像这样 类似于CSS的类选择器, 还可以带上(), 里面跟上参数, 就好像是一个函数,
 * 可以在其他样式里被引用
 * 这就是Less中的‘混合’, 如果出现多个名字相同的混合, 那就会根据匹配规则来匹配
 * darken 是Less自带的颜色函数
 */
.mixin(dark, @color){
    color: darken(@color, 10%);
}

.mixin(light, @color){
    color: lighten(@color, 10%);
}

.myclass{
    //引用了名为.mixin的混合 变量@switch的值为light, 因此会匹配.mixin(light, @color)
    //.mixin的第二个参数是变量, 可以匹配任何传入的参数.
    .mixin(@switch, #888);
}
```
