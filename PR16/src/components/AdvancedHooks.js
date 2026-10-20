import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';

// Задание 3.1. Корзина через useReducer
export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.some(item => item.id === action.payload.id);
      return { ...state, items: exists
        ? state.items.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
      }
      return { ...state, items: state.items.map(item => item.id === action.payload.id
        ? { ...item, quantity: action.payload.quantity } : item) };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

const catalog = [
  { id: 1, name: 'Товар 1', price: 100 },
  { id: 2, name: 'Товар 2', price: 200 },
  { id: 3, name: 'Товар 3', price: 300 }
];

export function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return <div className="demo" data-testid="shopping-cart">
    <h3>Корзина покупок</h3>
    <p>Добавить товар:</p>
    <div className="controls">{catalog.map(item => <button key={item.id}
      onClick={() => dispatch({ type: 'ADD_ITEM', payload: item })}>Добавить {item.name}</button>)}</div>
    {state.items.length === 0 ? <p className="muted">Корзина пуста</p> : <ul>{state.items.map(item => <li key={item.id}>
      {item.name} ({item.price} ₽) &nbsp;
      <button aria-label={`Уменьшить ${item.name}`} onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })}>−</button>
      <span aria-label={`Количество ${item.name}`}> {item.quantity} </span>
      <button aria-label={`Увеличить ${item.name}`} onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}>+</button>
      <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>Удалить</button>
    </li>)}</ul>}
    <p><strong>Общая сумма: {total} ₽</strong></p>
    <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>Очистить корзину</button>
  </div>;
}

// Задание 3.2. Секундомер и круги через useReducer
export function stopwatchReducer(state, action) {
  switch (action.type) {
    case 'START': return { ...state, isRunning: true };
    case 'STOP': return { ...state, isRunning: false };
    case 'RESET': return { isRunning: false, time: 0, laps: [] };
    case 'TICK': return state.isRunning ? { ...state, time: state.time + 1 } : state;
    case 'LAP': return { ...state, laps: [...state.laps, state.time] };
    default: return state;
  }
}

export function Stopwatch() {
  const [state, dispatch] = useReducer(stopwatchReducer, { isRunning: false, time: 0, laps: [] });
  useEffect(() => {
    if (!state.isRunning) return undefined;
    const timer = setInterval(() => dispatch({ type: 'TICK' }), 1000);
    return () => clearInterval(timer);
  }, [state.isRunning]);
  return <div className="demo" data-testid="stopwatch">
    <h3>Секундомер: {state.time} сек.</h3>
    <div className="controls">
      <button onClick={() => dispatch({ type: state.isRunning ? 'STOP' : 'START' })}>{state.isRunning ? 'Стоп' : 'Старт'}</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Сброс</button>
      <button onClick={() => dispatch({ type: 'LAP' })}>Круг</button>
    </div>
    {state.laps.length > 0 && <div><h4>Круги:</h4><ol>{state.laps.map((lap, i) => <li key={i}>{lap} сек.</li>)}</ol></div>}
  </div>;
}

// Задание 4. Контекст темы
export const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = useCallback(() => setTheme(old => old === 'light' ? 'dark' : 'light'), []);
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return <div className="demo" data-testid="theme-toggle" style={{ background: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#273344' }}>
    <h3>Тема: {theme === 'dark' ? 'темная' : 'светлая'}</h3>
    <button onClick={toggleTheme}>Переключить тему</button>
  </div>;
}

// Задание 5. useMemo кеширует результат до смены числа; useCallback - обработчик
export function ExpensiveCalculation() {
  const [number, setNumber] = useState(1);
  const [clicks, setClicks] = useState(0);
  const expensiveResult = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < 200000; i += 1) sum += number;
    return sum;
  }, [number]);
  const increment = useCallback(() => setNumber(current => current + 1), []);
  return <div className="demo" data-testid="expensive-calculation">
    <h3>useMemo и useCallback</h3>
    <p>Число: {number}</p><p>Результат: {expensiveResult}</p><p>Другой счетчик: {clicks}</p>
    <div className="controls"><button onClick={increment}>Увеличить число</button>
      <button onClick={() => setClicks(n => n + 1)}>Дополнительный рендер</button></div>
    <p className="muted">Результат вычисляется заново только при изменении числа.</p>
  </div>;
}

// Задание 6.1. useRef для фокуса
export function FocusInput() {
  const inputRef = useRef(null);
  return <div className="demo" data-testid="focus-input"><h3>Фокус на поле</h3>
    <div className="controls"><input ref={inputRef} aria-label="Поле для фокуса" placeholder="Нажмите кнопку для фокуса" />
      <button onClick={() => inputRef.current?.focus()}>Фокус</button></div>
  </div>;
}

// Задание 6.2. useRef для предыдущего значения
export function PreviousValue() {
  const [value, setValue] = useState('');
  const previous = useRef('');
  useEffect(() => { previous.current = value; }, [value]);
  return <div className="demo" data-testid="previous-value"><h3>Текущее и предыдущее</h3>
    <input aria-label="Текущее значение" value={value} onChange={e => setValue(e.target.value)} placeholder="Введите текст" />
    <p>Текущее: {value || '—'}</p><p>Предыдущее: {previous.current || '—'}</p>
  </div>;
}

export default function AdvancedHooks() {
  return <ThemeProvider><section className="section" id="advanced"><h2>Продвинутые хуки</h2>
    <div className="demo-grid"><ShoppingCart /><Stopwatch /><ThemeToggle /><ExpensiveCalculation /><FocusInput /><PreviousValue /></div>
  </section></ThemeProvider>;
}
