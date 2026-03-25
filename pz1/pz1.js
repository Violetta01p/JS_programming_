"use strict";
let userName = prompt("Введіть ваше ім'я:");
if(!userName){
    alert("Ви не ввели імʼя")
}
let ageInput = prompt("Введіть ваш вік:");
let city = prompt("Введіть ваше місто:");
let favoriteColor = prompt("Введіть ваш улюблений колір:");
let isWorking = prompt("Ви зараз працюєте?");
let isWorking1 = (isWorking === "Так" || isWorking === "так");

console.log("Працює:", isWorking);
let age = Number(ageInput);
let isAdult = age >= 18;
let resultMessage = "--- Результати Анкети ---\n" +
   "Ім'я: " + userName + "\n" +
   "Вік: " + age + " (Повнолітній: " + isAdult + ")\n" +
   "Місто: " + city + "\n" +
   "Улюблений колір: " + favoriteColor + "\n" +
   "Працює: " + isWorking;

alert(resultMessage);
console.log(resultMessage);

console.log("--- Типи даних ---");
console.log("Тип дани", typeof null)
console.log("Тип userName:", typeof userName);
console.log("Тип age:", typeof age);
console.log("Тип city:", typeof city);
console.log("Тип favoriteColor:", typeof favoriteColor);
console.log("Тип isWorking:", typeof isWorking);
console.log("Тип isAdult:", typeof isAdult);