import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Дополнительно: вход для проверки защищённого маршрута (без пароля, только имя)
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const from = location.state?.from || '/profile';

  const handleSubmit = e => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name.trim());
    // replace: страница входа не остаётся в истории, «Назад» не вернёт на неё
    navigate(from, { replace: true });
  };

  return <section className="section">
    <h2>Вход</h2>
    {location.state?.from && <p className="status-error">Страница {location.state.from} доступна только после входа.</p>}
    <form className="demo form-panel" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="login-name">Имя пользователя</label>
        <input id="login-name" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <button type="submit">Войти</button>
    </form>
  </section>;
}
