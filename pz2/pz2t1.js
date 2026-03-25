"use strict";

function createSurvey() {
    let name = prompt("Введіть ваше ім'я:");
    let ageInput = prompt("Введіть ваш вік:");
    let city = prompt("Введіть ваше місто:");

    let age = Number(ageInput);
    let isAdult = age >= 18;

    return { name: name, age: age, city: city, isAdult: isAdult };
}

function displaySurvey(surveyData) {
    let message = `Анкета:\nІм'я: ${surveyData.name}\nВік: ${surveyData.age}\nМісто: ${surveyData.city}\nПовнолітній: ${surveyData.isAdult ? "Так" : "Ні"}`;
    
    console.log(message);
    alert(message);
}
function startSurvey() {
    const mySurvey = createSurvey();
    displaySurvey(mySurvey);
}
