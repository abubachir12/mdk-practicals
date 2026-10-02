"use strict";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

function displayOutput(elementId, data, isError = false) {
  const output = document.getElementById(elementId);
  if (!output) return;

  const time = new Date().toLocaleTimeString();
  const content = typeof data === "object"
    ? JSON.stringify(data, null, 2)
    : String(data);

  output.textContent = `[${time}] ${content}`;
  output.className = `output ${isError ? "error" : "success"}`;
}

function displayData(elementId, data, type = "json") {
  const container = document.getElementById(elementId);
  if (!container) return;

  container.innerHTML = "";

  if (type === "users" && Array.isArray(data)) {
    data.forEach(user => {
      const card = document.createElement("div");
      card.className = "user-card";
      card.innerHTML = `
        <h4>${user.name}</h4>
        <p>Email: ${user.email}</p>
        <p>Телефон: ${user.phone}</p>
      `;
      container.appendChild(card);
    });
    return;
  }

  if (type === "posts" && Array.isArray(data)) {
    data.forEach(post => {
      const card = document.createElement("div");
      card.className = "post-card";
      card.innerHTML = `
        <h4>${post.title}</h4>
        <p>${post.body}</p>
        <small>ID: ${post.id}</small>
      `;
      container.appendChild(card);
    });
    return;
  }

  const pre = document.createElement("pre");
  pre.className = "json-view";
  pre.textContent = JSON.stringify(data, null, 2);
  container.appendChild(pre);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkedFetch(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText || "Ошибка запроса"}`);
  }

  return response;
}

// ===== ЗАДАНИЕ 1. GET =====

async function fetchGetRequest() {
  try {
    displayOutput("get-output", "Загрузка...");
    const response = await checkedFetch(`${API_BASE_URL}/posts/1`);
    const data = await response.json();

    displayOutput("get-output", data);
    return data;
  } catch (error) {
    displayOutput("get-output", error.message, true);
    return null;
  }
}

async function fetchJsonData() {
  const container = document.getElementById("get-data");
  container.innerHTML = "";

  try {
    const response = await checkedFetch(`${API_BASE_URL}/users`);
    const users = await response.json();

    displayData("get-data", users, "users");
    displayOutput("get-output", `Получено пользователей: ${users.length}`);
    return users;
  } catch (error) {
    displayOutput("get-output", error.message, true);
    return [];
  }
}

async function fetchWithError() {
  try {
    const response = await fetch(`${API_BASE_URL}/not-existing-page/999`);

    if (!response.ok) {
      throw new Error(
        `HTTP ошибка: сервер ответил статусом ${response.status}. ` +
        "Fetch сам по себе не делает reject для 404."
      );
    }

    return await response.json();
  } catch (error) {
    displayOutput("get-output", error.message, true);
    return null;
  }
}

function setupGetRequests() {
  document.getElementById("fetch-get")
    .addEventListener("click", fetchGetRequest);

  document.getElementById("fetch-json")
    .addEventListener("click", fetchJsonData);

  document.getElementById("fetch-error")
    .addEventListener("click", fetchWithError);
}

// ===== ЗАДАНИЕ 2. CRUD =====

async function fetchPostRequest() {
  const newPost = {
    title: "Новый пост",
    body: "Пост создан с помощью Fetch API",
    userId: 1
  };

  try {
    const response = await checkedFetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(newPost)
    });

    const data = await response.json();
    displayOutput("crud-output", data);
    return data;
  } catch (error) {
    displayOutput("crud-output", error.message, true);
    return null;
  }
}

async function fetchPutRequest() {
  const updatedPost = {
    id: 1,
    title: "Пост полностью обновлен",
    body: "PUT заменяет представление ресурса целиком",
    userId: 1
  };

  try {
    const response = await checkedFetch(`${API_BASE_URL}/posts/1`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(updatedPost)
    });

    const data = await response.json();
    displayOutput("crud-output", data);
    return data;
  } catch (error) {
    displayOutput("crud-output", error.message, true);
    return null;
  }
}

async function fetchPatchRequest() {
  try {
    const response = await checkedFetch(`${API_BASE_URL}/posts/1`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        title: "Изменен только заголовок через PATCH"
      })
    });

    const data = await response.json();

    displayOutput("crud-output", {
      explanation: "PUT обычно передает ресурс целиком, PATCH изменяет отдельные поля.",
      result: data
    });

    return data;
  } catch (error) {
    displayOutput("crud-output", error.message, true);
    return null;
  }
}

async function fetchDeleteRequest() {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/1`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error(`DELETE завершился со статусом ${response.status}`);
    }

    displayOutput("crud-output", `Пост удален. Статус ответа: ${response.status}`);
    return response.status;
  } catch (error) {
    displayOutput("crud-output", error.message, true);
    return null;
  }
}

