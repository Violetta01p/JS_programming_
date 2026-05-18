import React from 'react';
import { calculatePrestigeCoins } from '../utils/formulas';

// Компонент відповідає за Критерії №3 (Престиж) та №4 (Скіни)
export default function PrestigeAndSkins({ totalEarned, currentSkin, onPrestige, onChangeSkin }) {
  // Прораховуємо кількість монет, яку принесе престиж прямо зараз
  const coins = calculatePrestigeCoins(totalEarned);
  
  return (
    <section style={{ flex: 1, borderLeft: '1px solid #ccc', paddingLeft: '15px' }}>
      {/* Модуль Престижу */}
      <h3> Престиж</h3>
      <p>Зароблено всього: {totalEarned}</p>
      {/* Кнопка заблокована, якщо формули повертають 0 (гравець не набив ліміт у 10,000 кредитів) */}
      <button onClick={onPrestige} disabled={coins === 0}>
        Скинути прогрес (+{coins} Duiktcoins)
      </button>

      {/* Модуль Скінів (Критерій №4) */}
      <h3>🎨 Скіни (Теми)</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {/* Кнопки перемикання тем. При натисканні передають текстовий ідентифікатор скіна в стейт */}
        <button onClick={() => onChangeSkin('default')}>Світла</button>
        <button onClick={() => onChangeSkin('dark')} style={{ background: '#333', color: '#fff' }}>Темна</button>
        <button onClick={() => onChangeSkin('neon')} style={{ background: '#000', color: '#00ffcc' }}>Неон</button>
      </div>
    </section>
  );
}