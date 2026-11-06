import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes, routerFuture } from './App';
import { AuthProvider } from './context/AuthContext';

// MemoryRouter позволяет открыть нужный адрес прямо в тесте
const renderAt = path => render(<AuthProvider>
  <MemoryRouter initialEntries={[path]} future={routerFuture}><AppRoutes /></MemoryRouter>
</AuthProvider>);

test('главная страница и навигация по меню', () => {
  renderAt('/');
  expect(screen.getByText('Добро пожаловать в наш магазин!')).toBeTruthy();
  fireEvent.click(screen.getByRole('link', { name: 'О нас' }));
  expect(screen.getByText('О нашей компании')).toBeTruthy();
  expect(screen.getByRole('link', { name: 'О нас' }).className).toContain('active');
});

test('неизвестный адрес показывает страницу 404', () => {
  renderAt('/no-such-page');
  expect(screen.getByText('404 - Страница не найдена')).toBeTruthy();
});

test('параметр :id открывает нужный товар', () => {
  renderAt('/products/2');
  expect(screen.getByRole('heading', { name: 'Смартфон' })).toBeTruthy();
  expect(screen.getByText('Смартфон с отличной камерой')).toBeTruthy();
});

test('несуществующий товар', () => {
  renderAt('/products/99');
  expect(screen.getByText('Товар не найден')).toBeTruthy();
});

test('фильтр по категории', () => {
  renderAt('/products');
  fireEvent.change(screen.getByLabelText('Фильтр по категории:'), { target: { value: 'books' } });
  expect(screen.getByText('Книга')).toBeTruthy();
  expect(screen.queryByText('Ноутбук')).toBeNull();
});

test('форма передаёт данные на страницу успеха через state', () => {
  renderAt('/contact');
  fireEvent.change(screen.getByLabelText('Имя'), { target: { value: 'Иван' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ivan@example.com' } });
  fireEvent.change(screen.getByLabelText('Сообщение'), { target: { value: 'Добрый день!' } });
  fireEvent.click(screen.getByText('Отправить сообщение'));
  expect(screen.getByText('Ваше сообщение успешно отправлено!')).toBeTruthy();
  expect(screen.getByText('Иван')).toBeTruthy();
});

test('защищённый маршрут без входа перенаправляет на /login', () => {
  renderAt('/profile');
  expect(screen.getByRole('heading', { name: 'Вход' })).toBeTruthy();
  fireEvent.change(screen.getByLabelText('Имя пользователя'), { target: { value: 'Артём' } });
  fireEvent.click(screen.getByText('Войти'));
  expect(screen.getByText('Личный кабинет', { selector: 'h2' })).toBeTruthy();
});
