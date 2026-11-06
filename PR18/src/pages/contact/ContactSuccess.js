import React from 'react';
import { useLocation, Link } from 'react-router-dom';

// Задание 3. Страница успеха читает данные, переданные через navigate(..., { state })
export default function ContactSuccess() {
  const location = useLocation();
  const { message, formData } = location.state || {};

  return <section className="section">
    <h2>Успех!</h2>
    {message ? <div className="results success-box" role="status">
      <p className="status-success">{message}</p>
      {formData && <div>
        <h4>Отправленные данные:</h4>
        <p><strong>Имя:</strong> {formData.name}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Тема:</strong> {formData.subject}</p>
        <p><strong>Сообщение:</strong> {formData.message}</p>
      </div>}
    </div> : <p className="muted">Нет данных для отображения. Скорее всего, страница открыта напрямую, без отправки формы.</p>}
    <div className="controls">
      <Link to="/contact">← Отправить ещё одно сообщение</Link>
      <Link to="/">На главную</Link>
    </div>
  </section>;
}
