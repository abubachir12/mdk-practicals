import React, { useEffect, useState } from 'react';

// Задание 1.1. useState: простой счетчик
export function Counter() {
  const [count, setCount] = useState(0);
  return <div className="demo" data-testid="counter">
    <h3>Счетчик: <span data-testid="count">{count}</span></h3>
    <div className="controls">
      <button onClick={() => setCount(n => n + 1)}>+1</button>
      <button onClick={() => setCount(n => n - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Сброс</button>
    </div>
  </div>;
}

// Задание 1.2. Несколько полей в одном объекте состояния
export function UserForm() {
  const [user, setUser] = useState({ name: '', email: '', age: '' });
  const handleChange = event => {
    const { name, value } = event.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };
  return <div className="demo" data-testid="user-form">
    <h3>Форма пользователя</h3>
    <div className="stacked">
      <input name="name" aria-label="Имя" placeholder="Имя" value={user.name} onChange={handleChange} />
      <input name="email" aria-label="Email" type="email" placeholder="Email" value={user.email} onChange={handleChange} />
      <input name="age" aria-label="Возраст" type="number" min="1" placeholder="Возраст" value={user.age} onChange={handleChange} />
    </div>
    <p>Имя: {user.name || '—'}</p><p>Email: {user.email || '—'}</p><p>Возраст: {user.age || '—'}</p>
  </div>;
}

// Задание 1.3. Список с отметкой выполнения и фильтрами
export function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [nextId, setNextId] = useState(1);

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos(previous => [...previous, { id: nextId, text, completed: false }]);
    setNextId(id => id + 1);
    setInput('');
  };
  const toggleTodo = id => setTodos(old => old.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  const removeTodo = id => setTodos(old => old.filter(todo => todo.id !== id));
  const visible = todos.filter(todo => filter === 'all' || (filter === 'active' ? !todo.completed : todo.completed));

  return <div className="demo" data-testid="todo-list">
    <h3>Список задач</h3>
    <div className="controls">
      <input aria-label="Новая задача" value={input} onChange={e => setInput(e.target.value)}
        placeholder="Новая задача" onKeyDown={e => e.key === 'Enter' && addTodo()} />
      <button onClick={addTodo}>Добавить</button>
    </div>
    <div className="controls">
      {['all','active','completed'].map((kind, i) => <button key={kind} aria-pressed={filter === kind}
        onClick={() => setFilter(kind)}>{['Все','Активные','Завершенные'][i]}</button>)}
    </div>
    <ul>{visible.map(todo => <li key={todo.id}>
      <label style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} /> {todo.text}
      </label> <button onClick={() => removeTodo(todo.id)}>Удалить</button>
    </li>)}</ul>
    {visible.length === 0 && <p className="muted">Список пуст</p>}
  </div>;
}

// Задание 2.1. useEffect с таймером, очисткой setInterval
export function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    if (!isRunning) return undefined;
    const id = setInterval(() => setTime(previous => previous + 1), 1000);
    return () => clearInterval(id);
  }, [isRunning]);
  return <div className="demo" data-testid="timer">
    <h3>Таймер: {time} сек.</h3>
    <div className="controls">
      <button onClick={() => setIsRunning(running => !running)}>{isRunning ? 'Пауза' : 'Старт'}</button>
      <button onClick={() => { setTime(0); setIsRunning(false); }}>Сброс</button>
    </div>
  </div>;
}

// Задание 2.2. Подписка на resize и удаление слушателя
export function WindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const resize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  return <div className="demo" data-testid="window-size">
    <h3>Размер окна</h3><p>Ширина: {size.width}px</p><p>Высота: {size.height}px</p>
  </div>;
}

// Задание 2.3. Запрос к API с состояниями загрузки и ошибки
export function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1', { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        setData(await response.json());
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, []);
  return <div className="demo" data-testid="data-fetcher">
    <h3>Загрузка данных</h3>
    {loading && <p>Загрузка...</p>}
    {error && <p className="status-error" role="alert">Ошибка: {error}</p>}
    {data && <div><p>Имя: {data.name}</p><p>Email: {data.email}</p><p>Телефон: {data.phone}</p></div>}
  </div>;
}

export default function BasicHooks() {
  return <section className="section" id="basic"><h2>Базовые хуки: useState и useEffect</h2>
    <div className="demo-grid"><Counter /><UserForm /><TodoList /><Timer /><WindowSize /><DataFetcher /></div>
  </section>;
}
