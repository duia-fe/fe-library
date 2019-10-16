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
    while(l1 || l2) {
        let sum = (l1?l1.val:0)+(l2?l2.val:0)+extra;
        let tempNode = new ListNode(sum%10);
        if(dep===1) {
           result =  tempNode;
        } else {
            cache.next = tempNode;
        }
        cache = tempNode;
        dep = dep+1;
        l1 = l1 && l1.next;
        l2 = l2 && l2.next;
        if(sum>=10) {
            extra = 1;
        } else {
            extra = 0;
        }
        if(extra && !l1&&!l2) {
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