function setupCrudRequests() {
  document.getElementById("fetch-post")
    .addEventListener("click", fetchPostRequest);

  document.getElementById("fetch-put")
    .addEventListener("click", fetchPutRequest);

  document.getElementById("fetch-patch")
    .addEventListener("click", fetchPatchRequest);

  document.getElementById("fetch-delete")
    .addEventListener("click", fetchDeleteRequest);
}

// ===== ЗАДАНИЕ 3. ЗАГОЛОВКИ И ПАРАМЕТРЫ =====

async function fetchWithHeaders() {
  const customHeaders = {
    "X-Custom-Header": "PR14-Demo",
    "Authorization": "Bearer demo-token"
  };

  try {
    const response = await checkedFetch(`${API_BASE_URL}/posts?_limit=1`, {
      headers: customHeaders
    });

    const data = await response.json();

    displayOutput("headers-output", {
      sentHeaders: customHeaders,
      receivedItems: data.length
    });

    return data;
  } catch (error) {
    displayOutput("headers-output", error.message, true);
    return null;
  }
}

async function fetchWithAuth() {
  const basic = `Basic ${btoa("student:password")}`;
  const bearer = "Bearer demo-token";

  try {
    const [basicResponse, bearerResponse] = await Promise.all([
      checkedFetch(`${API_BASE_URL}/posts/1`, {
        headers: { Authorization: basic }
      }),
      checkedFetch(`${API_BASE_URL}/posts/2`, {
        headers: { Authorization: bearer }
      })
    ]);

    const [basicData, bearerData] = await Promise.all([
      basicResponse.json(),
      bearerResponse.json()
    ]);

    displayOutput("headers-output", {
      basicAuth: `Статус ${basicResponse.status}`,
      bearerAuth: `Статус ${bearerResponse.status}`,
      note: "JSONPlaceholder не проверяет учетные данные. В реальном API неверный токен обычно дает 401/403.",
      examples: [basicData.id, bearerData.id]
    });

    return [basicData, bearerData];
  } catch (error) {
    displayOutput("headers-output", `Ошибка авторизации/запроса: ${error.message}`, true);
    return null;
  }
}

async function fetchWithParams() {
  const params = new URLSearchParams({
    _limit: "5",
    _sort: "id",
    _order: "desc"
  });

  const url = `${API_BASE_URL}/posts?${params.toString()}`;

  try {
    const response = await checkedFetch(url);
    const posts = await response.json();

    displayOutput("headers-output", {
      url,
      count: posts.length,
      ids: posts.map(post => post.id)
    });

    return posts;
  } catch (error) {
    displayOutput("headers-output", error.message, true);
    return [];
  }
}

async function fetchWithTimeout() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);
  const start = performance.now();

  try {
    const response = await checkedFetch(`${API_BASE_URL}/posts/1`, {
      signal: controller.signal
    });

    const data = await response.json();
    const time = Math.round(performance.now() - start);

    displayOutput("headers-output", {
      result: "Запрос успел выполниться до таймаута",
      executionTime: `${time} мс`,
      data
    });

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      displayOutput("headers-output", "Запрос отменен по таймауту 3 секунды", true);
      return null;
    }

    displayOutput("headers-output", `Сетевая ошибка: ${error.message}`, true);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

function setupHeadersAndParams() {
  document.getElementById("fetch-headers")
    .addEventListener("click", fetchWithHeaders);

  document.getElementById("fetch-auth")
    .addEventListener("click", fetchWithAuth);

  document.getElementById("fetch-params")
    .addEventListener("click", fetchWithParams);

  document.getElementById("fetch-timeout")
    .addEventListener("click", fetchWithTimeout);
}

// ===== ЗАДАНИЕ 4. ОБРАБОТКА ОТВЕТОВ =====

