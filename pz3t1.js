"use strict";

class User {
    constructor(name, age, profession) {
        this.name = name;
        this.age = age;
        this.profession = profession;
    }
    
    display() {
        console.log(`Користувач: ${this.name}, Вік: ${this.age}, Професія: ${this.profession}`);
    }
}

class Admin extends User {
    constructor(name, age, profession, role) {
        super(name, age, profession);
        this.role = role;
    }
    
    display() {
        console.log(`Адміністратор: ${this.name}, Вік: ${this.age}, Професія: ${this.profession}, Роль: ${this.role}`);
    }
}

function runTask1() {
    let name = prompt("Введіть ім'я користувача:");
    let ageInput = prompt("Введіть вік:");
    let age = Number(ageInput);
    
    if (isNaN(age) || age <= 0) {
        alert("Помилка: вік має бути числом більшим за 0!");
        return; 
    }
    
    let profession = prompt("Введіть професію:");
    let role = prompt("Введіть роль адміністратора:");
    
    let admin = new Admin(name, age, profession, role);
    
    admin.display();
    alert(`Дані успішно збережено! \nАдміністратор: ${admin.name} \nРоль: ${admin.role} \nВідкрий консоль (F12 або Fn + F12) , щоб побачити деталі.`);
}
