"use strict";

const JSONPLACEHOLDER = "https://jsonplaceholder.typicode.com";

// Удобный вывод результата в нужный блок.
function displayOutput(elementId, data, isError = false) {
  const output = document.getElementById(elementId);
  if (!output) return;

  const time = new Date().toLocaleTimeString();
  const text = typeof data === "object"
    ? JSON.stringify(data, null, 2)
    : String(data);

  output.textContent = `[${time}] ${text}`;
  output.className = `output ${isError ? "error" : "success"}`;
}

function delayWithPromise(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ===== ЗАДАНИЕ 1. ПРОМИСЫ =====

function createBasicPromise(shouldResolve = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve("Успех!");
      } else {
        reject(new Error("Ошибка!"));
      }
    }, 1000);
  });
}

function handleBasicPromise() {
  displayOutput("promise-output", "Ожидание результата...");

  return createBasicPromise(true)
    .then(result => {
      displayOutput("promise-output", result);
      return result;
    })
    .catch(error => {
      displayOutput("promise-output", error.message, true);
      throw error;
    });
}

function createPromiseChain() {
  displayOutput("promise-output", "Запуск цепочки...");

  return Promise.resolve("Шаг 1")
    .then(result => {
      displayOutput("promise-output", result);
      return delayWithPromise(500).then(() => `${result} -> Шаг 2`);
    })
    .then(result => {
      displayOutput("promise-output", result);
      return delayWithPromise(500).then(() => `${result} -> Шаг 3`);
    })
    .then(result => {
      displayOutput("promise-output", result);
      return delayWithPromise(500).then(() => `${result} -> Готово`);
    })
    .then(result => {
      displayOutput("promise-output", result);
      return result;
    });
}

function handlePromiseError() {
  displayOutput("promise-output", "Проверка ошибки...");

  return createBasicPromise(false)
    .catch(error => {
      displayOutput("promise-output", `Поймана ошибка: ${error.message}`, true);
      return error.message;
    });
}

function setupPromiseEvents() {
  document.getElementById("basic-promise")
    .addEventListener("click", handleBasicPromise);

  document.getElementById("promise-chain")
    .addEventListener("click", createPromiseChain);

  document.getElementById("promise-error")
    .addEventListener("click", handlePromiseError);
}

// ===== ЗАДАНИЕ 2. ASYNC/AWAIT =====

async function basicAsyncAwait() {
  displayOutput("async-output", "Ожидание...");
  await delayWithPromise(300);

  try {
    const result = await createBasicPromise(true);
    displayOutput("async-output", `Получено через await: ${result}`);
    return result;
  } catch (error) {
    displayOutput("async-output", error.message, true);
    throw error;
  }
}

async function handleAsyncError() {
  try {
    displayOutput("async-output", "Запуск операции с ошибкой...");
    await createBasicPromise(false);
  } catch (error) {
    displayOutput("async-output", `Ошибка обработана через try/catch: ${error.message}`, true);
    return error.message;
  }
}

async function parallelAsyncExecution() {
  const start = performance.now();

  const operations = [
    delayWithPromise(1000).then(() => "Операция 1"),
    delayWithPromise(1000).then(() => "Операция 2"),
    delayWithPromise(1000).then(() => "Операция 3")
  ];

  const results = await Promise.all(operations);
  const time = Math.round(performance.now() - start);

  displayOutput("async-output", {
    results,
    executionTime: `${time} мс`
  });

  return results;
}

function setupAsyncEvents() {
  document.getElementById("basic-async")
    .addEventListener("click", basicAsyncAwait);

  document.getElementById("async-error")
    .addEventListener("click", handleAsyncError);

  document.getElementById("async-parallel")
    .addEventListener("click", parallelAsyncExecution);
}

// ===== ЗАДАНИЕ 3. API =====

