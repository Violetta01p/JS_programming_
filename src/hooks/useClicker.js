import { useState, useEffect } from 'react';
import { loadGame, saveGame } from '../db/storage';
import { calculateCost, calculatePrestigeCoins } from '../utils/formulas';

// Шаблон початкового стану для абсолютно нового гравця (дефолтні значення)
const initialState = {
  credits: 0,              // Гроші на балансі, які можна витрачати прямо зараз
  totalCreditsEarned: 0,   // Лічильник заробітку за ВСІ часи (потрібен для чесного розрахунку престижу)
  duiktcoins: 0,           // Валюта престижу
  skin: 'default',         // Поточний візуальний скін (тема)
  upgrades: {              // Критерій №1: Рівні прокачки для 5 різних типів апгрейдів
    clickPower: 0, 
    autoClicker: 0, 
    miner: 0, 
    cyberFarm: 0, 
    quantumComp: 0 
  }
};

export const useClicker = () => {
  // Створюємо головний стейт гри. Якщо функція loadGame() знайде сейв у браузері — беремо його, інакше — initialState
  const [gameState, setGameState] = useState(() => {
    const saved = loadGame();
    return saved ? saved : initialState;
  });

  // Локальні реактивні стани для керування Критерієм №2 (Антибонуси)
  const [activeAntiBonus, setActiveAntiBonus] = useState(null); // Назва активного ефекту ('virus', 'ddos', 'bug')
  const [antiBonusTime, setAntiBonusTime] = useState(0);        // Зворотний таймер дії ефекту у секундах

  // useEffect №1: Автозбереження. Спрацьовує автоматично кожні 5 секунд, стежачи за змінами в gameState.
  useEffect(() => {
    const interval = setInterval(() => saveGame(gameState), 5000);
    return () => clearInterval(interval); // Очищаємо інтервал при демонтажі компонента, щоб не було витоку пам'яті
  }, [gameState]);

  // useEffect №2 (ДОДАТКОВА ВИМОГА): Розрахунок пасивного офлайн-доходу при завантаженні гри.
  useEffect(() => {
    const saved = loadGame();
    // Перевіряємо, чи є збереження і чи зафіксовано там час останнього збереження
    if (saved && saved.lastSaved) {
      // Рахуємо різницю між "зараз" і "тоді" та переводимо мілісекунди в секунди (/ 1000)
      const secondsOffline = Math.floor((Date.now() - saved.lastSaved) / 1000);
      
      // Якщо гравця не було в грі більше 10 секунд
      if (secondsOffline > 10) {
        // Множимо секунди відсутності на поточний пасивний дохід гравця за секунду
        const earned = secondsOffline * getPassiveIncome();
        
        if (earned > 0) {
          // Нараховуємо офлайн-гроші на баланс
          setGameState(prev => ({ 
            ...prev, 
            credits: prev.credits + earned, 
            totalCreditsEarned: prev.totalCreditsEarned + earned 
          }));
          // Сповіщаємо гравця про офлайн-заробіток
          alert(`Ви були офлайн ${secondsOffline} сек. Нараховано доходу: ${earned} кр.`);
        }
      }
    }
  }, []);

  // Функція динамічного розрахунку пасивного доходу за 1 секунду
  const getPassiveIncome = () => {
    // Критерій №2 (антибонус DDoS): повністю обнуляє пасивний дохід під час атаки!
    if (activeAntiBonus === 'ddos') return 0; 

    // Рахуємо суму базового доходу від усіх куплених будівель (рівень * силу будівлі)
    const basePassive = 
      gameState.upgrades.autoClicker * 1 + 
      gameState.upgrades.miner * 5 + 
      gameState.upgrades.cyberFarm * 25 + 
      gameState.upgrades.quantumComp * 100;

    // Критерій №3 (ефект престижу): кожна монета Duiktcoin дає +10% бонусу (множник 0.1) до пасивного доходу
    const multiplier = 1 + (gameState.duiktcoins * 0.1);
    
    return Math.floor(basePassive * multiplier); // Повертаємо підсумкове ціле значення
  };

  // Функція динамічного розрахунку сили одного кліку
  const getClickPower = () => {
    const baseClick = 1 + gameState.upgrades.clickPower * 1; // Базовий клік (1 + рівень прокачки мишки)
    
    // Критерій №2 (антибонус Вірус): якщо активний вірус, сила кліку ріжеться навпіл (множник 0.5)
    const multiplier = activeAntiBonus === 'virus' ? 0.5 : 1; 
    
    return Math.max(1, Math.floor(baseClick * multiplier)); // Повертаємо силу кліку (але не менше 1)
  };

  // useEffect №3: Головний ігровий цикл. Спрацьовує раз на секунду (1000 мс).
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Нарахування пасивних грошей щосекунди
      const income = getPassiveIncome();
      if (income > 0) {
        setGameState(prev => ({ 
          ...prev, 
          credits: prev.credits + income, 
          totalCreditsEarned: prev.totalCreditsEarned + income 
        }));
      }
      
      // 2. Логіка зворотного таймера для дебафів (антибонусів)
      if (activeAntiBonus) {
        setAntiBonusTime(prev => {
          if (prev <= 1) { 
            setActiveAntiBonus(null); // Час вийшов — видаляємо антибонус, система чиста
            return 0; 
          }
          return prev - 1; // Зменшуємо лічильник на 1 секунду
        });
      }

      // 3. Рандомайзер антибонусів: кожну секунду є 2% шансу (Math.random() < 0.02) підхопити вірус
      if (!activeAntiBonus && Math.random() < 0.02) {
        const types = ['virus', 'ddos', 'bug'];
        const chosen = types[Math.floor(Math.random() * types.length)]; // Випадковий вибір з масиву подій
        
        setActiveAntiBonus(chosen); // Встановлюємо активний дебаф
        setAntiBonusTime(15);       // Тривалість негативного ефекту — 15 секунд
        
        // Антибонус "Bug" (Баг) діє миттєво — одразу списує 10% грошей через "помилку в коді"
        if (chosen === 'bug') { 
          setGameState(prev => ({ ...prev, credits: Math.floor(prev.credits * 0.9) }));
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState.upgrades, activeAntiBonus]);

  // Обробник кліку по головній кнопці
  const handleClick = () => {
    const power = getClickPower();
    setGameState(prev => ({ 
      ...prev, 
      credits: prev.credits + power, 
      totalCreditsEarned: prev.totalCreditsEarned + power 
    }));
  };

  // Функція купівлі апгрейдів
  const buyUpgrade = (type, baseCost) => {
    const currentLevel = gameState.upgrades[type];
    const cost = calculateCost(baseCost, currentLevel); // Вираховуємо поточну ціну через формулу з utils
    
    // Перевірка: чи вистачає грошей на покупку
    if (gameState.credits >= cost) {
      setGameState(prev => ({ 
        ...prev, 
        credits: prev.credits - cost, // Списуємо кошти
        upgrades: { ...prev.upgrades, [type]: currentLevel + 1 } // Додаємо +1 рівень цьому апгрейду
      }));
    }
  };

  // Функція активації Престижу
  const triggerPrestige = () => {
    const bonusCoins = calculatePrestigeCoins(gameState.totalCreditsEarned);
    if (bonusCoins > 0) {
      setGameState(prev => ({ 
        ...initialState, // Повністю скидаємо всі ресурси та рівні апгрейдів на нуль...
        duiktcoins: prev.duiktcoins + bonusCoins, // ...але нараховуємо монети престижу
        skin: prev.skin // ...і залишаємо поточну тему оформлення
      }));
    }
  };

  // Функція зміни візуального скіна
  const changeSkin = (skinName) => { 
    setGameState(prev => ({ ...prev, skin: skinName })); 
  };

  // Критерій №2 (Бонуси): Відкриття кейсів (Лутбокс з шансом 50/50)
  const openCase = () => {
    if (gameState.credits >= 100) {
      // Math.random() > 0.5 дає рівно 50% шансу на виграш
      const win = Math.random() > 0.5;
      setGameState(prev => ({ 
        ...prev, 
        credits: prev.credits - 100 + (win ? 500 : 0) // Знімаємо 100 за вхід. Якщо виграв — даємо 500
      }));
      alert(win ? "🎰 Джекпот! +500 кредитів!" : "🗑️ Пустий кейс... Пощастить наступного разу!");
    }
  };

  // Експортуємо всі стейти та функції, щоб компоненти інтерфейсу могли їх використовувати
  return { gameState, getClickPower, getPassiveIncome, handleClick, buyUpgrade, triggerPrestige, changeSkin, openCase, activeAntiBonus, antiBonusTime };
};