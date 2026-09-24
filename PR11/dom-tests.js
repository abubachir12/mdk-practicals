"use strict";

function domTest(name, condition) {
  const container = document.getElementById("test-results");
  const item = document.createElement("div");
  item.className = condition ? "test-pass" : "test-fail";
  item.textContent = `${condition ? "УСПЕХ" : "ОШИБКА"}: ${name}`;
  container.appendChild(item);
  console.log(`${name}: ${condition ? "УСПЕХ" : "ОШИБКА"}`);
}

function runDomTests() {
  console.log("=== ЗАПУСК ТЕСТОВ ПР11 ===");

  domTest("countChildren возвращает 3", countChildren() === 3);
  domTest(
    "findSpecialChild находит особый элемент",
    findSpecialChild() === "Особый дочерний элемент"
  );

  const background = getParentBackground();
  domTest(
    "getParentBackground возвращает цвет",
    typeof background === "string" && background.length > 0
  );

  const testCard = createCard("Тест", "Тестовый текст");
  domTest(
    "createCard создает .card",
    testCard.classList.contains("card") &&
      testCard.querySelector("h4").textContent === "Тест"
  );

  const list = createList(["A", "B", "C"]);
  domTest("createList создает 3 элемента", list.children.length === 3);

  const valid = validateForm({
    name: "Иван",
    email: "ivan@example.com",
    age: 20
  });
  domTest("validateForm принимает корректные данные", valid === null);

  const invalid = validateForm({
    name: "И",
    email: "wrong",
    age: 200
  });
  domTest(
    "validateForm находит 3 ошибки",
    invalid &&
      Object.keys(invalid).length === 3 &&
      invalid.name &&
      invalid.email &&
      invalid.age
  );

  console.log("=== ТЕСТИРОВАНИЕ ПР11 ЗАВЕРШЕНО ===");
}

document.addEventListener("DOMContentLoaded", () => {
  // Запускаем после основной инициализации страницы.
  setTimeout(runDomTests, 0);
});
