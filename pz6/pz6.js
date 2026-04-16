"use strict";
const user = { 
    name: "Іван", 
    age: 20, 
    city: "Київ" 
};

const basicNumbers = [10, 20, 30];
const multiply = (a, b) => a * b;
const sumAll = (...nums) => {
    return nums.reduce((acc, num) => acc + num, 0);
};
const { name, age, city } = user;
const userInfo = `Студент: ${name}, Вік: ${age}, Місто: ${city}.`;

const allNumbers = [...basicNumbers, 40, 50];

const mathResult = multiply(5, 4); 
const totalSum = sumAll(1, 2, 3, 4, 5); 
console.log(userInfo);
console.log("Усі числа (Spread):", allNumbers);
console.log("Сума чисел (Rest):", totalSum);

const appDiv = document.getElementById("app");
appDiv.innerHTML = `
    <p><b>Дані користувача:</b> ${userInfo}</p>
    <p><b>Новий масив (Spread):</b> ${allNumbers.join(", ")}</p>
    <p><b>Сума 1+2+3+4+5 (Rest):</b> ${totalSum}</p>
    <p><b>Множення 5 * 4:</b> ${mathResult}</p>
`;