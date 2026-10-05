import React, { Component } from "react";
import "./StatefulComponents.css";

export class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: props.initialValue || 0 };
  }

  increment = () => {
    this.setState(state => ({ count: state.count + 1 }));
  };

  decrement = () => {
    this.setState(state => ({ count: state.count - 1 }));
  };

  reset = () => {
    this.setState({ count: this.props.initialValue || 0 });
  };

  render() {
    return (
      <div className="state-block">
        <h4>Счетчик</h4>
        <div className="counter">{this.state.count}</div>

        <button type="button" onClick={this.decrement}>-1</button>
        <button type="button" onClick={this.increment}>+1</button>
        <button type="button" className="secondary" onClick={this.reset}>
          Сбросить
        </button>
      </div>
    );
  }
}

export class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    message: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value, message: "" });
  };

  validate = () => {
    const errors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email)) {
      errors.email = "Введите корректный email";
    }

    if (this.state.password.length < 6) {
      errors.password = "Пароль должен содержать минимум 6 символов";
    }

    return errors;
  };

  handleSubmit = event => {
    event.preventDefault();

    const errors = this.validate();

    if (Object.keys(errors).length > 0) {
      this.setState({ errors, message: "" });
      return;
    }

    this.setState({
      errors: {},
      message: "Форма успешно отправлена"
    });
  };

  render() {
    const { email, password, errors, message } = this.state;

    return (
      <form className="login-form state-block" onSubmit={this.handleSubmit}>
        <h4>Форма входа</h4>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
          />
          {errors.email && <div className="form-error">{errors.email}</div>}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={password}
            onChange={this.handleChange}
          />
          {errors.password && <div className="form-error">{errors.password}</div>}
        </div>

        <button type="submit">Войти</button>
        {message && <div className="form-success">{message}</div>}
      </form>
    );
  }
}

export class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedColor: props.colors[0] };
  }

  render() {
    const { colors } = this.props;
    const { selectedColor } = this.state;

    return (
      <div className="state-block">
        <h4>Выбор цвета</h4>

        <div className="color-buttons">
          {colors.map(color => (
            <button
              key={color}
              type="button"
              className="color-button"
              style={{ backgroundColor: color }}
              title={color}
              onClick={() => this.setState({ selectedColor: color })}
            />
          ))}
        </div>

        <div
          className="selected-color"
          style={{ backgroundColor: selectedColor }}
        >
          Выбран: {selectedColor}
        </div>
      </div>
    );
  }
}

export class TodoList extends Component {
  state = {
    input: "",
    todos: [
      { id: 1, text: "Изучить props", completed: true },
      { id: 2, text: "Разобраться со state", completed: false }
    ]
  };

  addTodo = () => {
    const text = this.state.input.trim();

    if (!text) return;

    this.setState(state => ({
      todos: [
        ...state.todos,
        { id: Date.now(), text, completed: false }
      ],
      input: ""
    }));
  };

  toggleTodo = id => {
    this.setState(state => ({
      todos: state.todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    }));
  };

  removeTodo = id => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id)
    }));
  };

  render() {
    return (
      <div className="state-block">
        <h4>Список задач</h4>

        <div>
          <input
            type="text"
            placeholder="Новая задача"
            value={this.state.input}
            onChange={event => this.setState({ input: event.target.value })}
            onKeyDown={event => {
              if (event.key === "Enter") this.addTodo();
            }}
          />
          <button type="button" onClick={this.addTodo}>
            Добавить
          </button>
        </div>

        <ul className="todo-list">
          {this.state.todos.map(todo => (
            <li key={todo.id}>
              <label className={todo.completed ? "completed" : ""}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => this.toggleTodo(todo.id)}
                />
                {todo.text}
              </label>

              <button
                type="button"
                className="danger small-delete"
                onClick={() => this.removeTodo(todo.id)}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export class SearchBox extends Component {
  state = { query: "" };

  render() {
    const query = this.state.query.toLowerCase();

    const results = this.props.items.filter(item =>
      item.toLowerCase().includes(query)
    );

    return (
      <div className="state-block">
        <h4>Поиск</h4>

        <input
          type="text"
          placeholder="Введите запрос"
          value={this.state.query}
          onChange={event => this.setState({ query: event.target.value })}
        />

        <button
          type="button"
          className="secondary"
          onClick={() => this.setState({ query: "" })}
        >
          Очистить
        </button>

        <ul className="search-results">
          {results.map(item => <li key={item}>{item}</li>)}
        </ul>
      </div>
    );
  }
}

class StatefulComponents extends Component {
  render() {
    return (
      <section className="task-section">
        <h2>Компоненты с состоянием</h2>

        <div className="component-demo">
          <h3>Задание 3: Классовые компоненты</h3>

          <div id="stateful-output-1" className="output">
            <Counter initialValue={0} />
            <LoginForm />
            <ColorPicker colors={["#ff0000", "#00aa00", "#0000ff"]} />
          </div>
        </div>

        <div className="component-demo">
          <h3>Задание 4: Обработка событий</h3>

          <div id="stateful-output-2" className="output">
            <TodoList />
            <SearchBox items={["React", "JavaScript", "HTML", "CSS"]} />
          </div>
        </div>
      </section>
    );
  }
}

export default StatefulComponents;
