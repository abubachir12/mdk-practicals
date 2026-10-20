// Общие начальные данные для двух управляемых форм.
export const initialRegistration = {
  name: '', email: '', password: '', confirmPassword: '',
  gender: '', newsletter: false, age: '', about: ''
};

export const ageOptions = [
  { value: 'under18', label: 'До 18 лет' },
  { value: '18-24', label: '18–24 года' },
  { value: '25-34', label: '25–34 года' },
  { value: '35+', label: '35 лет и старше' }
];

export function validateRegistration(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Укажите имя.';
  if (!form.email.trim()) errors.email = 'Укажите email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) errors.email = 'Введите корректный email.';
  if (!form.password) errors.password = 'Укажите пароль.';
  else if (form.password.length < 8) errors.password = 'Пароль должен содержать минимум 8 символов.';
  if (!form.confirmPassword) errors.confirmPassword = 'Подтвердите пароль.';
  else if (form.password !== form.confirmPassword) errors.confirmPassword = 'Пароли не совпадают.';
  if (!form.gender) errors.gender = 'Выберите пол.';
  if (!form.age) errors.age = 'Выберите возраст.';
  if (!form.about.trim()) errors.about = 'Напишите немного о себе.';
  return errors;
}

// Не выводим пароли после отправки формы.
export function publicRegistrationData(form) {
  return {
    name: form.name.trim(), email: form.email.trim(), gender: form.gender,
    newsletter: form.newsletter, age: form.age, about: form.about.trim()
  };
}
