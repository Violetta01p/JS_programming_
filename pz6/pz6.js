"use strict";

import { user, basicNumbers, n, mix } from "./data.js";
import { multiply, sumAll, sumN } from "./utils.js";

const { name, age, city } = user;
const userInfo = `Студент: ${name}, Вік: ${age}, Місто: ${city}.`;

const allNumbers = [...basicNumbers, 60, 90];

const mathResult = multiply(5, 4); 
const totalSum = sumAll(1, 2, 3, 4, 5); 
const sumNumbers = sumN(n,mix);

console.log(userInfo);
console.log("Усі числа (Spread):", allNumbers);

const appDiv = document.getElementById("app");
appDiv.innerHTML = `
    <section style="border: 1px solid #ccc; padding: 10px; border-radius: 8px;">
        <p><b>Дані користувача:</b> ${userInfo}</p>
        <p><b>Новий масив (Spread):</b> ${allNumbers.join(", ")}</p>
        <p><b>Сума 1+2+3+4+5 (Rest):</b> ${totalSum}</p>
        <p><b>Множення 5 * 4:</b> ${mathResult}</p>
         <p><b>Додавання 6+ 10:</b> ${sumNumbers}</p>
    </section>
`;