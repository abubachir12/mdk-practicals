import React, { useRef, useState } from 'react';

// Задание 3. Значения полей хранятся в DOM, читаются через useRef при отправке
export default function ContactFormUncontrolled() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const [sent, setSent] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const message = messageRef.current.value.trim();
    if (!name || !email || !message) return;
    setSent({ name, email, message });
    event.currentTarget.reset();
  };

  return <section className="section" data-testid="contact-uncontrolled">
    <h2>Задание 3: неуправляемая форма обратной связи</h2>
    <p>Поля читаются через <code>useRef</code> только при отправке.</p>
    <form className="demo form-panel" onSubmit={handleSubmit}>
      <div className="field"><label htmlFor="contact-name">Имя</label>
        <input id="contact-name" ref={nameRef} name="name" required minLength="2" placeholder="Имя" /></div>
      <div className="field"><label htmlFor="contact-email">Email</label>
        <input id="contact-email" ref={emailRef} name="email" type="email" required placeholder="mail@example.com" /></div>
      <div className="field"><label htmlFor="contact-message">Сообщение</label>
        <textarea id="contact-message" ref={messageRef} name="message" required rows="4" placeholder="Ваше сообщение" /></div>
      <button type="submit">Отправить сообщение</button>
    </form>
    {sent && <div className="results" role="status"><strong>Сообщение подготовлено:</strong>
      <pre>{JSON.stringify(sent, null, 2)}</pre>
      <p className="muted">Это учебная форма: данные не уходят на сервер.</p></div>}
  </section>;
}
