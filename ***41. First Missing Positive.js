// Given an unsorted integer array nums, return the smallest missing positive integer.
// You must implement an algorithm that runs in O(n) time and uses constant extra space.
// A = [5, 1, 7, 9, 11, 34, 8, 3];

// Approach 1
// start from 1 till M => max no in the array & search each number in the array
// TC => O(n^2) & space O(1)

// Approach 2 => sorting & searching
// TC => O(nlogn) & space O(n)

// Approach 3 => optimal
// Intuition: Put the numbers in their correct indices
// step: till A[i] > 0 => swap A[i] with A[A[i]-1] =>so that +ve values goes to their actual places
// i.e. 5 goes to index 4, 3 to 2, 7 to 6 ...etc
//      0  1  2  3  4   5   6  7
// A = [5, 1, 7, 9, 11, 34, 8, 3];
// A = [1, 11, 8, 9, 5, 34, 7, 3];

// CODE
function firstMissingPositive(nums = []) {
  let n = nums.length;

  // 1. mark numbers (num < 0) and (num > n) with a special marker number (n+1)
  // (we can ignore those because if all number are > n then we'll simply return 1)
  for (let i = 0; i < n; i++) {
    if (nums[i] <= 0 || nums[i] > n) {
      nums[i] = n + 1;
    }
  }
  // note: all number in the array are now positive, and on the range 1..n+1

  // 2. mark each cell appearing in the array, by converting the index for that number to negative
  for (let i = 0; i < n; i++) {
    let num = Math.abs(nums[i]);
    if (num > n) {
      continue;
    }
    num--; // -1 for zero index based array (so the number 1 will be at pos 0)
    if (nums[num] > 0) {
      // prevents double negative operations
      nums[num] = -1 * nums[num];
    }
  }

  // 3. find the first cell which isn't negative (doesn't appear in the array)
  for (let i = 0; i < n; i++) {
    if (nums[i] >= 0) {
      return i + 1;
    }
  }

  // 4. no positive numbers were found, which means the array contains all numbers 1..n
  return n + 1;
}
