"use strict";

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.querySelector("#addTask");
const taskList = document.getElementById("taskList");

addTaskButton.addEventListener("click", function() {

    const taskText = taskInput.value.trim();

    if (taskText) {
        const li = document.createElement("li");
        li.textContent = taskText;

        taskList.appendChild(li);

        taskInput.value = ""; 
    }
});

taskList.addEventListener("click", function(event) {
    if (event.target.nodeName === "LI") {
        event.target.remove();
        console.log("Завдання видалено!");
    }
});
