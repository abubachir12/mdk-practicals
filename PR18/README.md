# Практическая работа №18: React — маршрутизация

Студент: Анушенко Артём, группа 418.

Выполнены три задания: базовая настройка маршрутов и навигации, страницы товаров с параметром `:id`, форма контактов с программной навигацией и передачей данных через `state`. Дополнительно сделан защищённый маршрут «Личный кабинет».

## Структура проекта

```
src/
  App.js                  маршруты приложения
  index.js
  components/             общие компоненты: Layout, Navigation, ProtectedRoute
  context/AuthContext.js  учебная авторизация для защищённого маршрута
  data/products.js        данные о товарах
  pages/
    Home.js, About.js, NotFound.js
    products/             Products.js, ProductDetail.js
    contact/              Contact.js, ContactSuccess.js
    account/              Login.js, Profile.js
  routing.test.js         автоматические тесты маршрутов
```

## Запуск

```bash
npm install
npm start
```

Откройте `http://localhost:3000`. Для запуска автоматических тестов используйте `npm test`.

Форма контактов учебная: на сервер данные не отправляются. Для входа в личный кабинет достаточно ввести имя, пароль не нужен.

Папку `node_modules` в GitHub загружать не нужно.
