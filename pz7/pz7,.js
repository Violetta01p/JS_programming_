"use strict";

const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

function getTasks() {
    try {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : []; 
    } catch (err) {
        console.log("Помилка JSON", err);
        return [];
    }
}


function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const tasks = getTasks();

    list.innerHTML = tasks.map((task, index) => 
        `<li data-index="${index}">${task}</li>`
    ).join(""); 
}

document.getElementById("addTask").addEventListener("click", () => {
    const text = input.value.trim();
    if (text !== "") {
        const tasks = getTasks(); 
        tasks.push(text);         
        saveTasks(tasks);         
        renderTasks();            
        input.value = "";      
    }
});

list.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        const index = event.target.getAttribute("data-index");
        const tasks = getTasks();
        tasks.splice(index, 1); 
        saveTasks(tasks);
        renderTasks();
    }
});
renderTasks();
const nums = [1, 2, 3, 4, 5];

console.log("Квадрати (map):", nums.map(n => n * n));
console.log("Парні (filter):", nums.filter(n => n % 2 === 0));
console.log("Сума (reduce):", nums.reduce((sum, n) => sum + n, 0));