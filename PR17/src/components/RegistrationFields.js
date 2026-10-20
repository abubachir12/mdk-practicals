import React from 'react';
import { ageOptions } from './registration';

export default function RegistrationFields({ prefix, values, onChange, errors = {} }) {
  const field = (key, label, type = 'text', placeholder = '') => <div className="field">
    <label htmlFor={`${prefix}-${key}`}>{label}</label>
    <input id={`${prefix}-${key}`} name={key} type={type} placeholder={placeholder}
      value={values[key]} onChange={onChange} aria-invalid={Boolean(errors[key])}
      aria-describedby={errors[key] ? `${prefix}-${key}-error` : undefined} />
    {errors[key] && <span className="status-error" role="alert" id={`${prefix}-${key}-error`}>{errors[key]}</span>}
  </div>;

  return <>
    {field('name','Имя','text','Ваше имя')}
    {field('email','Email','email','mail@example.com')}
    {field('password','Пароль','password','Минимум 8 символов')}
    {field('confirmPassword','Подтверждение пароля','password','Повторите пароль')}
    <fieldset className="field">
      <legend>Пол</legend>
      <div className="controls">
        <label><input type="radio" name="gender" value="male" checked={values.gender === 'male'} onChange={onChange} /> Мужской</label>
        <label><input type="radio" name="gender" value="female" checked={values.gender === 'female'} onChange={onChange} /> Женский</label>
      </div>
      {errors.gender && <span className="status-error" role="alert">{errors.gender}</span>}
    </fieldset>
    <div className="field">
      <label><input type="checkbox" name="newsletter" checked={values.newsletter} onChange={onChange} /> Подписка на рассылку</label>
    </div>
    <div className="field">
      <label htmlFor={`${prefix}-age`}>Возраст</label>
      <select id={`${prefix}-age`} name="age" value={values.age} onChange={onChange} aria-invalid={Boolean(errors.age)}>
        <option value="">Выберите возраст</option>
        {ageOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      {errors.age && <span className="status-error" role="alert">{errors.age}</span>}
    </div>
    <div className="field">
      <label htmlFor={`${prefix}-about`}>О себе</label>
      <textarea id={`${prefix}-about`} name="about" rows="3" value={values.about} onChange={onChange}
        aria-invalid={Boolean(errors.about)} placeholder="Несколько предложений" />
      {errors.about && <span className="status-error" role="alert">{errors.about}</span>}
    </div>
  </>;
}
