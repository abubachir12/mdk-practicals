import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// NavLink сам добавляет класс active к ссылке текущей страницы
const links = [
  { to: '/', label: 'Главная', end: true },
  { to: '/about', label: 'О нас' },
  { to: '/products', label: 'Товары' },
  { to: '/contact', label: 'Контакты' },
  { to: '/profile', label: 'Личный кабинет' }
];

export default function Navigation() {
  const { user } = useAuth();
  return <nav className="main-nav" aria-label="Основное меню">
    <span className="logo">Мой Магазин</span>
    <ul>
      {links.map(link => <li key={link.to}>
        <NavLink to={link.to} end={link.end}>{link.label}</NavLink>
      </li>)}
    </ul>
    <span className="muted">{user ? `Вы вошли как ${user.name}` : 'Гость'}</span>
  </nav>;
}
