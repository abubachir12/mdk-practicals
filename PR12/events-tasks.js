"use strict";

// ЗАДАНИЕ 1: Базовые обработчики событий

function handleBasicClick(event) {
  const output = document.getElementById("basic-output");
  const targetName = event.target.tagName.toLowerCase();

  output.textContent =
    `Тип: ${event.type}; координаты: (${event.clientX}, ${event.clientY}); target: ${targetName}`;

  event.currentTarget.classList.add("pulse");
  setTimeout(() => event.currentTarget.classList.remove("pulse"), 500);
}

function handleMouseEvents(event) {
  const box = document.getElementById("color-box");
  const output = document.getElementById("mouse-output");

  if (event.type === "mouseenter") {
    box.style.background = "#e74c3c";
  }

  if (event.type === "mouseleave") {
    box.style.background = "#3498db";
  }

  if (event.type === "mousemove") {
    output.textContent =
      `Координаты мыши: clientX=${event.clientX}, clientY=${event.clientY}`;
  }
}

function setupBasicEvents() {
  const button = document.getElementById("basic-btn");
  const box = document.getElementById("color-box");

  button.addEventListener("click", handleBasicClick);
  ["mouseenter", "mouseleave", "mousemove"].forEach(type => {
    box.addEventListener(type, handleMouseEvents);
  });
}

// ЗАДАНИЕ 2: События клавиатуры

function handleKeyEvents(event) {
  const output = document.getElementById("key-output");

  const info =
    `key=${event.key}; code=${event.code}; ctrl=${event.ctrlKey}; ` +
    `alt=${event.altKey}; shift=${event.shiftKey}`;

  let specialMessage = "";

  if (event.ctrlKey && event.key.toLowerCase() === "s") {
    event.preventDefault();
    specialMessage = "Комбинация Ctrl+S перехвачена.";
  } else if (event.altKey && event.key.toLowerCase() === "c") {
    event.preventDefault();
    specialMessage = "Комбинация Alt+C перехвачена.";
  } else if (event.shiftKey && event.key.toLowerCase() === "a") {
    event.preventDefault();
    specialMessage = "Комбинация Shift+A перехвачена.";
  }

  output.textContent = specialMessage ? `${info}. ${specialMessage}` : info;
}

function setupKeyboardEvents() {
  const input = document.getElementById("key-input");
  const output = document.getElementById("key-output");

  input.addEventListener("keydown", handleKeyEvents);
  input.addEventListener("keyup", event => {
    output.dataset.lastKeyUp = event.code;
  });
}

// ЗАДАНИЕ 3: Делегирование событий

function updateDelegationOutput() {
  const selected = [...document.querySelectorAll("#item-list .item.selected")]
    .map(item => item.dataset.id);

  document.getElementById("delegation-output").textContent =
    `Выбранные элементы: ${selected.length ? selected.join(", ") : "нет"}`;
}

function handleDelegationClick(event) {
  const deleteControl = event.target.closest(".delete");

  if (deleteControl) {
    const item = deleteControl.closest(".item");
    if (item) item.remove();
    updateDelegationOutput();
    return;
  }

  const item = event.target.closest(".item");
  if (item && document.getElementById("item-list").contains(item)) {
    item.classList.toggle("selected");
    updateDelegationOutput();
  }
}

function addNewItem() {
  const list = document.getElementById("item-list");
  const ids = [...list.querySelectorAll(".item")]
    .map(item => Number(item.dataset.id))
    .filter(Number.isFinite);

  const nextId = ids.length ? Math.max(...ids) + 1 : 1;

  const item = document.createElement("div");
  item.className = "item";
  item.dataset.id = String(nextId);
  item.append(document.createTextNode(`Элемент ${nextId} `));

  const deleteControl = document.createElement("span");
  deleteControl.className = "delete";
  deleteControl.textContent = "×";
  item.appendChild(deleteControl);

  list.appendChild(item);
  return item;
}

function setupDelegationEvents() {
  document.getElementById("item-list")
    .addEventListener("click", handleDelegationClick);

  document.getElementById("add-item-btn")
    .addEventListener("click", addNewItem);
}

// ЗАДАНИЕ 4: Предотвращение стандартного поведения

function preventLinkDefault(event) {
  event.preventDefault();

  const output = document.getElementById("prevention-output");
  output.textContent = "Переход по ссылке предотвращен.";

  event.currentTarget.classList.add("shake");
  setTimeout(() => event.currentTarget.classList.remove("shake"), 450);
}

function preventFormSubmit(event) {
  event.preventDefault();

  const input = document.getElementById("prevent-input");
  const output = document.getElementById("prevention-output");
  const value = input.value.trim();

  if (!value) {
    output.textContent = "Ошибка: поле формы не должно быть пустым.";
    return false;
  }

  output.textContent = `Форма перехвачена. Введено: ${value}`;
  return true;
}

function setupPreventionEvents() {
  document.getElementById("prevent-link")
    .addEventListener("click", preventLinkDefault);

  document.getElementById("prevent-form")
    .addEventListener("submit", preventFormSubmit);
}

// ЗАДАНИЕ 5: Кастомные события

function triggerCustomEvent() {
  const customEvent = new CustomEvent("customAction", {
    detail: {
      message: "Привет от кастомного события!"
    }
  });

  document.dispatchEvent(customEvent);
}

function handleCustomEvent(event) {
  const output = document.getElementById("custom-output");
  output.textContent = `Кастомное событие: ${event.detail.message}`;

  const button = document.getElementById("trigger-custom");
  button.classList.add("pulse");
  setTimeout(() => button.classList.remove("pulse"), 500);
}

let extraListenersAdded = false;

