# Daily-topic

前端每日一题收集

**TOPIC 1**

> 18/08/22

```js
var yidengarr = [0, 1, 2];
yidengarr[10] = 10;
yidengarr.filter(function(x) {
  return x === undefined;
})

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
<textarea id="yideng" maxlength="10"></textarea>
<script>
  document.getElementById('yideng').value = 'aaaaaaaaaaaaaaaaaa'
</script>

<!-- textarea文本框展示的内容是什么，为什么？ -->
```

**TOPIC 3**

> 18/08/23

```js
alert([,,].length);
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
    eval("")
  }
};
f()()
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
- 如果构造函数返回了一个“对象”，那么这个对象会取代整个 new 出来的结果。如果构造函数没有返回对象，那么 new 出来的结果为步骤1创建的对象，

> ps：一般情况下构造函数不返回任何值，不过用户如果想覆盖这个返回值，可以自己选择返回一个普通对象来覆盖。当然，返回数组也会覆盖，因为数组也是对象

于是，我们这里的 `new f()` 返回的仍然是函数 `f` 本身，而并非他的实例。

**TOPIC 6**

> 18/08/28

```js
Object.prototype.a = 'a';
Function.prototype.a = 'a1';
function Person(){};
var yideng = new Person();
console.log(yideng.a);
// ===请选择正确答案===
// A.a B.a1 C.undefined D.报错
```

**答案：**

![](http://cdn-blog.liusixin.cn/4c4eb329a2f886fb8fa26ea8b50a274a.jpg)

答案是a，构造函数 `Person` 创建的时候系统会默认一个它的原型对象，`Person` 的原型对象也是个对象，用`Person.prototype.constructor`打印，构造器指向的是`Object`，既然`Object`是一个构造函数那自然也有原型对象并设置了属于`a`，当`person`创建一个实例`yideng`，访问它的`a`属性，先找自己没有会顺着原型链往上找，找到person没有会再找`object`，然后就有啦

**TOPIC 7**

> 18/08/29

```js
var yideng = {
  n: 1
};
yideng.x = yideng = {
  n: 2
};
console.log(yideng.x);
// ===请写出执行结果===
```

**答案：**

`yideng.x = yideng = { n: 2 };` 这里非常特殊。`“.“`运算符的优先级要高于`”=“`的优先级，所以这里的次序是：

1. 创建了一个`x`属性，值为`undefined`，挂在`yideng`下。
2. `yideng`的指向被改变，指向了`{n:2}`。
3. 刚才创建的`x`属性被赋值为`{n:2}`
4. 由于`yideng`的指向已经改变，不再指向原有的对象，所以`yideng.x`就为`undefined`。

**TOPIC 8**

> 18/08/30

```html
<script>
  // 使用未定义的变量yideng
  yideng;
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
  switch("yideng") {
    case "yideng"
      // 禁止直接写一句break;
  }
}
// 请修改代码能够跳出死循环
```