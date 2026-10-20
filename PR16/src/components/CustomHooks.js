import React, { useCallback, useEffect, useState } from 'react';

// Задание 7.1. Значение сохраняется при обновлении страницы
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.warn('Не удалось прочитать localStorage:', error);
      return initialValue;
    }
  });
  useEffect(() => {
    try { window.localStorage.setItem(key, JSON.stringify(value)); }
    catch (error) { console.warn('Не удалось записать localStorage:', error); }
  }, [key, value]);
  return [value, setValue];
}

// Задание 7.2. API запрос: данные, загрузка, ошибка
export function useFetch(url) {
  const [result, setResult] = useState({ data: null, loading: true, error: null });
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setResult({ data: null, loading: true, error: null });
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!controller.signal.aborted) setResult({ data, loading: false, error: null });
      } catch (error) {
        if (!controller.signal.aborted) setResult({ data: null, loading: false, error: error.message });
      }
    }
    load();
    return () => controller.abort();
  }, [url]);
  return result;
}

// Задание 7.3. Переключение логического значения
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(Boolean(initialValue));
  const toggle = useCallback(() => setValue(old => !old), []);
  return [value, toggle];
}

// Задание 7.4. Изменение значения с задержкой
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

// Задание 7.5. Кастомный хук для размеров окна
export function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
}

export function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('pr16-username', '');
  return <div className="demo" data-testid="storage-demo"><h3>useLocalStorage</h3>
    <input aria-label="Сохраняемое имя" value={name} onChange={e => setName(e.target.value)} placeholder="Имя сохраняется" />
    <p>Текущее имя: {name || '—'}</p><button onClick={() => setName('')}>Очистить</button></div>;
}
export function FetchDemo() {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');
  return <div className="demo" data-testid="fetch-demo"><h3>useFetch</h3>
    {loading && <p>Загрузка пользователей...</p>}
    {error && <p role="alert" className="status-error">Ошибка: {error}</p>}
    {data && <ul>{data.slice(0, 3).map(user => <li key={user.id}>{user.name} ({user.email})</li>)}</ul>}
  </div>;
}
export function ToggleDemo() {
  const [visible, toggleVisible] = useToggle(false);
  return <div className="demo" data-testid="toggle-demo"><h3>useToggle</h3>
    <button onClick={toggleVisible}>{visible ? 'Скрыть' : 'Показать'}</button>
    {visible && <p>Секретный контент!</p>}
  </div>;
}
export function DebounceDemo() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const results = debouncedSearch.trim() ? [1, 2, 3].map(n => `Результат ${n} для «${debouncedSearch}»`) : [];
  return <div className="demo" data-testid="debounce-demo"><h3>useDebounce</h3>
    <input aria-label="Поиск" value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск с задержкой 500 мс" />
    <p>Текущий поиск: {search || '—'}</p><p>После задержки: {debouncedSearch || '—'}</p>
    <ul>{results.map(item => <li key={item}>{item}</li>)}</ul>
  </div>;
}
export function WindowSizeDemo() {
  const { width, height } = useWindowSize();
  return <div className="demo" data-testid="custom-window-size"><h3>useWindowSize</h3>
    <p>Ширина окна: {width}px</p><p>Высота окна: {height}px</p>
  </div>;
}
export default function CustomHooks() {
  return <section className="section" id="custom"><h2>Кастомные хуки</h2>
    <p>Повторное использование логики состояния, запросов, задержки и размеров окна.</p>
    <div className="demo-grid"><LocalStorageDemo /><FetchDemo /><ToggleDemo /><DebounceDemo /><WindowSizeDemo /></div>
  </section>;
}
