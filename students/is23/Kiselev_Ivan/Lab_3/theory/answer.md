### 1. Rest-оператор

**Теория:** Rest-оператор (`...`) собирает оставшиеся аргументы функции в массив. Позволяет работать с неограниченным количеством аргументов как с обычным массивом. Может использоваться только в конце списка параметров. Для объектов собирает оставшиеся свойства при деструктуризации.

```javascript
function sum(...nums) { 
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3); // 6
```

---

### 2. Rest vs arguments

**Теория:** `arguments` — массивоподобный объект, автоматически доступный в функциях. Не имеет методов массива (map, filter и т.д.). Работает только в обычных функциях. Rest-оператор создает настоящий массив, работает в стрелочных функциях и позволяет комбинировать именованные параметры с остаточными.

```javascript
function legacy() {
  console.log(Array.isArray(arguments)); // false
  console.log([...arguments].map(x => x * 2)); // Работает только после преобразования
}

function modern(...args) {
  console.log(Array.isArray(args)); // true
  console.log(args.map(x => x * 2)); // [2, 4, 6]
}
modern(1, 2, 3);
```

---

### 3. Spread-оператор

**Теория:** Spread-оператор (`...`) раскрывает элементы массива или свойства объекта. Используется для передачи элементов как отдельных аргументов в функцию, создания копий массивов/объектов, объединения данных. Для объектов копирует только перечислимые свойства.

```javascript
const arr = [1, 2];
console.log([0, ...arr, 3]); // [0, 1, 2, 3]

const obj = { a: 1 };
const newObj = { ...obj, b: 2 }; // { a: 1, b: 2 }
```

---

### 4. Spread с Math.max

**Теория:** `Math.max()` принимает числа как отдельные аргументы, а не массив. Spread преобразует массив в список аргументов, что делает синтаксис чище по сравнению с `Math.max.apply(null, arr)`.

```javascript
const nums = [3, 5, 2];
Math.max(...nums); // 5
```

---

### 5. Замыкание

**Теория:** Замыкание — это функция, которая запоминает внешние переменные из своего лексического окружения даже после завершения внешней функции. Возникает из-за связывания функции с её Lexical Environment.

```javascript
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}
const counter = createCounter();
counter(); // 1
counter(); // 2
```

---

### 6. LexicalEnvironment

**Теория:** Lexical Environment — внутренний объект, создаваемый при вызове функции или входе в блок. Состоит из Environment Record (хранит переменные) и ссылки на внешнее окружение. Определяет доступ к переменным во вложенных функциях.

```javascript
function outer() {
  const x = 10;
  return function inner() {
    console.log(x); // 10 (доступ к переменной из внешнего окружения)
  };
}
outer()(); 
```

---

### 7. Переменная и Environment Record

**Теория:** Environment Record — компонент Lexical Environment, хранящий локальные переменные, параметры функции и объявления. Каждое объявление переменной связывается с текущим Environment Record.

```javascript
{
  let x = 100;
  console.log(x); // 100 (переменная в Environment Record блока)
}
console.log(x); // ReferenceError (нет доступа вне блока)
```

---

### 8. Вызов Function Declaration до определения

**Теория:** Function Declaration поднимаются (hoisting) на верх своей области видимости на этапе создания контекста выполнения. Само тело функции также становится доступным до объявления.

```javascript
sayHello(); // "Hello" (работает из-за hoisting)
function sayHello() {
  console.log("Hello");
}
```

---

### 9. let/const в блоках vs var

**Теория:** `let`/`const` имеют блочную область видимости — доступны только внутри `{}`. `var` имеет функциональную область видимости и "просачивается" за пределы блоков.

```javascript
if (true) {
  var legacy = "visible";
  let modern = "hidden";
}
console.log(legacy); // "visible"
console.log(modern); // ReferenceError
```

---

### 10. Hoisting var