async function fetchAndCheckStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/999999`);

    if (!response.ok) {
      throw new Error(`Получен HTTP статус ${response.status}`);
    }

    const data = await response.json();
    displayOutput("response-output", data);
    return data;
  } catch (error) {
    displayOutput("response-output", error.message, true);
    return null;
  }
}

async function fetchAndReadHeaders() {
  try {
    const response = await checkedFetch(`${API_BASE_URL}/posts/1`);
    const headers = {};

    response.headers.forEach((value, name) => {
      headers[name] = value;
    });

    displayOutput("response-output", {
      contentType: response.headers.get("content-type"),
      contentLength: response.headers.get("content-length"),
      date: response.headers.get("date"),
      allHeaders: headers
    });

    return headers;
  } catch (error) {
    displayOutput("response-output", error.message, true);
    return null;
  }
}

async function fetchBlobData() {
  const container = document.getElementById("response-data");
  container.innerHTML = "";

  try {
    const response = await checkedFetch("https://picsum.photos/200/300");
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "Изображение, полученное как Blob";
    img.style.maxWidth = "200px";
    img.style.borderRadius = "8px";

    img.addEventListener("load", () => {
      URL.revokeObjectURL(imageUrl);
    }, { once: true });

    container.appendChild(img);
    displayOutput("response-output", `Blob получен: ${blob.type}, ${blob.size} байт`);

    return blob;
  } catch (error) {
    displayOutput("response-output", `Ошибка Blob: ${error.message}`, true);
    return null;
  }
}

async function fetchWithFormData() {
  const formData = new FormData();
  formData.append("title", "Пост через FormData");
  formData.append("body", "В отличие от JSON, Content-Type с boundary браузер устанавливает сам.");
  formData.append("userId", "1");

  try {
    const response = await checkedFetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    displayOutput("response-output", {
      result: data,
      difference: "Для JSON мы задаем Content-Type и JSON.stringify, для FormData это обычно не требуется."
    });

    return data;
  } catch (error) {
    displayOutput("response-output", error.message, true);
    return null;
  }
}

function setupResponseHandling() {
  document.getElementById("fetch-status")
    .addEventListener("click", fetchAndCheckStatus);

  document.getElementById("fetch-headers-response")
    .addEventListener("click", fetchAndReadHeaders);

  document.getElementById("fetch-blob")
    .addEventListener("click", fetchBlobData);

  document.getElementById("fetch-formdata")
    .addEventListener("click", fetchWithFormData);
}

// ===== ЗАДАНИЕ 5. ОШИБКИ =====

async function fetchNetworkError() {
  try {
    await fetch("https://this-domain-does-not-exist.invalid/data");
    displayOutput("error-output", "Неожиданно получен ответ");
  } catch (error) {
    displayOutput(
      "error-output",
      `Сетевая ошибка: ${error.message}. Ответ от сервера вообще не был получен.`,
      true
    );
    return error;
  }
}

async function fetchHttpError() {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/999999`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ресурс не найден`);
    }

    return await response.json();
  } catch (error) {
    displayOutput("error-output", error.message, true);
    return null;
  }
}

let activeAbortController = null;

async function fetchWithAbort() {
  const button = document.getElementById("fetch-abort");

  if (activeAbortController) {
    activeAbortController.abort();
    return;
  }

  activeAbortController = new AbortController();
  button.textContent = "Отменить текущий запрос";
  displayOutput("error-output", "Запрос запущен. Нажмите кнопку еще раз для отмены.");

  try {
    // Большое случайное изображение дает больше времени, чтобы увидеть отмену.
    const response = await checkedFetch(
      `https://picsum.photos/2000/1500?time=${Date.now()}`,
      { signal: activeAbortController.signal }
    );

    await response.blob();
    displayOutput("error-output", "Запрос успел завершиться до отмены");
  } catch (error) {
    if (error.name === "AbortError") {
      displayOutput("error-output", "Запрос отменен через AbortController", true);
    } else {
      displayOutput("error-output", `Ошибка запроса: ${error.message}`, true);
    }
  } finally {
    activeAbortController = null;
    button.textContent = "Отмена запроса";
  }
}

async function fetchWithRetry(url, options = {}, retries = 3) {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return response;
    } catch (error) {
      lastError = error;

      if (attempt === retries) {
        break;
      }

      await delay(500 * (2 ** (attempt - 1)));
    }
  }

  throw lastError;
}

