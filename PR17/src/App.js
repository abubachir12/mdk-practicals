import React from 'react';
import UserRegistrationForm from './components/UserRegistrationForm';
import UserRegistrationFormWithValidation from './components/UserRegistrationFormWithValidation';
import ContactFormUncontrolled from './components/ContactFormUncontrolled';

export default function App() {
  return <div>
    <header className="app-header">
      <h1>Практическая работа №17: React — работа с формами</h1>
      <p>Студент: Анушенко Артём | Группа: 418</p>
      <p>Управляемые и неуправляемые поля, события, проверка данных</p>
    </header>
    <main className="app-main"><UserRegistrationForm /><UserRegistrationFormWithValidation /><ContactFormUncontrolled /></main>
  </div>;
}
