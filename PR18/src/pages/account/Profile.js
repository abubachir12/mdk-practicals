import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Защищённая страница: открывается только через ProtectedRoute
export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return <section className="section">
    <h2>Личный кабинет</h2>
    <p>Здравствуйте, {user.name}! Эта страница защищена: без входа вас перенаправит на /login.</p>
    <button onClick={handleLogout}>Выйти</button>
  </section>;
}