async function testFetchRetry() {
  try {
    displayOutput("error-output", "Запуск повторных попыток...");

    const response = await fetchWithRetry(
      `${API_BASE_URL}/posts/1`,
      {},
      3
    );

    const data = await response.json();
    displayOutput("error-output", {
      result: "Запрос успешно выполнен",
      id: data.id
    });

    return data;
  } catch (error) {
    displayOutput("error-output", `Все попытки завершились ошибкой: ${error.message}`, true);
    return null;
  }
}

function setupErrorHandling() {
  document.getElementById("fetch-network-error")
    .addEventListener("click", fetchNetworkError);

  document.getElementById("fetch-http-error")
    .addEventListener("click", fetchHttpError);

  document.getElementById("fetch-abort")
    .addEventListener("click", fetchWithAbort);

  document.getElementById("fetch-retry")
    .addEventListener("click", testFetchRetry);
}

// ===== ЗАДАНИЕ 6. ПАРАЛЛЕЛЬНЫЕ ЗАПРОСЫ =====

async function fetchWithPromiseAll() {
  const start = performance.now();

  try {
    const responses = await Promise.all([
      checkedFetch(`${API_BASE_URL}/users/1`),
      checkedFetch(`${API_BASE_URL}/posts/1`),
      checkedFetch(`${API_BASE_URL}/comments/1`)
    ]);

    const [user, post, comment] = await Promise.all(
      responses.map(response => response.json())
    );

    const time = Math.round(performance.now() - start);

    displayOutput("parallel-output", {
      executionTime: `${time} мс`,
      user: user.name,
      post: post.title,
      comment: comment.email
    });

    return [user, post, comment];
  } catch (error) {
    displayOutput("parallel-output", error.message, true);
    return null;
  }
}

async function fetchWithPromiseRace() {
  const fetchPromise = checkedFetch(`${API_BASE_URL}/posts/1`)
    .then(response => response.json())
    .then(data => ({ type: "response", data }));

  const timeoutPromise = delay(1500)
    .then(() => ({ type: "timeout", message: "Время ожидания вышло" }));

  const result = await Promise.race([fetchPromise, timeoutPromise]);
  displayOutput("parallel-output", result);

  return result;
}

async function fetchSequentialRequests() {
  const start = performance.now();

  try {
    const userResponse = await checkedFetch(`${API_BASE_URL}/users/1`);
    const user = await userResponse.json();

    const postsResponse = await checkedFetch(`${API_BASE_URL}/posts?userId=${user.id}`);
    const posts = await postsResponse.json();

    const commentsResponse = await checkedFetch(
      `${API_BASE_URL}/comments?postId=${posts[0].id}`
    );
    const comments = await commentsResponse.json();

    const time = Math.round(performance.now() - start);

    const result = {
      user: user.name,
      posts: posts.length,
      commentsForFirstPost: comments.length,
      executionTime: `${time} мс`,
      note: "Запросы выполнялись последовательно, потому что следующий URL зависел от предыдущего результата."
    };

    displayOutput("parallel-output", result);
    return result;
  } catch (error) {
    displayOutput("parallel-output", error.message, true);
    return null;
  }
}

function setupParallelRequests() {
  document.getElementById("fetch-all")
    .addEventListener("click", fetchWithPromiseAll);

  document.getElementById("fetch-race")
    .addEventListener("click", fetchWithPromiseRace);

  document.getElementById("fetch-sequential")
    .addEventListener("click", fetchSequentialRequests);
}

// ===== ЗАДАНИЕ 7. РЕАЛЬНЫЕ СЦЕНАРИИ =====

async function fetchUserWithPosts() {
  const container = document.getElementById("scenario-data");
  container.innerHTML = "";

  try {
    const userResponse = await checkedFetch(`${API_BASE_URL}/users/1`);
    const user = await userResponse.json();

    const postsResponse = await checkedFetch(`${API_BASE_URL}/posts?userId=${user.id}`);
    const posts = await postsResponse.json();

    const userCard = document.createElement("div");
    userCard.className = "user-card";
    userCard.innerHTML = `
      <h4>${user.name}</h4>
      <p>${user.email}</p>
      <p>Постов: ${posts.length}</p>
    `;
    container.appendChild(userCard);

    posts.slice(0, 5).forEach(post => {
      const card = document.createElement("div");
      card.className = "post-card";
      card.innerHTML = `<h4>${post.title}</h4><p>${post.body}</p>`;
      container.appendChild(card);
    });

    displayOutput("scenario-output", `Загружен пользователь и ${posts.length} его постов`);
    return { user, posts };
  } catch (error) {
    displayOutput("scenario-output", error.message, true);
    return null;
  }
}

