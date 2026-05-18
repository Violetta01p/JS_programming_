import React from 'react';
import { useClicker } from './hooks/useClicker';
import StatusBar from './components/StatusBar';
import ClickButton from './components/ClickButton';
import Upgrades from './features/Upgrades';
import PrestigeAndSkins from './features/PrestigeAndSkins';
import './styles/Themes.scss'; // Імпортуємо файл тем (скінів) SASS

function App() {
  // Викликаємо наш кастомний React-хук useClicker і за допомогою деструктуризації забираємо з нього всі потрібні функції та стейти
  const { 
    gameState, getClickPower, getPassiveIncome, handleClick, 
    buyUpgrade, triggerPrestige, changeSkin, openCase, 
    activeAntiBonus, antiBonusTime 
  } = useClicker();

  return (
    // Завдяки динамічному рядку класу `app-container skin-${gameState.skin}` ми миттєво змінюємо палітру гри CSS при зміні стейту скіна
    <div className={`app-container skin-${gameState.skin}`}>
      
      {/* Рендеримо Верхню панель стану додатка, передаючи їй дані через пропси */}
      <StatusBar 
        credits={gameState.credits} 
        passiveIncome={getPassiveIncome()} 
        clickPower={getClickPower()} 
        duiktcoins={gameState.duiktcoins} 
      />
      
      {/* Критерій №2 (Антибонуси): Умовний рендеринг за допомогою логічного "І" (&&). 
          Плашка рендериться на екрані ТІЛЬКИ тоді, коли в activeAntiBonus лежить текст помилки */}
      {activeAntiBonus && (
        <div className="alert-danger">
          🚨 АКТИВОВАНО АНТИБОНУС: {activeAntiBonus.toUpperCase()}! ({antiBonusTime} сек)
        </div>
      )}

      {/* Головна сітка нашого SPA-додатка, побудована на flexbox архітектурі з відступами 20px */}
      <main style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        
        {/* Компонент Кліків та Бонусних кейсів */}
        <ClickButton onSpreadClick={handleClick} onOpenCase={openCase} currentCredits={gameState.credits} />
        
        {/* Компонент Магазину Апгрейдів (5 обов'язкових типів) */}
        <Upgrades upgrades={gameState.upgrades} credits={gameState.credits} onBuy={buyUpgrade} />
        
        {/* Компонент Керування Престижем та Кастомізацією стилів */}
        <PrestigeAndSkins totalEarned={gameState.totalCreditsEarned} currentSkin={gameState.skin} onPrestige={triggerPrestige} onChangeSkin={changeSkin} />
        
      </main>
    </div>
  );
}

export default App; // Експортуємо готовий компонент для рендерингу у вхідній точці main.jsx
