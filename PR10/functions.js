"use strict";

// Принимает любое количество аргументов через rest parameters.
function sum(...numbers) {
  return numbers.reduce((total, number) => total + number, 0);
}

// Использует деструктуризацию объекта и значение по умолчанию.
function createUser({ name, age, email = "не указан" }) {
  return `Пользователь: ${name}, возраст: ${age}, email: ${email}`;
}

// Демонстрация замыкания: password и message сохраняются
// во внешней лексической области видимости.
function secretMessage(password, message) {
  return function checkPassword(inputPassword) {
    return inputPassword === password ? message : "Доступ запрещен";
  };
}

// Стандартная композиция справа налево:
// compose(f, g)(x) эквивалентно f(g(x)).
function compose(...functions) {
  return function composed(value) {
    return functions.reduceRight(
      (currentValue, fn) => fn(currentValue),
      value
    );
  };
}

// Аналог Array.prototype.map.
function myMap(array, callback) {
  const result = [];

  for (let i = 0; i < array.length; i += 1) {
    result.push(callback(array[i], i, array));
  }

  return result;
}

// Аналог Array.prototype.filter.
function myFilter(array, callback) {
  const result = [];

  for (let i = 0; i < array.length; i += 1) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }

  return result;
}

// Аналог Array.prototype.reduce.
function myReduce(array, callback, initialValue) {
  let index = 0;
  let accumulator;

  if (arguments.length >= 3) {
    accumulator = initialValue;
  } else {
    if (array.length === 0) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = array[0];
    index = 1;
  }

  for (; index < array.length; index += 1) {
    accumulator = callback(accumulator, array[index], index, array);
  }

  return accumulator;
}

// Каррирование с поддержкой как одиночных, так и групповых аргументов.
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    return function next(...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}

// Мемоизация. Ключ строится из набора аргументов.
function memoize(fn) {
  const cache = new Map();

  return function memoized(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Debounce: функция выполняется после того, как вызовы прекратились
// на указанное число миллисекунд.
function debounce(fn, delay) {
  let timerId;

  return function debounced(...args) {
    const context = this;
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

// Throttle: функция выполняется не чаще одного раза за interval.
function throttle(fn, interval) {
  let lastCallTime = 0;
  let timeoutId = null;
  let savedArgs;
  let savedContext;

  return function throttled(...args) {
    const now = Date.now();
    const remaining = interval - (now - lastCallTime);
    savedArgs = args;
    savedContext = this;

    if (remaining <= 0) {
      clearTimeout(timeoutId);
      timeoutId = null;
      lastCallTime = now;
      fn.apply(savedContext, savedArgs);
      savedArgs = savedContext = null;
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCallTime = Date.now();
        timeoutId = null;
        fn.apply(savedContext, savedArgs);
        savedArgs = savedContext = null;
      }, remaining);
    }
  };
}

// Возвращает функцию-валидатор.
// Поддерживаемые опции:
// minLength - минимальная длина,
// requireNumber - обязательна цифра,
// requireUppercase - обязательна заглавная буква.
function createValidator(options = {}) {
  const {
    minLength = 0,
    requireNumber = false,
    requireUppercase = false
  } = options;

  return function validate(value) {
    const text = String(value);

    if (text.length < minLength) return false;
    if (requireNumber && !/\d/.test(text)) return false;
    if (requireUppercase && !/[A-ZА-ЯЁ]/.test(text)) return false;

    return true;
  };
}
