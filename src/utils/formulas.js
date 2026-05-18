// Розрахунок ціни апгрейду: кожен рівень дорожчий на 50%
export const calculateCost = (baseCost, level) => {
  return Math.floor(baseCost * Math.pow(1.5, level));
};

// Розрахунок монет престижу через квадратний корінь від усього заробітку
export const calculatePrestigeCoins = (totalCredits) => {
  if (totalCredits < 10000) return 0; // Доступно від 10,000 кредитів
  return Math.floor(Math.sqrt(totalCredits) / 100);
};