import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserRegistrationForm from './UserRegistrationForm';
import UserRegistrationFormWithValidation from './UserRegistrationFormWithValidation';
import ContactFormUncontrolled from './ContactFormUncontrolled';

test('базовая форма управляется React', () => {
  render(<UserRegistrationForm />);
  fireEvent.change(screen.getByLabelText('Имя'), { target: { value: 'Иван' } });
  expect(screen.getByLabelText('Имя').value).toBe('Иван');
});

test('валидация показывает все обязательные поля', () => {
  render(<UserRegistrationFormWithValidation />);
  fireEvent.click(screen.getByText('Проверить и отправить'));
  expect(screen.getByText('Укажите имя.')).toBeTruthy();
  expect(screen.getByText('Укажите email.')).toBeTruthy();
  expect(screen.getByText('Выберите возраст.')).toBeTruthy();
});

test('неуправляемые поля используют DOM и reset после отправки', () => {
  render(<ContactFormUncontrolled />);
  const name = screen.getByLabelText('Имя');
  const email = screen.getByLabelText('Email');
  const message = screen.getByLabelText('Сообщение');
  fireEvent.change(name, { target: { value: 'Иван' } });
  fireEvent.change(email, { target: { value: 'ivan@example.com' } });
  fireEvent.change(message, { target: { value: 'Добрый день!' } });
  fireEvent.click(screen.getByText('Отправить сообщение'));
  expect(screen.getByText('Сообщение подготовлено:')).toBeTruthy();
  expect(name.value).toBe('');
});
