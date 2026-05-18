import React from 'react';

// Функціональний компонент, що приймає дані через пропси (деструктуризація параметрів)
export default function StatusBar({ credits, passiveIncome, clickPower, duiktcoins }) {
  return (
    // Використовуємо інлайнові стилі для простого візуального розділення елементів
    <header style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
      <h1>Cyber Clicker Pro 2026</h1>
      {/* Баланс користувача */}
      <div>Баланс: <strong>{credits}</strong> кр.</div>
      {/* Метрики ефективності кліку та пасивного доходу за секунду */}
      <div>Дохід: {passiveIncome} кр/сек | Сила кліку: {clickPower} кр.</div>
      {/* Кількість валюти престижу та опис її бафу */}
      <div>Duiktcoins: {duiktcoins} (+{duiktcoins * 10}% доходу)</div>
    </header>
  );
}