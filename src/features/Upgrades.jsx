import React from 'react';
import { calculateCost } from '../utils/formulas';

// Критерій №1: Константний масив метаданих для 5 обов'язкових типів покращень у грі
const UPGRADE_TYPES = [
  { id: 'clickPower', name: 'Мишка (+1 до кліку)', base: 10 },
  { id: 'autoClicker', name: 'Автоклікер (+1/с)', base: 50 },
  { id: 'miner', name: 'Відеокарта (+5/с)', base: 250 },
  { id: 'cyberFarm', name: 'Ферма (+25/с)', base: 1200 },
  { id: 'quantumComp', name: 'Квантовий ПК (+100/с)', base: 8000 },
];

export default function Upgrades({ upgrades, credits, onBuy }) {
  return (
    <section style={{ flex: 1, borderLeft: '1px solid #ccc', paddingLeft: '15px' }}>
      <h3>🛒 Магазин (5 типів)</h3>
      {/* За допомогою методу .map() динамічно генеруємо JSX-картку для кожного апгрейду в списку */}
      {UPGRADE_TYPES.map(upg => {
        // Розраховуємо ціну для конкретного рівня конкретного апгрейду прямо під час циклу рендерингу
        const cost = calculateCost(upg.base, upgrades[upg.id]);
        return (
          <div key={upg.id} style={{ margin: '10px 0', padding: '5px', background: 'rgba(0,0,0,0.02)' }}>
            {/* Виводимо ім'я апгрейду та його поточний рівень, взятий зі стейту */}
            <span>{upg.name} [Лвл: {upgrades[upg.id]}]</span><br />
            {/* Кнопка покупки. Автоматично вимикається, якщо у користувача недостатньо кредитів */}
            <button onClick={() => onBuy(upg.id, upg.base)} disabled={credits < cost}>
              Купити за {cost}
            </button>
          </div>
        );
      })}
    </section>
  );
}