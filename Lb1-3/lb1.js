"use strict";

class PersonalInfo {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}

class Resume {
    constructor(personalData) {
        this.personalData = personalData;
    }

    display() {
        let output = document.getElementById('resumeOutput');
        
        output.innerHTML = `
            <h2>Резюме</h2>
            <p><strong>Ім'я:</strong> ${this.personalData.name}</p>
            <p><strong>Email:</strong> ${this.personalData.email}</p>
        `;
    }
}

function buildResume() {
    let inputName = document.getElementById('nameInput').value;
    let inputEmail = document.getElementById('emailInput').value;

    if (inputName === "") {
        alert("Помилка! Будь ласка, введіть ім'я.");
        return;
    }

    let myInfo = new PersonalInfo(inputName, inputEmail);
    let myResume = new Resume(myInfo);

    myResume.display();
}