async function fetchWithSearch() {
  const word = (prompt("Введите слово для поиска в постах:", "qui") || "").trim();

  if (!word) {
    displayOutput("scenario-output", "Поиск отменен");
    return [];
  }

  const params = new URLSearchParams({ q: word });

  try {
    const response = await checkedFetch(`${API_BASE_URL}/posts?${params}`);
    let posts = await response.json();

    // Если конкретная реализация JSONPlaceholder не поддерживает q,
    // дополнительно фильтруем полученные записи на клиенте.
    posts = posts.filter(post =>
      `${post.title} ${post.body}`.toLowerCase().includes(word.toLowerCase())
    );

    displayData("scenario-data", posts.slice(0, 10), "posts");
    displayOutput("scenario-output", `Найдено постов: ${posts.length}`);

    return posts;
  } catch (error) {
    displayOutput("scenario-output", error.message, true);
    return [];
  }
}

async function simulateFileUpload() {
  const container = document.getElementById("scenario-data");
  container.innerHTML = "";

  const progress = document.createElement("div");
  progress.className = "progress-bar";

  const fill = document.createElement("div");
  fill.className = "progress-fill";

  progress.appendChild(fill);
  container.appendChild(progress);

  const blob = new Blob(
    ["Практическая работа №14\n".repeat(30000)],
    { type: "text/plain" }
  );

  const formData = new FormData();
  formData.append("file", blob, "practice14.txt");

  displayOutput("scenario-output", "Начало загрузки через XMLHttpRequest...");

  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_BASE_URL}/posts`);

    xhr.upload.addEventListener("progress", event => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        fill.style.width = `${percent}%`;
        displayOutput("scenario-output", `Загрузка: ${percent}%`);
      }
    });

    xhr.addEventListener("load", () => {
      fill.style.width = "100%";
      displayOutput("scenario-output", `Загрузка завершена. HTTP ${xhr.status}`);
      resolve(xhr.status);
    });

    xhr.addEventListener("error", () => {
      displayOutput("scenario-output", "Ошибка загрузки файла", true);
      resolve(null);
    });

    xhr.send(formData);
  });
}

function createFetchCache(ttl = 10000) {
  const cache = new Map();

  return async function cachedFetch(url, options = {}) {
    const method = (options.method || "GET").toUpperCase();
    const key = `${method}:${url}`;
    const now = Date.now();
    const cached = cache.get(key);

    if (method === "GET" && cached && now - cached.time < ttl) {
      return {
        source: "cache",
        data: cached.data
      };
    }

    const response = await checkedFetch(url, options);
    const data = await response.json();

    if (method === "GET") {
      cache.set(key, {
        time: now,
        data
      });
    }

    return {
      source: "network",
      data
    };
  };
}

const cachedFetchRequest = createFetchCache(15000);

async function testFetchCache() {
  const url = `${API_BASE_URL}/users/1`;

  try {
    const first = await cachedFetchRequest(url);
    const second = await cachedFetchRequest(url);

    displayOutput("scenario-output", {
      first: first.source,
      second: second.source,
      user: second.data.name,
      ttl: "15 секунд"
    });

    return [first, second];
  } catch (error) {
    displayOutput("scenario-output", error.message, true);
    return null;
  }
}

function setupRealScenarios() {
  document.getElementById("fetch-user-posts")
    .addEventListener("click", fetchUserWithPosts);

  document.getElementById("fetch-search")
    .addEventListener("click", fetchWithSearch);

  document.getElementById("fetch-upload")
    .addEventListener("click", simulateFileUpload);

  document.getElementById("fetch-cache")
    .addEventListener("click", testFetchCache);
}

// ===== ИНИЦИАЛИЗАЦИЯ =====

function initializeFetchAPI() {
  setupGetRequests();
  setupCrudRequests();
  setupHeadersAndParams();
  setupResponseHandling();
  setupErrorHandling();
  setupParallelRequests();
  setupRealScenarios();

  console.log("Все обработчики Fetch API инициализированы");
}

document.addEventListener("DOMContentLoaded", initializeFetchAPI);
