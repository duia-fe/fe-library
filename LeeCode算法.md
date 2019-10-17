## LeeCode 里面的算法题，并附上自己的答案

### 1. 两数之和

给定一个整数数组 nums  和一个目标值 target，请你在该数组中找出和为目标值的那   两个   整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

**示例:**

```
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

<details>
<summary><mark>我的答案</mark></summary>

```javascript
var twoSum = function(nums, target) {
  for (var i = 0; i < nums.length; i++) {
    let other = target - nums[i];
    let index = nums.indexOf(other);
    if (index > -1 && index !== i) {
      return [i, index];
    }
  }
};
```

</details>

<details>
<summary><mark>别人的答案</mark></summary>

```javascript
var twoSum = function(nums, target) {
  const map = {};
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    const targetNum = target - nums[i];
    if (targetNum in map) return [map[targetNum], i];
    map[nums[i]] = i;
  }
};
```

</details>

### 2. 两数相加

给出两个**非空**的链表用来表示两个非负的整数。其中，它们各自的位数是按照**逆序**的方式存储的，并且它们的每个节点只能存储**一位**数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

**示例:**

```
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
```

<details>
<summary><mark>我的答案</mark></summary>

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

let addTwoNumbers = function(l1, l2) {
  let result = null;
  let cache = null;
  let dep = 1;
  let extra = 0;
  while (l1 || l2) {
    let sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + extra;
    let tempNode = new ListNode(sum % 10);
    if (dep === 1) {
      result = tempNode;
    } else {
      cache.next = tempNode;
    }
    cache = tempNode;
    dep = dep + 1;
    l1 = l1 && l1.next;
    l2 = l2 && l2.next;
    if (sum >= 10) {
      extra = 1;
    } else {
      extra = 0;
    }
    if (extra && !l1 && !l2) {
      l1 = new ListNode(0);
    }
  }
  return result;
};
```

</details>

<details>
<summary><mark>别人的答案</mark></summary>

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2, add = 0) {
  let l3 = new ListNode(0);
  let nextadd = 0;
  if (l1 === null || l2 === null) {
    if (l1 === null && l2 === null) {
      if (add === 1) {
        l3.val = add;
        return l3;
      } else {
        return null;
      }
    } else {
      let sum;
      if (l1 === null) {
        sum = l2.val + add;
      } else {
        sum = l1.val + add;
      }
      if (sum >= 10) {
        sum -= 10;
        nextadd = 1;
      }
      l3.val = sum;
      if (l1 === null) {
        l3.next = addTwoNumbers(null, l2.next, nextadd);
      } else {
        l3.next = addTwoNumbers(l1.next, null, nextadd);
      }
    }
  } else {
    let sum = l1.val + l2.val + add;
    if (sum >= 10) {
      sum -= 10;
      nextadd = 1;
    }
    l3.val = sum;
    l3.next = addTwoNumbers(l1.next, l2.next, nextadd); //没有完成，继续往下加
  }

  return l3;
};
```

</details>

### 3. 无重复字符的最长子串

给定一个字符串，请你找出其中不含有重复字符的**最长子串**的长度。

**示例 1:**

```
输入: "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

**示例 2:**

```
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

**示例 3:**

```
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

<details>
<summary><mark>别人的答案</mark></summary>

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  var arr = [],
    res = 0;
  for (let i = 0; i < s.length; i++) {
    let item = s[i],
      index = arr.indexOf(item);
    if (~index) {
      res = arr.length > res ? arr.length : res;
      arr.length = 0;
      s = s.substr(index + 1);
      i = -1;
    } else {
      arr.push(item);
      if (i === s.length - 1) {
        res = arr.length > res ? arr.length : res;
      }
    }
    if (res >= s.length) break;
  }
  return res;
};
```

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let num = 0,
    j = 0;
  const map = new Map();
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (map.get(char) !== undefined) {
      j = Math.max(map.get(char) + 1, j);
    }
    num = Math.max(num, i - j + 1);
    map.set(char, i);
  }
  return num;
};
```

</details>

### 4. 寻找两个有序数组的中位数

给定两个大小为 m 和 n 的有序数组  `nums1` 和  `nums2`。

请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为  O(log(m + n))。

你可以假设  `nums1`  和  `nums2`  不会同时为空。

**示例 1:**

nums1 = [1, 3]
nums2 = [2]

则中位数是 2.0

**示例 2:**

nums1 = [1, 2]
nums2 = [3, 4]

则中位数是 (2 + 3)/2 = 2.5

<details>
<summary><mark>我的答案</mark></summary>

```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  let nums = [...nums1, ...nums2].sort((a, b) => a - b);
  let len = nums.length;
  return (nums[Math.floor(len / 2)] + nums[Math.ceil(len / 2 - 1)]) / 2;
};
```

</details>

<details>
<summary><mark>别人的答案</mark></summary>

```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  let len1 = nums1.length;
  let len2 = nums2.length;
  if (len2 < len1) {
    return findMedianSortedArrays(nums2, nums1);
  }
  let i, j;
  let iMin = 0,
    iMax = len1;

  while (iMin <= iMax) {
    i = Math.floor((iMin + iMax) / 2);
    j = Math.floor((len1 + len2 + 1) / 2 - i);
    if (nums1[i - 1] > nums2[j] && i != 0 && j != len2) {
      iMax = i - 1;
    } else if (nums2[j - 1] > nums1[i] && i != len1 && j != 0) {
      iMin = i + 1;
    } else {
      let lMax, rMin;
      if (i == 0) {
        lMax = nums2[j - 1];
      } else if (j == 0) {
        lMax = nums1[i - 1];
      } else {
        lMax = Math.max(nums1[i - 1], nums2[j - 1]);
      }
      if ((len1 + len2) % 2 != 0) {
        return lMax;
      }
      if (i == len1) {
        rMin = nums2[j];
      } else if (j == len2) {
        rMin = nums1[i];
      } else {
        rMin = Math.min(nums1[i], nums2[j]);
      }
      return (lMax + rMin) / 2;
    }
  }
};
```

</details>
