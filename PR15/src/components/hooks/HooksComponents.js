import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import "./HooksComponents.css";

export function CounterWithHooks() {
  const [count, setCount] = useState(0);

  return (
    <div className="hooks-block">
      <h4>Счетчик на useState</h4>
      <div className="counter">{count}</div>

      <button type="button" onClick={() => setCount(value => value - 1)}>
        -1
      </button>

      <button type="button" onClick={() => setCount(value => value + 1)}>
        +1
      </button>

      <button type="button" className="secondary" onClick={() => setCount(0)}>
        Сброс
      </button>
    </div>
  );
}

export function UserProfile() {
  const [profile, setProfile] = useState({
    name: "Иван",
    email: "ivan@example.com"
  });

  const [savedProfile, setSavedProfile] = useState(profile);

  function handleChange(event) {
    const { name, value } = event.target;

    setProfile(current => ({
      ...current,
      [name]: value
    }));
  }

  return (
    <div className="hooks-block">
      <h4>Профиль пользователя</h4>

      <input
        type="text"
        name="name"
        value={profile.name}
        onChange={handleChange}
        placeholder="Имя"
      />

      <input
        type="email"
        name="email"
        value={profile.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <button type="button" onClick={() => setSavedProfile(profile)}>
        Сохранить
      </button>

      <p>
        Сохранено: {savedProfile.name}, {savedProfile.email}
      </p>
    </div>
  );
}

export function EffectDemo() {
  const [seconds, setSeconds] = useState(0);
  const [titleClicks, setTitleClicks] = useState(0);

  useEffect(() => {
    document.title = `ПР15 - ${titleClicks}`;
  }, [titleClicks]);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(value => value + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="hooks-block">
      <h4>Демонстрация useEffect</h4>
      <p>Компонент открыт: {seconds} сек.</p>

      <button type="button" onClick={() => setTitleClicks(value => value + 1)}>
        Изменить title ({titleClicks})
      </button>
    </div>
  );
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key);
      return savedValue !== null
        ? JSON.parse(savedValue)
        : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export function useFetch(url) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: ""
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState({
        data: null,
        loading: true,
        error: ""
      });

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!cancelled) {
          setState({
            data,
            loading: false,
            error: ""
          });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error: error.message
          });
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return state;
}

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {}
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("pr15-theme", "light");

  function toggleTheme() {
    setTheme(current => current === "light" ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`theme-area ${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="hooks-block">
      <h4>ThemeToggle</h4>
      <p>Текущая тема: {theme === "light" ? "светлая" : "темная"}</p>

      <button type="button" onClick={toggleTheme}>
        Переключить тему
      </button>
    </div>
  );
}

function FetchHookDemo() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  return (
    <div className="hooks-block">
      <h4>Кастомный useFetch</h4>

      {loading && <p>Загрузка...</p>}
      {error && <p className="hook-error">Ошибка: {error}</p>}
      {data && <p>{data.title}</p>}
    </div>
  );
}

function LocalStorageDemo() {
  const [text, setText] = useLocalStorage("pr15-note", "");

  return (
    <div className="hooks-block">
      <h4>Кастомный useLocalStorage</h4>

      <input
        type="text"
        value={text}
        onChange={event => setText(event.target.value)}
        placeholder="Текст сохранится в localStorage"
      />

      <p>Сохраненное значение: {text || "пусто"}</p>
    </div>
  );
}

function HooksComponents() {
  return (
    <section className="task-section">
      <h2>React Hooks</h2>

      <div className="component-demo">
        <h3>Задание 6: useState и useEffect</h3>

        <div id="hooks-output-1" className="output">
          <CounterWithHooks />
          <UserProfile />
          <EffectDemo />
        </div>
      </div>

      <div className="component-demo">
        <h3>Задание 7: Кастомные хуки и Context</h3>

        <div id="hooks-output-2" className="output">
          <LocalStorageDemo />
          <FetchHookDemo />

          <ThemeProvider>
            <ThemeToggle />
          </ThemeProvider>
        </div>
      </div>
    </section>
  );
}

export default HooksComponents;
