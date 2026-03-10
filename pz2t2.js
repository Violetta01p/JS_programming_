"use strict";

function createConverter(multiplier, offset) {
    return function(temp) {
        return (temp * multiplier) + offset;
    };
}

const celsiusToFahrenheit = createConverter(1.8, 32);
const fahrenheitToCelsius = createConverter(0.5556, -17.7778);

function startCalculator() {
    let tempInput = Number(prompt("Введіть числове значення температури:"));
    let direction = prompt("Введіть напрямок (C to F або F to C):");

    let result;

    if (direction === "C to F") {
        result = celsiusToFahrenheit(tempInput);
        let message = `${tempInput}°C = ${result.toFixed(1)}°F`;
        console.log(message);
        alert(message);
    } else if (direction === "F to C") {
        result = fahrenheitToCelsius(tempInput);
        let message = `${tempInput}°F = ${result.toFixed(1)}°C`;
        console.log(message);
        alert(message);
    } else {
        let errorMessage = "Помилка: Неправильний напрямок конвертації!";
        console.log(errorMessage);
        alert(errorMessage);
    }
}
