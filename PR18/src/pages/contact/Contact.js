import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const subjects = { general: 'Общий вопрос', support: 'Техническая поддержка', sales: 'Вопросы по продажам', feedback: 'Обратная связь' };

// Задание 3. Форма с программной навигацией
export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', message: '', subject: 'general' });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Имитация отправки: на сервер данные не уходят
    console.log('Данные формы:', formData);
    // После «отправки» переходим на страницу успеха и передаём данные через state
    navigate('/contact/success', {
      state: { message: 'Ваше сообщение успешно отправлено!', formData: { ...formData, subject: subjects[formData.subject] } }
    });
  };

  return <section className="section">
    <h2>Свяжитесь с нами</h2>
    <form className="demo form-panel" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="contact-name">Имя</label>
        <input id="contact-name" type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="field">
        <label htmlFor="contact-email">Email</label>
        <input id="contact-email" type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="field">
        <label htmlFor="contact-subject">Тема</label>
        <select id="contact-subject" name="subject" value={formData.subject} onChange={handleChange}>
          {Object.entries(subjects).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="contact-message">Сообщение</label>
        <textarea id="contact-message" name="message" rows="5" value={formData.message} onChange={handleChange} required />
      </div>
      <button type="submit">Отправить сообщение</button>
    </form>
  </section>;
}
