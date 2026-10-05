import React, { useState } from "react";

export function ComponentTests() {
  const [results, setResults] = useState([]);

  function runTests() {
    const testResults = [];

    try {
      const basicComponents =
        document.querySelectorAll("#basic-output-1 > *");

      const statefulComponents =
        document.querySelectorAll("#stateful-output-1 > *");

      const lifecycleComponents =
        document.querySelectorAll("#lifecycle-output > *");

      const hooksComponents =
        document.querySelectorAll("#hooks-output-1 > *");

      testResults.push({
        name: "Базовые компоненты созданы",
        passed: basicComponents.length > 0,
        message: `Найдено компонентов: ${basicComponents.length}`
      });

      testResults.push({
        name: "Компоненты с состоянием созданы",
        passed: statefulComponents.length > 0,
        message: `Найдено компонентов: ${statefulComponents.length}`
      });

      testResults.push({
        name: "Lifecycle компоненты созданы",
        passed: lifecycleComponents.length > 0,
        message: `Найдено компонентов: ${lifecycleComponents.length}`
      });

      testResults.push({
        name: "Hooks компоненты созданы",
        passed: hooksComponents.length > 0,
        message: `Найдено компонентов: ${hooksComponents.length}`
      });
    } catch (error) {
      testResults.push({
        name: "Общие тесты",
        passed: false,
        message: `Ошибка: ${error.message}`
      });
    }

    console.log("=== РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ ===");

    testResults.forEach(test => {
      console.log(
        `${test.passed ? "✅" : "❌"} ${test.name}: ${test.message}`
      );
    });

    setResults(testResults);
  }

  const passedTests = results.filter(test => test.passed).length;

  return (
    <section className="task-section">
      <h2>Тестирование компонентов</h2>

      <div className="component-demo">
        <button
          type="button"
          onClick={runTests}
          style={{
            background: "#27ae60",
            fontSize: "1.1rem",
            cursor: "pointer"
          }}
        >
          Запустить тесты компонентов
        </button>

        {results.length > 0 && (
          <div className="output">
            <strong>
              Пройдено: {passedTests}/{results.length}
            </strong>

            {results.map(test => (
              <p key={test.name}>
                {test.passed ? "✅" : "❌"} {test.name}: {test.message}
              </p>
            ))}
          </div>
        )}

        <div style={{ marginTop: "2rem", textAlign: "left" }}>
          <h3>Инструкция по проверке:</h3>
          <ul>
            <li>Убедитесь, что все компоненты отображаются корректно</li>
            <li>Проверьте работу счетчиков и форм</li>
            <li>Убедитесь, что обработчики событий работают</li>
            <li>Проверьте работу хуков и жизненного цикла</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ComponentTests;
