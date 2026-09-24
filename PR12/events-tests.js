"use strict";

function eventTest(name, condition) {
  const container = document.getElementById("test-results");
  const item = document.createElement("div");
  item.className = condition ? "test-pass" : "test-fail";
  item.textContent = `${condition ? "УСПЕХ" : "ОШИБКА"}: ${name}`;
  container.appendChild(item);
  console.log(`${name}: ${condition ? "УСПЕХ" : "ОШИБКА"}`);
}

function runEventTests() {
  console.log("=== ЗАПУСК ТЕСТОВ ПР12 ===");

  const before = document.querySelectorAll("#item-list .item").length;
  const newItem = addNewItem();
  const after = document.querySelectorAll("#item-list .item").length;

  eventTest("addNewItem добавляет элемент", after === before + 1);
  eventTest("новый элемент имеет data-id", Boolean(newItem.dataset.id));

  const form = document.getElementById("prevent-form");
  const input = document.getElementById("prevent-input");

  input.value = "";
  const emptyEvent = new Event("submit", { cancelable: true });
  const emptyResult = preventFormSubmit(emptyEvent);
  eventTest("preventFormSubmit отклоняет пустое поле", emptyResult === false);
  eventTest("preventDefault вызван", emptyEvent.defaultPrevented === true);

  input.value = "Тест";
  const filledEvent = new Event("submit", { cancelable: true });
  const filledResult = preventFormSubmit(filledEvent);
  eventTest("preventFormSubmit принимает текст", filledResult === true);

  let customReceived = false;
  const customHandler = () => {
    customReceived = true;
  };
  document.addEventListener("customAction", customHandler, { once: true });
  triggerCustomEvent();
  eventTest("CustomEvent создается и обрабатывается", customReceived === true);

  let debounceCalls = 0;
  const debounced = createDebounce(() => {
    debounceCalls += 1;
  }, 50);

  debounced();
  debounced();
  debounced();

  setTimeout(() => {
    eventTest("createDebounce объединяет быстрые вызовы", debounceCalls === 1);
  }, 90);

  let throttleCalls = 0;
  const throttled = createThrottle(() => {
    throttleCalls += 1;
  }, 80);

  throttled();
  throttled();
  throttled();

  setTimeout(() => {
    eventTest(
      "createThrottle ограничивает частоту",
      throttleCalls >= 1 && throttleCalls <= 2
    );
  }, 120);

  console.log("=== ТЕСТИРОВАНИЕ ПР12 ЗАПУЩЕНО ===");
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(runEventTests, 0);
});
