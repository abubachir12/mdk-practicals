import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

export default function Layout() {
  return <div>
    <header className="app-header">
      <h1>Практическая работа №18: React — маршрутизация</h1>
      <p>Студент: Анушенко Артём | Группа: 418</p>
      <p>BrowserRouter, Routes, Link, NavLink, useParams, useNavigate, защищённые маршруты</p>
    </header>
    <Navigation />
    <main className="app-main"><Outlet /></main>
  </div>;
}