**Теория:** Объявление `var` поднимается в начало области видимости, но инициализация остается на месте. До инициализации переменная имеет значение `undefined`.

```javascript
console.log(x); // undefined (hoisting)
var x = 5;
console.log(x); // 5
```

---

### 11. Сохранение контекста при декорировании

**Теория:** Контекст (`this`) можно сохранить через `bind()`, стрелочные функции (они не имеют своего `this`) или привязку в конструкторе.

```javascript
class Timer {
  constructor() {
    this.value = 42;
    // Вариант 1: bind
    this.logBound = this.log.bind(this);
  
    // Вариант 2: стрелочная функция
    this.logArrow = () => console.log(this.value);
  }
  log() { console.log(this.value); }
}

const timer = new Timer();
setTimeout(timer.logBound, 1000); // 42
setTimeout(timer.logArrow, 1000); // 42
```

---

### 12. call, apply, bind

**Теория:**

- `call(context, arg1, arg2...)` — вызывает функцию с указанным контекстом и аргументами.
- `apply(context, [args])` — аналогично, но принимает массив аргументов.
- `bind(context, arg1, arg2...)` — возвращает новую функцию с привязанным контекстом.

```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const user = { name: "Alice" };
greet.call(user, "Hello", "!"); // Hello, Alice!
greet.apply(user, ["Hi", "."]); // Hi, Alice.
const boundGreet = greet.bind(user, "Welcome");
boundGreet("!"); // Welcome, Alice!
```

---

### 13. [[Prototype]]

**Теория:** `[[Prototype]]` — внутреннее свойство объекта, ссылающееся на его прототип. Используется для делегирования свойств и методов. Доступно через `__proto__` или `Object.getPrototypeOf()`.

```javascript
const animal = { eats: true };
const rabbit = Object.create(animal); // rabbit.[[Prototype]] = animal
console.log(rabbit.eats); // true (взято из прототипа)
```

---

### 14. Поиск свойства в прототипах

**Теория:** При обращении к свойству сначала проверяется сам объект. Если свойства нет, движок ищет в `[[Prototype]]`, затем в `[[Prototype]]` прототипа и так далее до `null`.

```javascript
const grandParent = { key: "grand" };
const parent = Object.create(grandParent);
const child = Object.create(parent);

console.log(child.key); // "grand" (цепочка: child → parent → grandParent)
```

---

### 15. Оператор new и F.prototype

**Теория:** При вызове `new F()` создается объект, чей `[[Prototype]]` устанавливается в `F.prototype`. Это позволяет экземплярам наследовать методы из `F.prototype`.

```javascript
function User(name) {
  this.name = name;
}
User.prototype.sayHi = function() {
  console.log(`Hi, ${this.name}`);
};

const user = new User("John");
user.sayHi(); // Hi, John (метод из User.prototype)
```

---

### 16. Function.prototype по умолчанию

**Теория:** У каждой функции есть свойство `prototype`, которое по умолчанию содержит объект с единственным свойством `constructor`, ссылающимся на саму функцию. Через него передаются методы экземплярам.

```javascript
function Fn() {}
console.log(Fn.prototype); // { constructor: ƒ Fn() }
console.log(Fn.prototype.constructor === Fn); // true
```

---

### 17. Цепочка прототипов встроенных типов

**Теория:** Все объекты наследуются от `Object.prototype`. У массивов: `[] → Array.prototype → Object.prototype → null`. У функций: `function(){} → Function.prototype → Object.prototype → null`.

```javascript
console.log([].__proto__ === Array.prototype); // true
console.log(Array.prototype.__proto__ === Object.prototype); // true

console.log((function(){}).__proto__ === Function.prototype); // true
```

---

### 18. extends

**Теория:** Ключевое слово `extends` создает наследование между классами. Устанавливает цепочку прототипов: `Child.prototype.[[Prototype]] = Parent.prototype` и `Child.[[Prototype]] = Parent`.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks.`);
  }
}

const dog = new Dog("Rex");
dog.speak(); // Rex barks.
```

