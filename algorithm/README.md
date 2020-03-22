# leetcode 每日一题

### [1] 两数之和

```js
/*
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，
 * 并返回他们的数组下标。你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数
 * 组中同样的元素。
 * 示例:
 * 给定 nums = [2, 7, 11, 15], target = 9
 * 因为 nums[0] + nums[1] = 2 + 7 = 9
 * 所以返回 [0, 1]
 */

var twoSum = function (nums, target) {
  var exist = {}
  for (var i = 0; i < nums.length; i++) {
    if (typeof (exist[target - nums[i]]) !== 'undefined') {
      return [exist[target - nums[i]], i]
    }
    exist[nums[i]] = i;
  }
  return []
};
```

### [169] 多数元素

```js
/*
 * 给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。
 * 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 * 示例 1:
 * 输入: [3,2,3]
 * 输出: 3
 * 示例 2:
 * 输入: [2,2,1,1,1,2,2]
 * 输出: 2
 */

// 解法一
var majorityElement = function (nums) {
  var map = {}
  for (var i = 0; i < nums.length; i++) {
    map[nums[i]] = map[nums[i]] + 1 || 1
    if (map[nums[i]] > nums.length / 2) return nums[i]
  }
}

// 解法二
var majorityElement1 = function (nums) {
  let arr = nums.sort((a, b) => b - a)
  return arr[Math.floor(arr.length / 2)]
}
```

### [365] 水壶问题

```js
/*
 * 有两个容量分别为 x升 和 y升 的水壶以及无限多的水。请判断能否通过使用这两个水壶，从而可以得到恰好 z升 的水？
 * 如果可以，最后请用以上水壶中的一或两个来盛放取得的 z升 水。
 * 你允许：
 * 装满任意一个水壶
 * 清空任意一个水壶
 * 从一个水壶向另外一个水壶倒水，直到装满或者倒空
 * 示例 1: (From the famous "Die Hard" example)
 * 输入: x = 3, y = 5, z = 4
 * 输出: True
 * 示例 2:
 * 输入: x = 2, y = 6, z = 5
 * 输出: False
 */

var canMeasureWater = function (x, y, z) {
  if (x + y < z) return false
  if (x === 0 || y === 0) {
    return z === 0 || x + y === z
  }
  return z % gcd(x, y) === 0
};

// 最大公约数
const gcd = (a, b) => {
  if (a % b === 0) {
    return b;
  }
  return gcd(b, a % b);
}
```
