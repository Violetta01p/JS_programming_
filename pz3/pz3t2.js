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
    
    let dogName = prompt("Введіть ім'я вашого собаки:");
    let dogBreed = prompt("Введіть породу собаки:");
    
    let myDog = new Dog(dogName, dogBreed);
    
    myDog.makeSound(); 
    
    alert(`Створено собаку: ${myDog.name}, порода: ${myDog.breed}. \nЗвук виведено в консоль (F12 aбо Fn +F12)!`);
}
