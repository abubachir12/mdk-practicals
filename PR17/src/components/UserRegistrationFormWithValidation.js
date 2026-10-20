import React, { useState } from 'react';
import RegistrationFields from './RegistrationFields';
import { initialRegistration, publicRegistrationData, validateRegistration } from './registration';

// Задание 2. Та же форма с проверкой всех обязательных полей
export default function UserRegistrationFormWithValidation() {
  const [form, setForm] = useState({ ...initialRegistration });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  function handleChange(e) {
    const { name, type, checked, value } = e.target;
    const newForm = { ...form, [name]: type === 'checkbox' ? checked : value };
    setForm(newForm);
    setResult(null);
    if (Object.keys(errors).length > 0) setErrors(validateRegistration(newForm));
  }
  function handleSubmit(e) {
    e.preventDefault();
    const foundErrors = validateRegistration(form);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length === 0) {
      setResult(publicRegistrationData(form));
    } else {
      setResult(null);
    }
  }
  return <section className="section" data-testid="registration-validated">
    <h2>Задание 2: валидация регистрации</h2>
    <p>Имя, email, пароль, подтверждение, пол, возраст и «О себе» обязательны. Рассылка необязательна.</p>
    <form className="demo form-panel" onSubmit={handleSubmit} noValidate>
      <RegistrationFields prefix="validated" values={form} onChange={handleChange} errors={errors} />
      <button type="submit">Проверить и отправить</button>
    </form>
    {result && <div className="results" role="status"><strong>Форма прошла проверку!</strong>
      <p>Данные проверены локально в браузере. На сервер они не отправляются.</p>
      <pre>{JSON.stringify(result, null, 2)}</pre></div>}
  </section>;
}
