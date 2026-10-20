import React, { useState } from 'react';
import RegistrationFields from './RegistrationFields';
import { initialRegistration, publicRegistrationData } from './registration';

// Задание 1. Управляемая регистрационная форма
export default function UserRegistrationForm() {
  const [form, setForm] = useState({ ...initialRegistration });
  const [submitted, setSubmitted] = useState(null);
  const handleChange = e => {
    const { name, type, checked, value } = e.target;
    setForm(previous => ({ ...previous, [name]: type === 'checkbox' ? checked : value }));
    setSubmitted(null);
  };
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(publicRegistrationData(form));
  };
  return <section className="section" data-testid="registration-basic">
    <h2>Задание 1: управляемая форма регистрации</h2>
    <p>Значения всех полей находятся в состоянии React.</p>
    <form className="demo form-panel" onSubmit={handleSubmit} noValidate>
      <RegistrationFields prefix="basic" values={form} onChange={handleChange} />
      <button type="submit">Отправить форму</button>
    </form>
    {submitted && <div className="results" role="status"><strong>Данные формы приняты (демонстрация):</strong>
      <pre>{JSON.stringify(submitted, null, 2)}</pre></div>}
  </section>;
}
