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

### 4.混合(样式的集合, 最好玩的东西之一)

例子:

Less样式文件

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

.mixin (@_, @color) {
  display: block;
}

.myclass{
    //引用了名为.mixin的混合 变量@switch的值为light, 因此会匹配.mixin(light, @color)
    //.mixin的第二个参数是变量, 可以匹配任何传入的参数.
    //注意: 调用(严格来说是匹配)没有参数的混合的时候可以省略(圆括号)
    //一次可以匹配多个混合 也可能匹配不到任何混合
    .mixin(@switch, #888);
}
```

编译后输出的CSS文件

```css
.myclass {
  color: #a2a2a2;
  display: block;
}
```

用途: 对于一些经常重复出现的样式完全可以使用Less中的混合取代, 减少撸码时间. 别看暂时的代码量增加了, 在大工程里混合的作用是非常大的


### 5.匹配混合更好的方式------导引

混合的匹配规则可以让我们在匹配一个混合的时候, 可以匹配对应的混合集.
但是如果你想要更加强大的匹配方式, 那就用导引吧.

less文件

```less 

// 导引就是when  when里允许 出现 > >= = <= <
.mixin (@a) when (lightness(@a) >= 50%) {
  background-color: black;
}
.mixin (@a) when (lightness(@a) < 50%) {
  background-color: white;
}
.mixin (@a) {
  color: @a;
}

.class1 { .mixin(#ddd) }
.class2 { .mixin(#555) }

.mixin1(@a) when(@a = #fff){
    color: #fff;
}

.mixin1(@a) when(@a){
    background-color: @a;
}

.class3{
    //传入true关键字, Less中除了true(布尔真值), 其他所有的值都为假.
    .mixin1(#fff);
}
```

生成的css文件

```css
.class1 {
  background-color: black;
  color: #ddd;
}
.class2 {
  background-color: white;
  color: #555;
}
.class3{
    color: #fff;
}
```

在Less中, 有几个函数会返回true(除了true都是false).

* iscolor
* isnumber
* isstring
* iskeyword    //是否是关键字
* isurl
* ispixel      //是否是以px结尾的数字
* ispercentage //是否是以百分数结尾的数字
* isem         //是否是以em结尾的数字

```less

//只有当满足两个条件的时候才会匹配这个混合
.mixin (@a) when (isnumber(@a)) and (@a > 0) { ... }
//或者  .mixin (@a) when (isnumber(@a)), (@a > 0) { ... }

//只要满足一个条件就好 或的逻辑关系
.mixin (@a) when not (iscolor(@a)) and (@a > 0) { ... }
```

### 6. 写出更漂亮的代码-----嵌套

传统的css代码使用后代选择器的Less可以通过嵌套来实现, 这样更直观.

例如CSS代码:

```css
#header { color: black; }
#header .navigation {
  font-size: 12px;
}
#header .logo { 
  width: 300px; 
}
#header .logo:hover {
  text-decoration: none;
}
```

Less代码

```less
#header {
  color: black;

  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
    &:hover { text-decoration: none }
  }
}
```

其中&符号表示.logo

### 7. 更加灵活的玩法------运算

运算是什么,　你可以在Less中对整数,　颜色,　或变量进行诸如加减乘除的运算

看接下来的一组例子:

```less
//变量声明时执行运算
@base: 5%;
@filler: @base * 2;               // @filler = 10%
@other: @base + @filler;          // @other  = 15%
@var: 1px + 5;                    // @var    = 6px

//常量声明时执行运算
color: #888 / 4;                  // color   = #222    color是常量
height: 100% / 2 + @filler;       // height  = 60%     height是常量

//变量使用时执行运算
#header{
    border: (@var * 2) solid black;
}
```

在Less中, 常量和变量都是声明后不可修改,　都是表达了对值的引用,　区别在于:　常量在混合里作为参数的时候,　只能
匹配本身的值,　而变量可以匹配任意值,　这就是他们的区别.

```less
//color引用自上面代码的常量color
.mixin(color){
    color: color;
}

.mixin(@color){
    background-color: @color;
}

#header{
    .mixin(#f11);
}
```

输出的css代码

```css
#header{
    background-color: #f11;
}
```

### 8.常用的函数在Less中

* lighten(@color, 10%);      // 返回一个新的颜色比原来的颜色更亮10%
* darken(@color, 10%);       // 返回一个新的颜色比原来的颜色更暗10%
* mix(@color1, @color2);     // 返回一个由@color1, @color2混合而成的颜色
* round(1.67);               // returns 2
* ceil(2.4);                 // returns 3
* floor(2.6);                // returns 2
* percentage(0.5);           // returns 50%

### 8. Less的模块化管理之Importing

less的@import用于导入其他less或css文件,对于模块化管理有很大的帮助, 并且@import在编译less代码的时候就同步执行,
引入后的文件就好像是把文件的内容复制到@import所在处.

```less
@import "lib.less";
@import "lib";     // 或者省略less, lib也可以是css结尾的文件,
@import "lib.css"; // 引入CSS文件, 强行加上css结尾, less不会编译这个文件.
```

### 9.剩下的知识点

字符串插值, 可以帮助你将变量的值更自然的放到字符串中.

```less
@base-url: "http://assets.fnord.com";
background-image: url("@{base-url}/images/bg.png");
```

避免被编译, less代码是需要经过编译,生成css的.有时候你不想被编译的话可以用字符串引号将不想被编译的代码包裹起来
,然后在其前面加上～符号即可.

JavaScript表达式, 在反单引号中可以嵌入JS的表达式, 比如说:

```less
@var: `"hello".toUpperCase() + '!'`;

//或者这样
@str: "hello";
@var: ~`"@{str}".toUpperCase() + '!'`;
```

输出结果

```css
@var: HELLO!;
```

### 10.总结

Less是一门轻量化的动态样式语言, 它对于前端模块化, 有很大的帮助.