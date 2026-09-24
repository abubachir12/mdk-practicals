"use strict";

// ЗАДАНИЕ 1: Создание и вставка элементов

function createCard(title, content) {
  const target = document.getElementById("target1");

  const card = document.createElement("div");
  card.className = "card";

  const heading = document.createElement("h4");
  heading.textContent = title;

  const paragraph = document.createElement("p");
  paragraph.textContent = content;

  card.append(heading, paragraph);
  target.appendChild(card);

  return card;
}

function createList(items) {
  const target = document.getElementById("target1");
  const list = document.createElement("ol");

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });

  target.appendChild(list);
  return list;
}

// ЗАДАНИЕ 2: Навигация по DOM

function countChildren() {
  return document.getElementById("parent-element").children.length;
}

function findSpecialChild() {
  const special = document.querySelector("#parent-element .special");
  return special ? special.textContent.trim() : null;
}

function getParentBackground() {
  const child = document.querySelector(".child");
  if (!child || !child.parentElement) return null;
  return getComputedStyle(child.parentElement).backgroundColor;
}

// ЗАДАНИЕ 3: Работа с классами и стилями

function setupStyleToggle() {
  const button = document.getElementById("toggle-style");
  const target = document.getElementById("style-target");

  button.addEventListener("click", () => {
    target.classList.toggle("active-style");
  });
}

function changeHeaderColor() {
  const header = document.getElementById("main-header");
  const randomColor = `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;

  header.style.background = randomColor;
  return randomColor;
}

function animateElement() {
  const target = document.getElementById("style-target");

  target.style.transform = "scale(1.08)";
  target.style.opacity = "0.55";

  setTimeout(() => {
    target.style.transform = "";
    target.style.opacity = "";
  }, 500);
}

// ЗАДАНИЕ 4: Обработка событий

function setupClickCounter() {
  const button = document.getElementById("click-btn");
  const output = document.getElementById("click-counter");
  let count = 0;

  button.addEventListener("click", () => {
    count += 1;
    output.textContent = `Кликов: ${count}`;
  });
}

function setupInputDisplay() {
  const input = document.getElementById("text-input");
  const output = document.getElementById("input-display");

  input.addEventListener("input", () => {
    output.textContent = input.value;
  });
}

function setupKeyboardEvents() {
  document.addEventListener("keydown", event => {
    console.log(`keydown: key=${event.key}, code=${event.code}`);
  });

  document.addEventListener("keyup", event => {
    console.log(`keyup: key=${event.key}, code=${event.code}`);
  });
}

// ЗАДАНИЕ 5: Динамические списки

function addListItem() {
  const input = document.getElementById("item-input");
  const list = document.getElementById("dynamic-list");
  const value = input.value.trim();

  if (!value) return null;

  const li = document.createElement("li");
  li.className = "list-item";

  const text = document.createElement("span");
  text.textContent = value;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-btn";
  deleteButton.textContent = "Удалить";

  li.append(text, deleteButton);
  list.appendChild(li);

  input.value = "";
  input.focus();

  return li;
}

function removeListItem(event) {
  const deleteButton = event.target.closest(".delete-btn");
  if (!deleteButton) return false;

  const item = deleteButton.closest(".list-item");
  if (item) item.remove();

  return Boolean(item);
}

function clearList() {
  document.getElementById("dynamic-list").textContent = "";
}

function setupListEvents() {
  const addButton = document.getElementById("add-item");
  const clearButton = document.getElementById("clear-list");
  const list = document.getElementById("dynamic-list");
  const input = document.getElementById("item-input");

  addButton.addEventListener("click", addListItem);
  clearButton.addEventListener("click", clearList);
  list.addEventListener("click", removeListItem);

  input.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      addListItem();
    }
  });
}

// ЗАДАНИЕ 6: Формы и валидация

function validateForm(formData) {
  const errors = {};

  const name = String(formData.name || "").trim();
  const email = String(formData.email || "").trim();
  const age = Number(formData.age);

  if (name.length < 2) {
    errors.name = "Имя должно содержать минимум 2 символа.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)) {
    errors.email = "Введите корректный email.";
  }

  if (!Number.isFinite(age) || age < 1 || age > 120) {
    errors.age = "Возраст должен быть числом от 1 до 120.";
  }

  return Object.keys(errors).length ? errors : null;
}

function displayFormErrors(errors) {
  const output = document.getElementById("form-output");
  output.textContent = "";

  Object.values(errors).forEach(message => {
    const item = document.createElement("div");
    item.className = "error-message";
    item.textContent = message;
    output.appendChild(item);
  });
}

function displayFormSuccess(userData) {
  const output = document.getElementById("form-output");
  output.textContent = "";

  const success = document.createElement("div");
  success.className = "success-message";

  const title = document.createElement("strong");
  title.textContent = "Данные успешно отправлены";

  const details = document.createElement("p");
  details.textContent = `Имя: ${userData.name}; Email: ${userData.email}; Возраст: ${userData.age}`;

  success.append(title, details);
  output.appendChild(success);
}

function handleFormSubmit(event) {
  event.preventDefault();

  const userData = {
    name: document.getElementById("user-name").value.trim(),
    email: document.getElementById("user-email").value.trim(),
    age: document.getElementById("user-age").value
  };

  const errors = validateForm(userData);

  if (errors) {
    displayFormErrors(errors);
    return false;
  }

  displayFormSuccess(userData);
  return true;
}

function setupForm() {
  document.getElementById("user-form").addEventListener("submit", handleFormSubmit);
}

function setupDomPractice() {
  setupStyleToggle();
  setupClickCounter();
  setupInputDisplay();
  setupKeyboardEvents();
  setupListEvents();
  setupForm();


  // Демонстрация создания элементов.
  createCard("DOM-карточка", "Карточка создана функцией createCard().");
  createList(["Создание", "Изменение", "Удаление элементов"]);
}

document.addEventListener("DOMContentLoaded", setupDomPractice);
