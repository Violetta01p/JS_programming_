"use strict";

console.log("JS підключено");

const output = document.getElementById("output");
const btnUsers = document.getElementById("loadUsers");
const btnPokemon = document.getElementById("loadPokemon");



fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())
  .then(data => console.log("Users:", data))
  .catch(error => console.error("Помилка:", error));



async function loadUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("HTTP помилка: " + response.status);
    }

    const data = await response.json();

    output.textContent = JSON.stringify(data, null, 2);

  } catch (error) {
    output.textContent = "Помилка: " + error.message;
  }
}

btnUsers.addEventListener("click", loadUsers);



async function loadPokemon() {
  const name = prompt("Введіть ім'я або ID покемона:");

  if (!name) return;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    if (!response.ok) {
      throw new Error("Покемона не знайдено!");
    }

    const data = await response.json();

    const result = {
      name: data.name,
      id: data.id,
      height: data.height,
      weight: data.weight,
      types: data.types.map(t => t.type.name)
    };

    output.textContent = JSON.stringify(result, null, 2);

  } catch (error) {
    output.textContent = "Помилка: " + error.message;
  }
}

btnPokemon.addEventListener("click", loadPokemon);



async function loadMultiple() {
  try {
    const [users, posts] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users").then(r => r.json()),
      fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json())
    ]);

    console.log("Users:", users);
    console.log("Posts:", posts);

  } catch (error) {
    console.error("Помилка Promise.all:", error);
  }
}

loadMultiple();