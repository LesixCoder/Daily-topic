# Daily-topic

前端每日一题收集

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

```html
<textarea id="yideng" maxlength="10"></textarea>
<script>
  document.getElementById('yideng').value = 'aaaaaaaaaaaaaaaaaa'
</script>

<!-- textarea文本框展示的内容是什么，为什么？ -->
```