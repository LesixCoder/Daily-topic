# Daily-topic

前端每日一题收集

**TOPIC 1**

> 18/08/22

```js
var arr = [0, 1, 2];
arr[10] = 10;
arr.filter(function(x) {
  return x === undefined;
});

// ===== 请选择如下答案 =====
// A.[undefined*7]
// B.[empty*7]
// C.[]
// D.报错
```

**答案：**

```js
// 选择C
// 首先大家可以看一下 Array.prototype.filter 的 polyfill，filter迭代这个数组的时候, 首先检查了这个索引值是不是数组的一个属性, 那么我们测试一下.
// 0 in ary; => true
// 3 in ary; => false
// 10 in ary; => true
// 也就是说 从 3 - 9 都是没有初始化的'坑'!, 这些索引并不存在与数组中. 在 array 的函数调用的时候是会跳过这些'坑'的.
```

**TOPIC 2**

```html
<textarea id="test" maxlength="10"></textarea>
<script>
  document.getElementById('test').value = 'aaaaaaaaaaaaaaaaaa';
</script>

<!-- textarea文本框展示的内容是什么，为什么？ -->
```

**TOPIC 3**

> 18/08/23

```js
alert([, ,].length);
// ===== 请选择如下答案 =====
// A.0
// B.1
// C.2
// D.3
// E.均不正确
```

**答案：**

```js
// 选择E
// 正常情况下[,,]会进行初始化，过程如下图。进行求值，所以基本上得到的结论就是按逗号的个数进行计算。所以等于2（ES6的标准也是最后一个已逗号结尾）.但是在IE8以下为[占,占,占]，所以等于3。
```

