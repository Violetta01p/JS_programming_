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
    let type = prompt("Введіть тип користувача (user/admin):").toLowerCase();

    let name = prompt("Введіть ім'я:");
    
    let ageInput = prompt("Введіть вік:");
    let age = Number(ageInput);

    if (isNaN(age) || age <= 0) {
        alert("Помилка: вік має бути числом більше 0!");
        return;
    }

    let profession = prompt("Введіть професію:");

    let obj;

    if (type === "admin") {
        let role = prompt("Введіть роль адміністратора:");
        obj = new Admin(name, age, profession, role);
    } else {
        obj = new User(name, age, profession);
    }

    obj.display();

    alert(
        `Дані збережено!\n` +
        `Ім'я: ${obj.name}\n` +
        `Вік: ${obj.age}\n` +
        `Професія: ${obj.profession}` +
        (type === "admin" ? `\nРоль: ${obj.role}` : "") +
        `\nДивись консоль (F12 + Fn)`
    );
}