---

### 19. Статические методы

**Теория:** Статические методы объявляются с `static` и привязаны к классу, а не к экземплярам. Наследуются через `[[Prototype]]` классов.

```javascript
class Parent {
  static staticMethod() {
    return "Parent static";
  }
}

class Child extends Parent {}

console.log(Child.staticMethod()); // "Parent static" (наследуется)
```

---

### 20. Модуль ESM

**Теория:** ESM (ECMAScript Modules) — стандарт модулей в JavaScript. Каждый файл — модуль со своей областью видимости. Экспорт через `export`, импорт через `import`. Асинхронная загрузка.

```javascript
// math.js
export const PI = 3.14;
export default function sum(a, b) { return a + b; }

// app.js
import sum, { PI } from './math.js';
console.log(sum(2, 3), PI); // 5, 3.14
```

---

### 21. Подключение модуля в браузере

**Теория:** Для загрузки ESM в браузере используется тег `<script type="module">`. Модули загружаются асинхронно, их выполнение откладывается до полной загрузки DOM.

```html
<script type="module" src="main.js"></script>
```

---

### 22. Изоляция области видимости модулей

**Теория:** Переменные, объявленные внутри модуля, не попадают в глобальную область. Они доступны только внутри модуля или через явный экспорт.

```javascript
// module1.js
const secret = "123"; // Не виден вне модуля

// module2.js
const secret = "456"; // Нет конфликта с module1
```

---

### 23. Выполнение модуля при множественных импортах

**Теория:** Модуль выполняется один раз при первом импорте. Последующие импорты получают уже выполненный экземпляр (кэширование).

```javascript
// logger.js
console.log("Module executed");
export const value = 42;

// main1.js
import { value } from './logger.js'; // "Module executed"

// main2.js
import { value } from './logger.js'; // Нет повторного вывода
```

---

### 24. «Голые» импорты

**Теория:** Импорт без привязки к переменным (`import './module.js'`) используется для выполнения побочных эффектов (инициализация, регистрация обработчиков).

```javascript
// analytics.js
window.addEventListener('load', initTracking);

// main.js
import './analytics.js'; // Запустит отслеживание
```

---

### 25. Формы export/import

**Теория:**

- Именованный экспорт/импорт: `export { x }; import { x } from '...'`
- Экспорт по умолчанию: `export default x; import x from '...'`
- Импорт всего содержимого: `import * as lib from '...'`
- Динамический импорт: `import('module').then(...)`

```javascript
// Именованный
export const a = 1;
import { a } from './module.js';

// Default
export default function() {}
import func from './module.js';

// Namespace
import * as utils from './utils.js';
```

---

### 26. try…catch

**Теория:** Конструкция для обработки исключений. Код в `try` выполняется, при ошибке управление передается в `catch`, где можно обработать ошибку. Работает только с синхронным кодом.

```javascript
try {
  throw new Error("Oops!");
} catch (err) {
  console.log(err.message); // "Oops!"
} finally {
  console.log("Cleanup");
}
```

---

### 27. finally

**Теория:** Блок `finally` выполняется всегда — независимо от того, было ли исключение или нет. Используется для очистки ресурсов (закрытие соединений, удаление временных файлов).

```javascript
function divide(a, b) {
  try {
    return a / b;
  } catch (e) {
    console.log("Error:", e.message);
  } finally {
    console.log("Operation completed");
  }
}
divide(10, 2); // Operation completed
divide(10, 0); // Error: division by zero → Operation completed
```

---

### 28. Свойства объекта ошибки

**Теория:** Стандартные ошибки имеют:

- `name`: тип ошибки (например, "Error")
- `message`: текстовое описание
- `stack`: стек вызовов (не стандарт, но поддерживается везде)
- `cause` (ES2022): причина ошибки

