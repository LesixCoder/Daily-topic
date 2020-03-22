/*
 * [169] 多数元素
 * 给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。
 * 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 * 示例 1:
 * 输入: [3,2,3]
 * 输出: 3
 * 示例 2:
 * 输入: [2,2,1,1,1,2,2]
 * 输出: 2
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  var map = {}
  for (var i = 0; i < nums.length; i++) {
    map[nums[i]] = map[nums[i]] + 1 || 1
    if (map[nums[i]] > nums.length / 2) return nums[i]
  }
}
var majorityElement1 = function (nums) {
  let arr = nums.sort((a, b) => b - a)
  return arr[Math.floor(arr.length / 2)]
}
