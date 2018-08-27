# Daily-topic

前端每日一题收集

> TOPIC 1

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

> TOPIC 2

```html
<textarea id="yideng" maxlength="10"></textarea>
<script>
  document.getElementById('yideng').value = 'aaaaaaaaaaaaaaaaaa'
</script>

<!-- textarea文本框展示的内容是什么，为什么？ -->
```

> TOPIC 3

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

> TOPIC 4

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