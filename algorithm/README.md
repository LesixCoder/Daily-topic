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

### [409] 最长回文串

```js
/*
 * 给定一个包含大写字母和小写字母的字符串，找到通过这些字母构造成的最长的回文串。
 * 在构造过程中，请注意区分大小写。比如 "Aa" 不能当做一个回文字符串。
 * 注意:
 * 假设字符串的长度不会超过 1010。
 * 示例 1:
 * 输入:
 * "abccccdd"
 * 输出:
 * 7
 *
 * 解释:
 * 我们可以构造的最长的回文串是"dccaccd", 它的长度是 7。
 */

var longestPalindrome = function (s) {
  let count = 0, map = {}
  for (let word of s) {
    map[word] = map[word] ? ++map[word] : 1;
    if (map[word] % 2 === 0) count += 2
  }
  return count < s.length ? count + 1 : count
};
```

### [695] 岛屿的最大面积

```js
/*
 * 给定一个包含了一些 0 和 1的非空二维数组 grid , 一个 岛屿 是由四个方向 (水平或垂直) 的 1 (代表土地) 构成的组合。你可以假设二维矩阵的四个边缘都被水包围着。
 * 找到给定的二维数组中最大的岛屿面积。(如果没有岛屿，则返回面积为0。)
 * 示例 1:
[[0,0,1,0,0,0,0,1,0,0,0,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,1,1,0,1,0,0,0,0,0,0,0,0],
 [0,1,0,0,1,1,0,0,1,0,1,0,0],
 [0,1,0,0,1,1,0,0,1,1,1,0,0],
 [0,0,0,0,0,0,0,0,0,0,1,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,0,0,0,0,0,0,1,1,0,0,0,0]]
 * 对于上面这个给定矩阵应返回 6。注意答案不应该是11，因为岛屿只能包含水平或垂直的四个方向的‘1’。
 * 示例 2:
 * [[0,0,0,0,0,0,0,0]]
 * 对于上面这个给定的矩阵, 返回 0。
 * 注意: 给定的矩阵grid 的长度和宽度都不超过 50。
 */

var maxAreaOfIsland = function(grid) {
  let x = grid.length, y=grid[0].length
  let max = 0
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (grid[i][j] == 1) {
        max = Math.max(max, calcArea(grid, i, j, x, y))
      }
    }
  }
  return max
};

var calcArea = (grid, i, j, x, y) => {
  if(i < 0 || i  >= x || j < 0 || j >= y || !grid[i][j]) return 0
  let area = 1
  grid[i][j] = 0
  area += calcArea(grid, i - 1, j, x, y)
  area += calcArea(grid, i + 1, j, x, y)
  area += calcArea(grid, i, j - 1, x, y)
  area += calcArea(grid, i, j + 1, x, y)
  return area
}
```

### [836] 矩形重叠

```js
/*
 * 矩形以列表 [x1, y1, x2, y2] 的形式表示，其中 (x1, y1) 为左下角的坐标，(x2, y2) 是右上角的坐标。
 * 如果相交的面积为正，则称两矩形重叠。需要明确的是，只在角或边接触的两个矩形不构成重叠。
 * 给出两个矩形，判断它们是否重叠并返回结果。
 * 示例 1：
 * 输入：rec1 = [0,0,2,2], rec2 = [1,1,3,3]
 * 输出：true
 * 示例 2：
 * 输入：rec1 = [0,0,1,1], rec2 = [1,0,2,1]
 * 输出：false
 *
 * 提示：
 * 两个矩形 rec1 和 rec2 都以含有四个整数的列表的形式给出。
 * 矩形中的所有坐标都处于 -10^9 和 10^9 之间。
 * x 轴默认指向右，y 轴默认指向上。
 * 你可以仅考虑矩形是正放的情况。
 */

var isRectangleOverlap = function (rec1, rec2) {
  return !(rec1[2] <= rec2[0] ||
    rec1[3] <= rec2[1] ||
    rec2[2] <= rec1[0] ||
    rec2[3] <= rec1[1])
};
```

### [945] 使数组唯一的最小增量

```js
/*
 * 给定整数数组 A，每次 move 操作将会选择任意 A[i]，并将其递增 1。
 * 返回使 A 中的每个值都是唯一的最少操作次数。
 * 示例 1:
 * 输入：[1,2,2]
 * 输出：1
 * 解释：经过一次 move 操作，数组将变为 [1, 2, 3]。
 * 示例 2:
 * 输入：[3,2,1,2,1,7]
 * 输出：6
 * 解释：经过 6 次 move 操作，数组将变为 [3, 4, 1, 2, 5, 7]。
 * 可以看出 5 次或 5 次以下的 move 操作是不能让数组的每个值唯一的。
 *
 * 提示：
 * 0 <= A.length <= 40000
 * 0 <= A[i] < 40000
 */

var minIncrementForUnique = function (A) {
  A.sort((a, b) => a - b);
  let move = 0;
  for (let i = 1; i < A.length; i++) {
    if (A[i] <= A[i - 1]) {
      [A[i], move] = [A[i - 1] + 1, move + A[i - 1] + 1 - A[i]];
    }
  }
  return move;
};
```

### [1160] 拼写单词

```js
/*
 * 给你一份『词汇表』（字符串数组） words 和一张『字母表』（字符串） chars。
 * 假如你可以用 chars 中的『字母』（字符）拼写出 words 中的某个『单词』（字符串），那么我们就认为你掌握了这个单词。
 * 注意：每次拼写时，chars 中的每个字母都只能用一次。
 * 返回词汇表 words 中你掌握的所有单词的 长度之和。
 *
 * 示例 1：
 * 输入：words = ["cat","bt","hat","tree"], chars = "atach"
 * 输出：6
 * 解释：
 * 可以形成字符串 "cat" 和 "hat"，所以答案是 3 + 3 = 6。
 *
 * 示例 2：
 * 输入：words = ["hello","world","leetcode"], chars = "welldonehoneyr"
 * 输出：10
 * 解释：
 * 可以形成字符串 "hello" 和 "world"，所以答案是 5 + 5 = 10。
 *
 * 提示：
 * 1 <= words.length <= 1000
 * 1 <= words[i].length, chars.length <= 100
 * 所有字符串中都仅包含小写英文字母
 */

var countCharacters = function (words, chars) {
  let count = 0
  for (let i = 0; i < words.length; i++) {
    let map = charsMap(chars)
    if (isMatchWord(words[i], map)) {
      count += words[i].length
    }
  }
  return count
};

let isMatchWord = (word, map) => {
  for (let i = 0; i < word.length; i++) {
    if (map[word[i]] != undefined && map[word[i]] !== 0) {
      map[word[i]]--
    } else {
      return false
    }
  }
  return true
}

let charsMap = (chars) => {
  let obj = {}
  for (let i = 0; i < chars.length; i++) {
    if (typeof obj[chars[i]] !== 'undefined') {
      obj[chars[i]]++
    } else {
      obj[chars[i]] = 1
    }
  }
  return obj
}

```
