import React, { useState } from 'react';
import { cartReducer, stopwatchReducer } from './AdvancedHooks';

// Небольшие проверки логики плюс наличие секций в DOM.
export function runHooksChecks() {
  const checks = [];
  const check = (name, passed) => checks.push({ name, passed: Boolean(passed) });
  const add = cartReducer({ items: [] }, { type: 'ADD_ITEM', payload: { id: 1, name: 'Товар', price: 100 } });
  check('Корзина: добавление', add.items.length === 1 && add.items[0].quantity === 1);
  const twice = cartReducer(add, { type: 'ADD_ITEM', payload: { id: 1, name: 'Товар', price: 100 } });
  check('Корзина: повторное добавление', twice.items[0].quantity === 2);
  check('Корзина: очистка', cartReducer(twice, { type: 'CLEAR_CART' }).items.length === 0);
  check('Корзина: удаление товара', cartReducer(twice, { type: 'REMOVE_ITEM', payload: 1 }).items.length === 0);
  const started = stopwatchReducer({ isRunning: false, time: 0, laps: [] }, { type: 'START' });
  check('Секундомер: запуск', started.isRunning);
  const ticked = stopwatchReducer(started, { type: 'TICK' });
  check('Секундомер: тик', ticked.time === 1);
  check('Секундомер: круг', stopwatchReducer(ticked, { type: 'LAP' }).laps[0] === 1);
  check('Секундомер: сброс', stopwatchReducer(ticked, { type: 'RESET' }).time === 0);
  for (const [id, label] of [['basic','Базовые хуки'],['advanced','Продвинутые хуки'],['custom','Кастомные хуки']]) {
    check(`Наличие раздела: ${label}`, document.getElementById(id) !== null);
  }
  check('Поле с ref есть в DOM', document.querySelector('[data-testid="focus-input"] input') !== null);
  check('Форма с состоянием есть в DOM', document.querySelector('[data-testid="user-form"] input') !== null);
  return checks;
}

export default function HooksTests() {
  const [checks, setChecks] = useState([]);
  const passed = checks.filter(test => test.passed).length;
  const run = () => {
    const results = runHooksChecks();
    results.forEach(({ name, passed }) => console.log(`${passed ? 'OK' : 'FAIL'}: ${name}`));
    setChecks(results);
  };
  return <section className="section" id="tests"><h2>Проверка компонентов</h2>
    <div className="demo"><button onClick={run}>Запустить тесты</button>
      {checks.length > 0 && <div className="results" aria-live="polite">
        <p><strong>Успешно: {passed}/{checks.length}</strong></p>
        <ul>{checks.map(test => <li key={test.name} className={test.passed ? 'status-success' : 'status-error'}>
          {test.passed ? '✓' : '✗'} {test.name}</li>)}</ul>
      </div>}
      <p className="muted">Также проверьте вручную кнопки, поля ввода, время, обновление размеров окна и загрузку данных API.</p>
    </div>
  </section>;
}
