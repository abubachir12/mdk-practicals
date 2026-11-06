import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Задание 1. Маршрут path="*" для несуществующих адресов
export default function NotFound() {
  const { pathname } = useLocation();
  return <section className="section">
    <h2>404 - Страница не найдена</h2>
    <p>Извините, страница <code>{pathname}</code> не существует.</p>
    <Link to="/">Вернуться на главную</Link>
  </section>;
}
