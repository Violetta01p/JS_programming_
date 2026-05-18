// Збереження стану в LocalStorage з додаванням мітки часу
export const saveGame = (state) => {
  const dataToSave = { ...state, lastSaved: Date.now() };
  localStorage.setItem('clicker_game_save', JSON.stringify(dataToSave));
};

// Завантаження збереження (якщо є — повертаємо об'єкт, якщо ні — null)
export const loadGame = () => {
  const save = localStorage.getItem('clicker_game_save');
  return save ? JSON.parse(save) : null;
};