![](http://cdn-blog.liusixin.cn/topic3.jpg)

**TOPIC 4**

> 18/08/24

```js
var f = function() {
  var arr = new Array(100);
  return function() {
    eval('');
  };
};
f()();
// ===请问函数f执行完arr会被垃圾回收么===
// A.arr未被引用肯定会
// B.不会
// C.报错
```

**答案：**

```js
// 选择:B
// 1.js单线程 函数执行进栈 执行完销毁内部变量
// 2.闭包 。。。得有引用！才会造成内存泄露！我根本没引用arr，学知识太片面了
// 3.我用了eval LexicalEnvironment中的任何变量不进行解除绑定 所以选B 如果我用widnow.eval或者没用 上面的arr直接回收
// 还有try..catch等等 js底层学不会 一辈子工资也过不了20.
```

**TOPIC 5**

> 18/08/27

```js
function f() {
  return f;
}
new f() instanceof f;
// ===请写出执行结果===
```

**答案：**

当代码 `new f()` 执行时，下面事情将会发生：

- 一个新对象被创建。它继承自 `f.prototype`
- 构造函数 `f` 被执行。执行的时候，相应的传参会被传入，同时上下文(`this`)会被指定为这个新实例。 `new f`等同于 `new f()`，只能用在不传递任何参数的情况。
- 如果构造函数返回了一个“对象”，那么这个对象会取代整个 new 出来的结果。如果构造函数没有返回对象，那么 new 出来的结果为步骤 1 创建的对象，

> ps：一般情况下构造函数不返回任何值，不过用户如果想覆盖这个返回值，可以自己选择返回一个普通对象来覆盖。当然，返回数组也会覆盖，因为数组也是对象

于是，我们这里的 `new f()` 返回的仍然是函数 `f` 本身，而并非他的实例。

**TOPIC 6**

> 18/08/28

```js
Object.prototype.a = 'a';
Function.prototype.a = 'a1';
function Person() {}
var test = new Person();
console.log(test.a);
// ===请选择正确答案===
// A.a B.a1 C.undefined D.报错
```

**答案：**

![](http://cdn-blog.liusixin.cn/4c4eb329a2f886fb8fa26ea8b50a274a.jpg)

答案是 a，构造函数 `Person` 创建的时候系统会默认一个它的原型对象，`Person` 的原型对象也是个对象，用`Person.prototype.constructor`打印，构造器指向的是`Object`，既然`Object`是一个构造函数那自然也有原型对象并设置了属于`a`，当`person`创建一个实例`yideng`，访问它的`a`属性，先找自己没有会顺着原型链往上找，找到 person 没有会再找`object`，然后就有啦

**TOPIC 7**

> 18/08/29

```js
var obj = {
  n: 1,
};
obj.x = obj = {
  n: 2,
};
console.log(obj.x);
// ===请写出执行结果===
```

**答案：**

`obj.x = obj = { n: 2 };` 这里非常特殊。`“.“`运算符的优先级要高于`”=“`的优先级，所以这里的次序是：

1. 创建了一个`x`属性，值为`undefined`，挂在`obj`下。
2. `obj`的指向被改变，指向了`{n:2}`。
3. 刚才创建的`x`属性被赋值为`{n:2}`
4. 由于`obj`的指向已经改变，不再指向原有的对象，所以`obj.x`就为`undefined`。

**TOPIC 8**

> 18/08/30

```html
<script>
  // 使用未定义的变量test
  test;
  console.log(1);
</script>
<script>
  console.log(2);
</script>
<!-- 请写出执行结果 -->
```

**答案：**

```sh
报错
2
```

对于 Javascript 而言，我们面对的仅仅只是异常，异常的出现不会直接导致 JS 引擎崩溃，最多只会使当前执行的任务终止。
所以上述过程如下：

1. 当前代码块将作为一个任务压入任务队列中，JS 线程会不断地从任务队列中提取任务执行。
2. 当任务执行过程中出现异常，且异常没有捕获处理，则会一直沿着调用栈一层层向外抛出，最终终止当前任务的执行。
3. JS 线程会继续从任务队列中提取下一个任务继续执行。

**TOPIC 9**

> 18/08/31

```js
while(1) {
  switch("test") {
    case "test"
      // 禁止直接写一句break;
  }
}
// 请修改代码能够跳出死循环
```

**TOPIC 10**

```js
alert(a);
a();
var a = 3;
function a() {
  alert(10);
}
alert(a);
a = 6;
a();
// a函数
// 10
// 3
// 报错：a is not a function
```

**TOPIC 11**

写出去掉注释和加上注释的打印结果

```js
this.a = 20;
var test = {
  a: 40,
  init: () => {
    console.log(this.a);
    function go() {
      this.a = 60;
      console.log(this.a);
    }
    go.prototype.a = 50;
    return go;
  },
};
var p = test.init();
p();
new (test.init())();

// ===有注释===
// 20
// 20
// 50
// ===无注释===
// 20
// 60
// 60
```

**TOPIC 12**

```js
function C1(name) {
  if (name) this.name = name;
}

function C2(name) {
  this.name = name;
}

function C3(name) {
  this.name = name || 'fe';
}
C1.prototype.name = 'test';
C2.prototype.name = 'hao';
C3.prototype.name = 'weilai';
console.log(new C1().name);
console.log(new C2().name);
console.log(new C3().name);

// js函数定义时的参数其实是不必要的，因为函数内部其实访问的是一个类数组对象arguments，传进来的参数依次放到这个对象中。
// C1,if不成立，new C1()中没有name属性，就访问到了原型上的name，输出test
// C2,既然没有参数，也就是执行new C2(undefined)，所以name为undefined
// C3,new C3()的name值为fe，所输出fe
```

**TOPIC 13**

请写出如下点击 li 的输出值，并用三种办法正确输出 li 里的数字。

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6</li>
</ul>
<script type="text/javascript">
  var list_li = document.getElementsByTagName('li');
  for (var i = 0; i < list_li.length; i++) {
    list_li[i].onclick = function() {
      console.log(i);
    };
  }
</script>

<!--
1.闭包
2.let
3.this.innerHTML
-->
```

**TOPIC 14**

```js
function test(m) {
  m = { v: 5 };
}
var m = { k: 30 };
test(m);
alert(m.v);

// undefined 函数参数按值传递，实参m只是对m的拷贝，外部m不受影响，所以没有v属性
```

**TOPIC 15**

```js
function test() {
  console.log(1);
}
(function() {
  if (false) {
    function test() {
      console.log(2);
    }
  }
  test();
})();
// test is not a function
// 在if条件运算里，函数声明相当于函数表达式执行，所以，变量提升：
var test = undefined;
if (false) {
  test = function() {
    console.log(2);
  };
}
test();
```

**TOPIC 16**

请用一句话算出 0-100 之间学生的学生等级，如 90-100 输出为 1 等生、80-90 为 2 等 生以此类推。不允许使用 if switch 等

```js
function level(score) {
  return `${Math.abs(10 - Math.floor(score / 10))}等生`;
}
```

**TOPIC 17**

```js
var length = 10;
function fn() {
    console.log(this.length);
}
var obj = {
    length: 5,
    method: function (fn) {
        fn();
        arguments[0]();
    },
};
obj.method(fn, 1);

// 10
// 2
// 全局函数fn指向的是window，fn同时也属于arguments数组中的一员，即当作为arguments成员之一调用的时候，其作用域就绑定到了arguments上，this也就是指向了arguments对象，所以arguments[0]()这段代码调用了身为成员的fn()函数
```