async function fetchUsers() {
  const container = document.getElementById("api-data");
  container.innerHTML = "";
  displayOutput("api-output", "Загрузка пользователей...");

  try {
    const response = await fetch(`${JSONPLACEHOLDER}/users`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const users = await response.json();

    users.forEach(user => {
      const card = document.createElement("div");
      card.className = "user-card";

      const title = document.createElement("h4");
      title.textContent = user.name;

      const email = document.createElement("p");
      email.textContent = `Email: ${user.email}`;

      const city = document.createElement("p");
      city.textContent = `Город: ${user.address.city}`;

      card.append(title, email, city);
      container.appendChild(card);
    });

    displayOutput("api-output", `Загружено пользователей: ${users.length}`);
    return users;
  } catch (error) {
    displayOutput("api-output", `Ошибка загрузки: ${error.message}`, true);
    return [];
  }
}

async function createPost() {
  const post = {
    title: "Новый пост",
    body: "Тестовый текст практической работы №13",
    userId: 1
  };

  try {
    const response = await fetch(`${JSONPLACEHOLDER}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(post)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    displayOutput("api-output", result);
    return result;
  } catch (error) {
    displayOutput("api-output", `Ошибка POST-запроса: ${error.message}`, true);
    return null;
  }
}

async function testApiError() {
  try {
    const response = await fetch(`${JSONPLACEHOLDER}/not-existing-route/123456`);

    if (!response.ok) {
      throw new Error(`HTTP ошибка: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    displayOutput("api-output", `Ошибка API: ${error.message}`, true);
    return null;
  }
}

function setupApiEvents() {
  document.getElementById("fetch-users")
    .addEventListener("click", fetchUsers);

  document.getElementById("fetch-post")
    .addEventListener("click", createPost);

  document.getElementById("fetch-error")
    .addEventListener("click", testApiError);
}

// ===== ЗАДАНИЕ 4. АСИНХРОННЫЕ ТАЙМЕРЫ =====

let intervalId = null;
let intervalCounter = 0;

async function startAsyncInterval() {
  if (intervalId !== null) {
    displayOutput("interval-output", "Интервал уже запущен");
    return;
  }

  intervalId = setInterval(async () => {
    await Promise.resolve();
    intervalCounter += 1;
    displayOutput("interval-output", `Интервал: ${intervalCounter}`);
  }, 1000);
}

function stopAsyncInterval() {
  clearInterval(intervalId);
  intervalId = null;
  intervalCounter = 0;
  displayOutput("interval-output", "Интервал: 0");
}

async function testDelay() {
  const output = document.getElementById("timer-output");

  output.textContent = "Таймер: старт";
  output.className = "output";

  await delayWithPromise(500);
  output.textContent = "Таймер: прошло 0.5 секунды";

  await delayWithPromise(500);
  output.textContent = "Таймер: прошла 1 секунда";

  await delayWithPromise(1000);
  output.textContent = "Таймер: прошло 2 секунды";
  output.className = "output success";
}

function setupTimerEvents() {
  document.getElementById("start-interval")
    .addEventListener("click", startAsyncInterval);

  document.getElementById("stop-interval")
    .addEventListener("click", stopAsyncInterval);

  document.getElementById("delay-promise")
    .addEventListener("click", testDelay);
}

// ===== ЗАДАНИЕ 5. ОБРАБОТКА ОШИБОК =====

async function asyncTryCatch() {
  try {
    const first = await Promise.resolve("Первая операция выполнена");

    try {
      await Promise.reject(new TypeError("Тестовая ошибка типа TypeError"));
    } catch (innerError) {
      if (innerError instanceof TypeError) {
        displayOutput(
          "error-output",
          `${first}. Внутренняя ошибка: ${innerError.message}`,
          true
        );
      } else {
        throw innerError;
      }
    }

    return first;
  } catch (error) {
    displayOutput("error-output", `Общая ошибка: ${error.message}`, true);
    return null;
  }
}

async function handleMultipleErrors() {
  const operations = [
    Promise.resolve("Успех 1"),
    Promise.reject(new Error("Ошибка 1")),
    delayWithPromise(200).then(() => "Успех 2"),
    Promise.reject(new Error("Ошибка 2"))
  ];

  const results = await Promise.allSettled(operations);
  const successCount = results.filter(item => item.status === "fulfilled").length;
  const errorCount = results.filter(item => item.status === "rejected").length;

  displayOutput("error-output", {
    success: successCount,
    errors: errorCount,
    results: results.map(item =>
      item.status === "fulfilled"
        ? item.value
        : item.reason.message
    )
  });

  return results;
}

async function retryWithBackoff(operation, maxRetries = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    try {
      return await operation(attempt);
    } catch (error) {
      lastError = error;

      if (attempt === maxRetries) {
        break;
      }

      const delay = 500 * (2 ** (attempt - 1));
      await delayWithPromise(delay);
    }
  }

  throw lastError;
}

async function testRetryPattern() {
  let calls = 0;

  try {
    const result = await retryWithBackoff(async () => {
      calls += 1;

      if (calls < 3) {
        throw new Error(`Неудачная попытка ${calls}`);
      }

      return `Успешно с попытки ${calls}`;
    }, 3);

    displayOutput("error-output", result);
    return result;
  } catch (error) {
    displayOutput("error-output", `Все попытки закончились ошибкой: ${error.message}`, true);
    return null;
  }
}

function setupErrorEvents() {
  document.getElementById("try-catch")
    .addEventListener("click", asyncTryCatch);

  document.getElementById("multiple-errors")
    .addEventListener("click", handleMultipleErrors);

  document.getElementById("retry-pattern")
    .addEventListener("click", testRetryPattern);
}

// ===== ЗАДАНИЕ 6. ПАРАЛЛЕЛЬНЫЕ ОПЕРАЦИИ =====

async function demonstratePromiseAll() {
  const start = performance.now();

  const promises = [300, 500, 700, 900, 1100].map((ms, index) =>
    delayWithPromise(ms).then(() => `Промис ${index + 1}: ${ms} мс`)
  );

  const results = await Promise.all(promises);
  const time = Math.round(performance.now() - start);

  displayOutput("parallel-output", {
    method: "Promise.all",
    executionTime: `${time} мс`,
    results
  });

  return results;
}

async function demonstratePromiseRace() {
  const promises = [
    delayWithPromise(900).then(() => "Медленный промис"),
    delayWithPromise(300).then(() => "Самый быстрый промис"),
    delayWithPromise(600).then(() => "Средний промис")
  ];

  const firstResult = await Promise.race(promises);
  displayOutput("parallel-output", `Promise.race вернул: ${firstResult}`);
  return firstResult;
}

async function demonstratePromiseAllSettled() {
  const promises = [
    Promise.resolve("A"),
    Promise.reject(new Error("Ошибка B")),
    delayWithPromise(200).then(() => "C"),
    Promise.reject(new Error("Ошибка D"))
  ];

  const results = await Promise.allSettled(promises);
  const fulfilled = results.filter(item => item.status === "fulfilled").length;
  const rejected = results.filter(item => item.status === "rejected").length;

  displayOutput("parallel-output", {
    fulfilled,
    rejected,
    results: results.map(item =>
      item.status === "fulfilled"
        ? item.value
        : item.reason.message
    )
  });

  return results;
}

function setupParallelEvents() {
  document.getElementById("promise-all")
    .addEventListener("click", demonstratePromiseAll);

  document.getElementById("promise-race")
    .addEventListener("click", demonstratePromiseRace);

  document.getElementById("promise-allSettled")
    .addEventListener("click", demonstratePromiseAllSettled);
}

// ===== ЗАДАНИЕ 7. РЕАЛЬНЫЕ СЦЕНАРИИ =====

async function sequentialApiRequests() {
  try {
    displayOutput("scenario-output", "1. Получаем пользователя...");

    const userResponse = await fetch(`${JSONPLACEHOLDER}/users/1`);
    if (!userResponse.ok) throw new Error(`Пользователь: HTTP ${userResponse.status}`);
    const user = await userResponse.json();

    displayOutput("scenario-output", "2. Получаем посты пользователя...");

    const postsResponse = await fetch(`${JSONPLACEHOLDER}/posts?userId=${user.id}`);
    if (!postsResponse.ok) throw new Error(`Посты: HTTP ${postsResponse.status}`);
    const posts = await postsResponse.json();

    if (!posts.length) {
      throw new Error("У пользователя нет постов");
    }

    displayOutput("scenario-output", "3. Получаем комментарии к первому посту...");

    const commentsResponse = await fetch(
      `${JSONPLACEHOLDER}/comments?postId=${posts[0].id}`
    );

    if (!commentsResponse.ok) {
      throw new Error(`Комментарии: HTTP ${commentsResponse.status}`);
    }

    const comments = await commentsResponse.json();

    const result = {
      user: user.name,
      postsCount: posts.length,
      firstPost: posts[0].title,
      commentsCount: comments.length
    };

    displayOutput("scenario-output", result);
    return result;
  } catch (error) {
    displayOutput("scenario-output", `Ошибка: ${error.message}`, true);
    return null;
  }
}

async function simulateFileUpload() {
  const progressFill = document.getElementById("progress-fill");
  let progress = 0;

  progressFill.style.width = "0%";
  displayOutput("scenario-output", "Загрузка началась...");

  await new Promise(resolve => {
    const timer = setInterval(() => {
      progress += 10;
      progressFill.style.width = `${progress}%`;
      displayOutput("scenario-output", `Загрузка: ${progress}%`);

      if (progress >= 100) {
        clearInterval(timer);
        resolve();
      }
    }, 100);
  });

  displayOutput("scenario-output", "Файл успешно загружен");
  return true;
}

function createRequestCache() {
  const cache = new Map();

  return async function cachedRequest(url) {
    if (cache.has(url)) {
      return {
        source: "cache",
        data: cache.get(url)
      };
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    cache.set(url, data);

    return {
      source: "network",
      data
    };
  };
}

const cachedRequest = createRequestCache();

async function testRequestCache() {
  const url = `${JSONPLACEHOLDER}/users/1`;

  try {
    const first = await cachedRequest(url);
    const second = await cachedRequest(url);

    displayOutput("scenario-output", {
      firstRequest: first.source,
      secondRequest: second.source,
      user: second.data.name
    });

    return [first, second];
  } catch (error) {
    displayOutput("scenario-output", `Ошибка кэша: ${error.message}`, true);
    return null;
  }
}

function setupRealScenarioEvents() {
  document.getElementById("sequential-requests")
    .addEventListener("click", sequentialApiRequests);

  document.getElementById("upload-simulation")
    .addEventListener("click", simulateFileUpload);

  document.getElementById("cache-requests")
    .addEventListener("click", testRequestCache);
}

// ===== ИНИЦИАЛИЗАЦИЯ =====

function initializeAsyncOperations() {
  setupPromiseEvents();
  setupAsyncEvents();
  setupApiEvents();
  setupTimerEvents();
  setupErrorEvents();
  setupParallelEvents();
  setupRealScenarioEvents();

  console.log("Все асинхронные обработчики инициализированы");
}

document.addEventListener("DOMContentLoaded", initializeAsyncOperations);
