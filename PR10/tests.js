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

function runAllTests() {
  console.log("=== ЗАПУСК ТЕСТОВ ПР10 ===");

  runTest("sum()", sum(), 0);
  runTest("sum(1, 2, 3, 4)", sum(1, 2, 3, 4), 10);

  runTest(
    "createUser без email",
    createUser({ name: "Иван", age: 20 }),
    "Пользователь: Иван, возраст: 20, email: не указан"
  );

  runTest(
    "createUser с email",
    createUser({ name: "Анна", age: 19, email: "anna@example.com" }),
    "Пользователь: Анна, возраст: 19, email: anna@example.com"
  );

  const getSecret = secretMessage("1234", "Секрет открыт");
  runTest("secretMessage правильный пароль", getSecret("1234"), "Секрет открыт");
  runTest("secretMessage неправильный пароль", getSecret("0000"), "Доступ запрещен");

  const double = x => x * 2;
  const addThree = x => x + 3;
  runTest("compose(double, addThree)(5)", compose(double, addThree)(5), 16);

  runTest("myMap", myMap([1, 2, 3], x => x * 2), [2, 4, 6]);
  runTest("myFilter", myFilter([1, 2, 3, 4], x => x % 2 === 0), [2, 4]);
  runTest("myReduce", myReduce([1, 2, 3, 4], (a, b) => a + b, 0), 10);

  const multiply = (a, b, c) => a * b * c;
  runTest("curry", curry(multiply)(2)(3)(4), 24);

  let calculations = 0;
  const squared = memoize(x => {
    calculations += 1;
    return x * x;
  });
  squared(5);
  squared(5);
  runTest("memoize результат", squared(5), 25);
  runTest("memoize использует кэш", calculations, 1);

  const validator = createValidator({
    minLength: 6,
    requireNumber: true,
    requireUppercase: true
  });
  runTest("createValidator valid", validator("Hello1"), true);
  runTest("createValidator без цифры", validator("Hello!"), false);
  runTest("createValidator без uppercase", validator("hello1"), false);

  // Небольшая асинхронная проверка debounce.
  let debounceCalls = 0;
  const debounced = debounce(() => {
    debounceCalls += 1;
  }, 80);

  debounced();
  debounced();
  debounced();

  setTimeout(() => {
    runTest("debounce после серии вызовов", debounceCalls, 1);
  }, 140);

  // Небольшая асинхронная проверка throttle.
  let throttleCalls = 0;
  const throttled = throttle(() => {
    throttleCalls += 1;
  }, 100);

  throttled();
  throttled();
  throttled();

  setTimeout(() => {
    runTest("throttle ограничивает частоту", throttleCalls >= 1 && throttleCalls <= 2, true);
  }, 160);

  console.log("=== ТЕСТИРОВАНИЕ ПР10 ЗАПУЩЕНО ===");
}

document.addEventListener("DOMContentLoaded", runAllTests);
