"use strict";
// Пример: вывод в консоль и на страницу
const message = "TypeScript работает в браузере!";
console.log(message);
const p = document.createElement("p");
p.textContent = message;
document.body.appendChild(p);
