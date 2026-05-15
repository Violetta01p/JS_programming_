"use strict";

const nums = [1, 2, 3, 4, 5];
console.log("Map (квадрати):", nums.map(n => n * n));
console.log("Filter (парні):", nums.filter(n => n % 2 === 0));
console.log("Reduce (сума):", nums.reduce((sum, n) => sum + n, 0));

try {
    const data = JSON.parse('{"name": "Студент"}');
    console.log("Дані JSON:", JSON.stringify(data));
} catch (error) {
    console.error("Помилка JSON!", error);
}

async function testFetch() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        if (response.ok) {
            let data = await response.json();
            console.log("Отримано через Fetch API:", data);
        }
    } catch (error) {
        console.error("Помилка Fetch:", error);
    }
}
testFetch();

const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const button = document.getElementById("addTask");

function renderTasks() {
    list.innerHTML = ""; 
 
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []; 
    
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.textContent = task;
        li.dataset.index = index; 
        list.appendChild(li);
    });
}

document.getElementById("addTask").addEventListener("click", () => {
    let text = input.value.trim();
    if (text === "") return; 

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(text); 
    localStorage.setItem("tasks", JSON.stringify(tasks)); 

    input.value = ""; 
    renderTasks();    
});

list.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") { 
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.splice(event.target.dataset.index, 1); 
        localStorage.setItem("tasks", JSON.stringify(tasks)); 
        renderTasks(); 
    }
});
document.getElementById("addTask").addEventListener("mouseover", () => {
      console.log( button);
     let text = button;
  
    if (text === "") return; 

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(text); 
    localStorage.setItem("tasks", JSON.stringify(tasks)); 

    input.value = ""; 
    renderTasks();    
});

renderTasks();