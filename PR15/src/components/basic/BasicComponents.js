import React, { useState } from "react";
import "./BasicComponents.css";

export function WelcomeMessage({ name, age }) {
  return (
    <div className="welcome-message">
      <h4>Привет, {name}!</h4>
      <p>Ваш возраст: {age}</p>
    </div>
  );
}

export function UserCard({ user }) {
  const { name, email, avatar, isOnline } = user;

  return (
    <div className="user-card">
      <img className="user-avatar" src={avatar} alt={name} />
      <div>
        <h4>{name}</h4>
        <p>{email}</p>
        <p className={isOnline ? "online" : "offline"}>
          {isOnline ? "● В сети" : "● Не в сети"}
        </p>
      </div>
    </div>
  );
}

export function Button({
  variant = "primary",
  size = "medium",
  onClick,
  children
}) {
  return (
    <button
      className={`custom-button ${variant} ${size}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export function Card({ title, children }) {
  return (
    <div className="basic-card">
      <h4>{title}</h4>
      <div>{children}</div>
    </div>
  );
}

export function Toggle({ buttonText = "Показать/скрыть", children }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="toggle">
      <Button
        variant="secondary"
        onClick={() => setVisible(current => !current)}
      >
        {buttonText}
      </Button>

      {visible && <div className="toggle-content fade-in">{children}</div>}
    </div>
  );
}

export function ConditionalMessage({ status }) {
  const messages = {
    success: "Операция выполнена успешно",
    error: "Произошла ошибка",
    warning: "Внимание: проверьте введенные данные"
  };

  const text = messages[status] || "Неизвестный статус";

  return (
    <div className={`conditional-message ${status}`}>
      {text}
    </div>
  );
}

function BasicComponents() {
  const userData = {
    name: "Анна Иванова",
    email: "anna@example.com",
    avatar: "https://i.pravatar.cc/100?img=47",
    isOnline: true
  };

  return (
    <section className="task-section">
      <h2>Базовые компоненты</h2>

      <div className="component-demo">
        <h3>Задание 1: Компоненты с props</h3>

        <div id="basic-output-1" className="output">
          <WelcomeMessage name="Иван" age={25} />
          <UserCard user={userData} />
          <Button
            variant="primary"
            size="medium"
            onClick={() => alert("Кнопка работает!")}
          >
            Нажми меня
          </Button>
        </div>
      </div>

      <div className="component-demo">
        <h3>Задание 2: Children и условный рендеринг</h3>

        <div id="basic-output-2" className="output">
          <Card title="Пример карточки">
            <p>Это содержимое карточки, переданное через children.</p>
          </Card>

          <Toggle buttonText="Показать/скрыть">
            <p>Секретный контент</p>
          </Toggle>

          <ConditionalMessage status="success" />
          <ConditionalMessage status="warning" />
        </div>
      </div>
    </section>
  );
}

export default BasicComponents;
