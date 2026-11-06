import React from 'react';
import { Link } from 'react-router-dom';

// Задание 1. Главная страница
export default function Home() {
  return <section className="section">
    <h2>Добро пожаловать в наш магазин!</h2>
    <p>Это главная страница нашего приложения. Все страницы открываются без перезагрузки: маршрутизацию выполняет React Router.</p>
    <div className="controls">
      <Link className="button-link" to="/products">Перейти к товарам</Link>
      <Link className="button-link secondary" to="/contact">Написать нам</Link>
    </div>
  </section>;
}
