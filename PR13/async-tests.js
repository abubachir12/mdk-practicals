"use strict";

function logTest(name, passed) {
  const mark = passed ? "✅" : "❌";
  console.log(`${mark} ${name}`);
}

async function runAsyncTests() {
  console.log("=== ТЕСТЫ ПР13 ===");

  const start = performance.now();
  await delayWithPromise(50);
  logTest("delayWithPromise создает задержку", performance.now() - start >= 40);

  const success = await createBasicPromise(true);
  logTest("createBasicPromise(true)", success === "Успех!");

  try {
    await createBasicPromise(false);
    logTest("createBasicPromise(false)", false);
  } catch (error) {
    logTest("createBasicPromise(false)", error.message === "Ошибка!");
  }

  const settled = await Promise.allSettled([
    Promise.resolve(1),
    Promise.reject(new Error("test"))
  ]);
  logTest(
    "Promise.allSettled возвращает оба результата",
    settled.length === 2 &&
      settled[0].status === "fulfilled" &&
      settled[1].status === "rejected"
  );

  let attempt = 0;
  const retryResult = await retryWithBackoff(async () => {
    attempt += 1;
    if (attempt < 2) throw new Error("Повтор");
    return "Готово";
  }, 2);

  logTest("retryWithBackoff повторяет операцию", retryResult === "Готово");

  const cache = createRequestCache();
  const testUrl = "data:application/json,%7B%22value%22%3A42%7D";
  const first = await cache(testUrl);
  const second = await cache(testUrl);

  logTest(
    "createRequestCache использует кэш",
    first.source === "network" &&
      second.source === "cache" &&
      second.data.value === 42
  );

  console.log("=== ТЕСТЫ ПР13 ЗАВЕРШЕНЫ ===");
}

document.addEventListener("DOMContentLoaded", () => {
  runAsyncTests().catch(error => console.error("Ошибка тестов ПР13:", error));
});