function setupMultipleListeners() {
  const output = document.getElementById("custom-output");

  if (extraListenersAdded) {
    output.textContent = "Дополнительные обработчики уже добавлены.";
    return;
  }

  document.addEventListener("customAction", () => {
    const output = document.getElementById("custom-output");
    output.textContent += " | Обработчик 1";
  });

  document.addEventListener("customAction", () => {
    const output = document.getElementById("custom-output");
    output.textContent += " | Обработчик 2";
  });

  document.addEventListener("customAction", () => {
    const output = document.getElementById("custom-output");
    output.textContent += " | Обработчик 3";
  });

  extraListenersAdded = true;
  output.textContent = "Добавлены 3 дополнительных обработчика customAction.";
}

function setupCustomEvents() {
  document.addEventListener("customAction", handleCustomEvent);

  document.getElementById("trigger-custom")
    .addEventListener("click", triggerCustomEvent);

  document.getElementById("multiple-listeners")
    .addEventListener("click", setupMultipleListeners);
}

// ЗАДАНИЕ 6: Загрузка и ошибки

function loadImageWithEvents() {
  const container = document.getElementById("image-container");
  const output = document.getElementById("loading-output");
  const image = new Image();

  container.textContent = "";
  output.textContent = "Статус загрузки: начало загрузки...";

  image.addEventListener("loadstart", () => {
    output.textContent = "Статус загрузки: loadstart";
  });

  image.addEventListener("load", () => {
    output.textContent = "Статус загрузки: изображение загружено.";
    container.appendChild(image);
    image.dispatchEvent(new Event("loadend"));
  });

  image.addEventListener("error", () => {
    output.textContent = "Статус загрузки: ошибка.";
    image.dispatchEvent(new Event("loadend"));
  });

  image.addEventListener("loadend", () => {
    console.log("loadend для изображения");
  });

  image.alt = "Случайное изображение";
  image.dispatchEvent(new Event("loadstart"));
  image.src = `https://picsum.photos/300/200?time=${Date.now()}`;
  return image;
}

function simulateLoadError() {
  const output = document.getElementById("loading-output");
  const image = new Image();

  output.textContent = "Статус загрузки: попытка загрузить неверный URL...";

  image.addEventListener("error", () => {
    output.textContent = "Статус загрузки: ошибка обработана корректно.";
  });

  image.src = `https://example.invalid/image-${Date.now()}.jpg`;
  return image;
}

function setupLoadingEvents() {
  document.getElementById("load-image")
    .addEventListener("click", loadImageWithEvents);

  document.getElementById("load-error")
    .addEventListener("click", simulateLoadError);
}

// ЗАДАНИЕ 7: Таймеры и асинхронные события

let timerInterval = null;
let timerValue = 0;

function startTimer() {
  if (timerInterval !== null) return;

  timerInterval = setInterval(() => {
    timerValue += 1;
    document.getElementById("timer-output").textContent = `Таймер: ${timerValue}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerValue = 0;
  document.getElementById("timer-output").textContent = "Таймер: 0";
}

function createDebounce(func, delay) {
  let timeoutId;

  return function debounced(...args) {
    const context = this;
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

function createThrottle(func, interval) {
  let lastCall = 0;
  let timeoutId = null;
  let latestArgs;
  let latestContext;

  return function throttled(...args) {
    const now = Date.now();
    const remaining = interval - (now - lastCall);
    latestArgs = args;
    latestContext = this;

    if (remaining <= 0) {
      clearTimeout(timeoutId);
      timeoutId = null;
      lastCall = now;
      func.apply(latestContext, latestArgs);
      latestArgs = latestContext = null;
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        timeoutId = null;
        func.apply(latestContext, latestArgs);
        latestArgs = latestContext = null;
      }, remaining);
    }
  };
}

function testDebounce() {
  const output = document.getElementById("async-output");
  let normalCalls = 0;
  let debounceCalls = 0;

  function normalFunction() {
    normalCalls += 1;
  }

  const debouncedFunction = createDebounce(() => {
    debounceCalls += 1;
    output.textContent =
      `Обычные вызовы: ${normalCalls}; после debounce: ${debounceCalls}`;
  }, 300);

  for (let i = 0; i < 5; i += 1) {
    normalFunction();
    debouncedFunction();
  }

  output.textContent =
    `Обычные вызовы: ${normalCalls}; debounce ожидает завершения серии...`;
}

function testThrottle() {
  const output = document.getElementById("async-output");
  let normalCalls = 0;
  let throttleCalls = 0;

  function normalFunction() {
    normalCalls += 1;
  }

  const throttledFunction = createThrottle(() => {
    throttleCalls += 1;
    output.textContent =
      `Обычные вызовы: ${normalCalls}; после throttle: ${throttleCalls}`;
  }, 300);

  for (let i = 0; i < 5; i += 1) {
    normalFunction();
    throttledFunction();
  }

  setTimeout(() => {
    output.textContent =
      `Обычные вызовы: ${normalCalls}; после throttle: ${throttleCalls}`;
  }, 350);
}

function setupTimerEvents() {
  document.getElementById("start-timer")
    .addEventListener("click", startTimer);

  document.getElementById("stop-timer")
    .addEventListener("click", stopTimer);

  document.getElementById("debounce-btn")
    .addEventListener("click", testDebounce);

  document.getElementById("throttle-btn")
    .addEventListener("click", testThrottle);
}

function setupEventPractice() {
  setupBasicEvents();
  setupKeyboardEvents();
  setupDelegationEvents();
  setupPreventionEvents();
  setupCustomEvents();
  setupLoadingEvents();
  setupTimerEvents();
}

document.addEventListener("DOMContentLoaded", setupEventPractice);
