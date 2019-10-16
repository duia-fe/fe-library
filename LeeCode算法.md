## LeeCode 里面的算法题，并附上自己的答案

### 1.两数之和

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
