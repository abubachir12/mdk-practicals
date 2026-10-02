"use strict";

function fetchTest(name, passed) {
  const mark = passed ? "✅" : "❌";
  console.log(`${mark} ${name}`);
}

async function runFetchTests() {
  console.log("=== ТЕСТЫ ПР14 ===");

  fetchTest(
    "API_BASE_URL содержит JSONPlaceholder",
    API_BASE_URL === "https://jsonplaceholder.typicode.com"
  );

  const params = new URLSearchParams({
    _limit: "5",
    _sort: "id",
    _order: "desc"
  });

  fetchTest(
    "URLSearchParams формирует параметры",
    params.get("_limit") === "5" &&
      params.get("_sort") === "id" &&
      params.get("_order") === "desc"
  );

  const cache = createFetchCache(5000);
  const dataUrl = "data:application/json,%7B%22ok%22%3Atrue%7D";

  const first = await cache(dataUrl);
  const second = await cache(dataUrl);

  fetchTest(
    "createFetchCache возвращает данные из кэша",
    first.source === "network" &&
      second.source === "cache" &&
      second.data.ok === true
  );

  const retryResponse = await fetchWithRetry(dataUrl, {}, 2);
  const retryData = await retryResponse.json();

  fetchTest(
    "fetchWithRetry возвращает успешный ответ",
    retryData.ok === true
  );

  console.log("=== ТЕСТЫ ПР14 ЗАВЕРШЕНЫ ===");
}

document.addEventListener("DOMContentLoaded", () => {
  runFetchTests().catch(error => console.error("Ошибка тестов ПР14:", error));
});
