"use strict";

function addResult(name, passed, expected, actual) {
  const container = document.getElementById("testResults");
  const item = document.createElement("div");
  item.className = `test-result ${passed ? "success" : "error"}`;
  item.innerHTML = `
    <strong>${name}</strong>: ${passed ? "УСПЕХ" : "ОШИБКА"}<br>
    Ожидалось: ${JSON.stringify(expected)}<br>
    Получено: ${JSON.stringify(actual)}
  `;
  container.appendChild(item);
}

function runTest(name, actual, expected) {
  const passed = JSON.stringify(actual) === JSON.stringify(expected);
  addResult(name, passed, expected, actual);
  console.log(`${name}: ${passed ? "УСПЕХ" : "ОШИБКА"}`, { expected, actual });
}

function runConditionTest(name, condition, details = "") {
  addResult(name, Boolean(condition), true, Boolean(condition));
  console.log(`${name}: ${condition ? "УСПЕХ" : "ОШИБКА"}`, details);
}

function runAllTests() {
  console.log("=== ЗАПУСК ТЕСТОВ ПР9 ===");

  runTest("isPrime(7)", isPrime(7), true);
  runTest("isPrime(10)", isPrime(10), false);
  runTest("isPrime(1)", isPrime(1), false);
  runTest("factorial(5)", factorial(5), 120);
  runTest("factorial(0)", factorial(0), 1);
  runTest("gcd(54, 24)", gcd(54, 24), 6);
  runTest("fibonacci(6)", fibonacci(6), [0, 1, 1, 2, 3, 5]);

  runTest(
    'isPalindrome("А роза упала на лапу Азора")',
    isPalindrome("А роза упала на лапу Азора"),
    true
  );
  runTest('countVowels("JavaScript")', countVowels("JavaScript"), 3);
  runTest('reverseString("hello")', reverseString("hello"), "olleh");
  runTest(
    'findLongestWord("Самое длинное слово в предложении")',
    findLongestWord("Самое длинное слово в предложении"),
    "предложении"
  );

  runTest("findMax", findMax([3, 7, 2, 9, 1]), 9);
  runTest(
    "removeDuplicates",
    removeDuplicates([1, 2, 2, 3, 4, 4, 5]),
    [1, 2, 3, 4, 5]
  );
  runTest(
    "bubbleSort",
    bubbleSort([64, 34, 25, 12, 22, 11, 90]),
    [11, 12, 22, 25, 34, 64, 90]
  );
  runTest("binarySearch", binarySearch([1, 3, 5, 7, 9], 5), 2);

  runTest("formatCurrency", formatCurrency(1234.56), "1 234.56 ₽");
  runTest("isValidEmail valid", isValidEmail("test@example.com"), true);
  runTest("isValidEmail invalid", isValidEmail("invalid.email"), false);

  const password = generatePassword(12);
  runConditionTest(
    "generatePassword длина и состав",
    password.length === 12 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password),
    password
  );

  console.log("=== ТЕСТИРОВАНИЕ ПР9 ЗАВЕРШЕНО ===");
}

document.addEventListener("DOMContentLoaded", runAllTests);
