"use strict";

// Практическая работа №9
// JavaScript: базовые алгоритмы

// O(sqrt(n)) по времени, O(1) по памяти.
function isPrime(number) {
  if (!Number.isInteger(number) || number < 2) return false;
  if (number === 2) return true;
  if (number % 2 === 0) return false;

  for (let divisor = 3; divisor * divisor <= number; divisor += 2) {
    if (number % divisor === 0) return false;
  }
  return true;
}

// O(n) по времени, O(1) по памяти.
function factorial(n) {
  if (!Number.isInteger(n) || n < 0) return null;

  let result = 1;
  for (let i = 2; i <= n; i += 1) {
    result *= i;
  }
  return result;
}

// O(n) по времени, O(n) по памяти для результирующего массива.
function fibonacci(n) {
  if (!Number.isInteger(n) || n <= 0) return [];
  if (n === 1) return [0];

  const result = [0, 1];
  while (result.length < n) {
    const last = result[result.length - 1];
    const previous = result[result.length - 2];
    result.push(last + previous);
  }
  return result;
}

// O(log(min(a, b))) по времени, O(1) по памяти.
function gcd(a, b) {
  a = Math.abs(Math.trunc(a));
  b = Math.abs(Math.trunc(b));

  while (b !== 0) {
    const remainder = a % b;
    a = b;
    b = remainder;
  }
  return a;
}

// O(n) по времени, O(n) по памяти из-за нормализованной строки.
function isPalindrome(str) {
  const normalized = String(str)
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]/gi, "");

  let left = 0;
  let right = normalized.length - 1;

  while (left < right) {
    if (normalized[left] !== normalized[right]) return false;
    left += 1;
    right -= 1;
  }
  return true;
}

// O(n) по времени, O(1) дополнительной памяти.
function countVowels(str) {
  const vowels = "аеёиоуыэюяaeiou";
  let count = 0;

  for (const char of String(str).toLowerCase()) {
    if (vowels.includes(char)) count += 1;
  }
  return count;
}

// O(n) по времени, O(n) по памяти.
function reverseString(str) {
  const value = String(str);
  let result = "";

  for (let i = value.length - 1; i >= 0; i -= 1) {
    result += value[i];
  }
  return result;
}

// O(n) по времени, O(n) по памяти для массива слов.
function findLongestWord(sentence) {
  const words = String(sentence).match(/[a-zа-яё0-9]+/gi) || [];
  let longest = "";

  for (const word of words) {
    if (word.length > longest.length) longest = word;
  }
  return longest;
}

// O(n) по времени, O(1) дополнительной памяти.
function findMax(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return undefined;

  let max = arr[0];
  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

// O(n^2) в худшем случае из-за includes.
// Для больших массивов можно использовать Set и получить O(n) в среднем.
function removeDuplicates(arr) {
  const result = [];

  for (const item of arr) {
    if (!result.includes(item)) result.push(item);
  }
  return result;
}

// O(n^2) по времени в худшем случае, O(n) по памяти из-за копии массива.
function bubbleSort(arr) {
  const result = arr.slice();

  for (let i = 0; i < result.length - 1; i += 1) {
    let swapped = false;

    for (let j = 0; j < result.length - i - 1; j += 1) {
      if (result[j] > result[j + 1]) {
        const temp = result[j];
        result[j] = result[j + 1];
        result[j + 1] = temp;
        swapped = true;
      }
    }

    if (!swapped) break;
  }

  return result;
}

// O(log n) по времени, O(1) по памяти.
function binarySearch(sortedArr, target) {
  let left = 0;
  let right = sortedArr.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);

    if (sortedArr[middle] === target) return middle;
    if (sortedArr[middle] < target) left = middle + 1;
    else right = middle - 1;
  }

  return -1;
}

// O(n) относительно длины строки числа.
function formatCurrency(amount, currency = "₽") {
  const number = Number(amount);
  if (!Number.isFinite(number)) return "";

  const parts = number.toFixed(2).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${parts.join(".")} ${currency}`;
}

// O(n) относительно длины email.
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(String(email));
}

// O(length) по времени и O(length) по памяти.
function generatePassword(length = 8) {
  const requestedLength = Number.isInteger(length) ? length : 8;
  const safeLength = Math.max(4, requestedLength);

  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const special = "!@#$%^&*";
  const all = lower + upper + digits + special;

  const password = [
    lower[Math.floor(Math.random() * lower.length)],
    upper[Math.floor(Math.random() * upper.length)],
    digits[Math.floor(Math.random() * digits.length)],
    special[Math.floor(Math.random() * special.length)]
  ];

  while (password.length < safeLength) {
    password.push(all[Math.floor(Math.random() * all.length)]);
  }

  for (let i = password.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = password[i];
    password[i] = password[j];
    password[j] = temp;
  }

  return password.join("");
}
