"use strict"; // Strict mode (Пункт 1)

// --- Функції, замикання та каррінг ---
// Створюємо універсальну функцію для перевірки довжини тексту
const validateLength = (minLength) => {
    return (text) => {
        // Перевіряємо, чи текст не порожній і чи достатня його довжина
        return text !== null && text.trim().length >= minLength;
    };
};
// Функція перевіряє, чи ввів користувач хоча б 2 символи
const isValidInput = validateLength(2);


// Базовий клас
class ResumeBlock {
    constructor(title) {
        this.title = title;
    }
    getHTML() {
        return `<h3>${this.title}</h3>`;
    }
}

// Клас особистих даних
class PersonalInfo extends ResumeBlock {
    constructor(name, age, phone) {
        super("Особиста інформація"); 
        this.name = name;
        this._age = Number(age); // Переводимо введений вік у число
        this.phone = phone;
    }

    // Геттер і сеттер для віку
    get age() {
        return this._age;
    }
    set age(value) {
        if (value > 0 && value < 100) {
            this._age = value;
        }
    }

    getHTML() {
        return super.getHTML() + `
            <p><strong>Ім'я:</strong> ${this.name}</p>
            <p><strong>Вік:</strong> ${this.age} років</p>
            <p><strong>Контакти:</strong> ${this.phone}</p>
        `;
    }
}

// Клас для текстових блоків (Освіта та Досвід)
class TextBlock extends ResumeBlock {
    constructor(title, content) {
        super(title);
        this.content = content || "Дані не введено";
    }
    getHTML() {
        return super.getHTML() + `<p>${this.content}</p>`;
    }
}

// Головний клас, який збирає резюме
class Resume {
    constructor(personalInfo, education, experience, skills) {
        this.personalInfo = personalInfo;
        this.education = education;
        this.experience = experience;
        this.skills = skills;
    }

    render(containerElement) {
        // Формуємо список навичок
        let skillsHTML = `<h3>Навички</h3><ul>`;
        for (let skill of this.skills) {
            skillsHTML += `<li>${skill}</li>`;
        }
        skillsHTML += `</ul>`;

        // Виводимо все на екран
        containerElement.innerHTML = 
            this.personalInfo.getHTML() + 
            this.education.getHTML() + 
            this.experience.getHTML() + 
            (this.skills.length > 0 ? skillsHTML : "<p>Навички не вказані</p>");
        
        // Показуємо прихований блок з резюме
        containerElement.style.display = "block"; 
    }
}


// --- Збір даних від користувача (DOM, prompt, alert) ---

document.getElementById('startBtn').addEventListener('click', () => {
    // 1. Користувач вводить основні дані через prompt
    const name = prompt("Введіть ваше ім'я:");
    
    // Валідація: якщо ім'я введено неправильно, зупиняємо роботу
    if (!isValidInput(name)) {
        alert("Помилка: Ім'я має містити хоча б 2 літери!");
        return; 
    }

    const age = prompt("Введіть ваш вік:");
    const phone = prompt("Введіть ваш номер телефону:");
    const eduText = prompt("Введіть вашу освіту :");
    const expText = prompt("Введіть ваш досвід роботи:");

    // 2. Користувач вводить навички (цикл, поки не натисне "Скасувати")
    let skillsArray = [];
    let addMoreSkills = true;
    
    while (addMoreSkills) {
        const skill = prompt("Введіть навичку (або натисніть 'Скасувати', якщо більше немає):");
        
        if (skill === null) {
            addMoreSkills = false; // Якщо користувач натиснув "Скасувати"
        } else if (isValidInput(skill)) {
            skillsArray.push(skill); // Додаємо навичку в масив
        }
    }

    // 3. Створення об'єктів
    const personal = new PersonalInfo(name, age, phone);
    const education = new TextBlock("Освіта", eduText);
    const experience = new TextBlock("Досвід роботи", expText);

    // 4. Створення фінального резюме
    const myResume = new Resume(personal, education, experience, skillsArray);

    // 5. Відображення на сторінці
    const outputDiv = document.getElementById('resumeOutput');
    myResume.render(outputDiv);

    // 6. Робота з DevTools та localStorage
    console.log("Дані резюме зібрано:", myResume);
    localStorage.setItem("savedResume", JSON.stringify(myResume));
    
    alert("Резюме успішно створено!");
});