```javascript
try {
  throw new Error("File not found", { cause: new Error("Disk error") });
} catch (e) {
  console.log(e.name); // "Error"
  console.log(e.message); // "File not found"
  console.log(e.cause.message); // "Disk error"
}
```

---

### 29. Генерация ошибки вручную

**Теория:** Для генерации ошибки используется `throw`. Обычно выбрасываются экземпляры `Error` или его подклассов (SyntaxError, TypeError и т.д.).

```javascript
function checkAge(age) {
  if (age < 18) {
    throw new Error("Access denied");
  }
  return true;
}
```

---

### 30. Пользовательская ошибка

**Теория:** Создается наследованием от `Error`. В конструкторе вызывается `super(message)`, устанавливается `this.name` и при необходимости добавляются свои свойства.

```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.code = 400;
  }
}

throw new ValidationError("Invalid email");
```

---

### 31. Оборачивание и перебрасывание ошибок

**Теория:** Оборачивание — создание новой ошибки с сохранением оригинальной через поле `cause`. Перебрасывание — повторный `throw` после частичной обработки ошибки.

```javascript
try {
  fetchData();
} catch (err) {
  // Оборачивание
  throw new Error("Failed to process data", { cause: err });
  
  // Перебрасывание
  console.error("Logging error:", err);
  throw err;
}
```

---

### 32. Поля объекта события

**Теория:** Объект события (Event) содержит:

- `target`: элемент, на котором произошло событие
- `currentTarget`: элемент, к которому привязан обработчик
- `type`: тип события ("click", "submit")
- `bubbles`: булево, всплывает ли событие
- `defaultPrevented`: отменено ли действие по умолчанию

```javascript
button.addEventListener('click', (e) => {
  console.log(e.target === button); // true
  console.log(e.type); // "click"
});
```

---

### 33. Всплытие и погружение

**Теория:**

- **Погружение (capture phase):** Событие идет от `window` к целевому элементу.
- **Целевая фаза (target phase):** Событие достигает целевого элемента.
- **Всплытие (bubbling phase):** Событие поднимается от целевого элемента к `window`.

```javascript
document.body.addEventListener('click', () => console.log('Body (capture)'), true);
button.addEventListener('click', () => console.log('Button'));
document.body.addEventListener('click', () => console.log('Body (bubble)'));

// Порядок при клике на button:
// Body (capture) → Button → Body (bubble)
```

---

### 34. Фаза захвата

**Теория:** Чтобы обработать событие на фазе захвата, в `addEventListener` передается опция `{ capture: true }`.

```javascript
element.addEventListener('click', handler, { capture: true });
```

---

### 35. Остановка распространения события

**Теория:** `stopPropagation()` прекращает дальнейшее распространение события по DOM. `stopImmediatePropagation()` также блокирует другие обработчики на текущем элементе.

```javascript
button.addEventListener('click', (e) => {
  e.stopPropagation(); // Остановит всплытие
  console.log("Button clicked");
});

document.body.addEventListener('click', () => {
  console.log("Body clicked"); // Не выполнится
});
```

---

### 36. Предотвращение действия по умолчанию

**Теория:** `preventDefault()` отменяет стандартное действие браузера для события (отправка формы, переход по ссылке).

```javascript
link.addEventListener('click', (e) => {
  e.preventDefault(); // Отменит переход
  console.log("Link click intercepted");
});
```

---

### 37. Генерация события

**Теория:** Пользовательские события создаются через `new Event()` или `new CustomEvent()` (для передачи данных в `detail`). Отправляются методом `dispatchEvent()`.

```javascript
// Стандартное событие
const event = new Event('build');
elem.dispatchEvent(event);

// Пользовательское событие с данными
const customEvent = new CustomEvent('status', {
  detail: { progress: 75 }
});
elem.dispatchEvent(customEvent);

// Обработчик
elem.addEventListener('status', (e) => {
  console.log(e.detail.progress); // 75
});
```
