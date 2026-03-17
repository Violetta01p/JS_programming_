"use strict";

class Animal {
    constructor(name) {
        this._name = name; 
    }
    
    get name() {
        return this._name;
    }
    
    makeSound() {
        console.log("Тварина видає звук.");
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
    
    makeSound() {
        console.log(`Собака на ім'я ${this.name} гавкає: Гав-гав!`);
    }
}

function runTask2() {
    alert("Увага: JavaScript не підтримує повну абстракцію на рівні мови. Але ми використали інкапсуляцію, наслідування та поліморфізм!");
    
    let dogName = prompt("Введіть ім'я вашого собаки:", "Рекс");
    let dogBreed = prompt("Введіть породу собаки:", "Вівчарка");
    
    let myDog = new Dog(dogName, dogBreed);
    
    myDog.makeSound(); 
    
    alert(`Створено собаку: ${myDog.name}, порода: ${myDog.breed}. \nЗвук виведено в консоль (F12)!`);
}
