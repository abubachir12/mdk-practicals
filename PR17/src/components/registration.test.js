import { publicRegistrationData, validateRegistration, initialRegistration } from './registration';

const valid = {
  name: 'Артём', email: 'test@example.com', password: 'password123',
  confirmPassword: 'password123', gender: 'male', newsletter: false,
  age: '18-24', about: 'Мне нравится React.'
};

test('пустая форма дает ошибки для всех обязательных полей', () => {
  const errors = validateRegistration(initialRegistration);
  expect(Object.keys(errors).sort()).toEqual(['name', 'email', 'password', 'confirmPassword', 'gender', 'age', 'about'].sort());
  expect(errors.newsletter).toBeUndefined();
});

test('валидная регистрация проходит проверку', () => {
  expect(validateRegistration(valid)).toEqual({});
});

test('неверный email, короткий пароль и несовпадение паролей', () => {
  const errors = validateRegistration({ ...valid, email: 'bad', password: '123', confirmPassword: '456' });
  expect(errors.email).toBeTruthy();
  expect(errors.password).toBeTruthy();
  expect(errors.confirmPassword).toBeTruthy();
});

test('вывод скрывает пароли', () => {
  const data = publicRegistrationData(valid);
  expect(data).not.toHaveProperty('password');
  expect(data).not.toHaveProperty('confirmPassword');
  expect(data.email).toBe('test@example.com');
});
