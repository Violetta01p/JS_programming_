"use strict";

// Отримуємо елементи з HTML
const container = document.getElementById('showsContainer');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const errorMessage = document.getElementById('error-message');

let allShows = []; // Масив для збереження всіх завантажених фільмів

// 1. Асинхронна функція для отримання даних (Fetch API + async/await)
const fetchShows = async () => {
    try {
        // Робимо запит до API
        const response = await fetch('https://api.tvmaze.com/shows');
        
        // Перевіряємо статус відповіді
        if (!response.ok) {
            throw new Error(`Помилка: ${response.status}`);
        }

        // Парсимо JSON
        const data = await response.json();
        
        // Беремо лише перші 50 фільмів, щоб сторінка працювала швидше
        allShows = data.slice(0, 50); 
        
        // Малюємо картки
        renderShows(allShows);
    } catch (error) {
        // Обробка помилок
        errorMessage.textContent = 'Не вдалося завантажити фільми. Спробуйте пізніше.';
        errorMessage.classList.remove('hidden');
        container.innerHTML = '';
        console.error(error);
    }
};

// 2. Функція відображення даних на сторінці
const renderShows = (shows) => {
    container.innerHTML = ''; // Очищаємо контейнер перед новим малюванням

    if (shows.length === 0) {
        container.innerHTML = '<p>За вашим запитом нічого не знайдено.</p>';
        return;
    }

    // Створюємо HTML розмітку за допомогою map та шаблонних рядків
    const html = shows.map(show => {
        // Деструктуризація об'єкта (беремо лише потрібні поля)
        const { name, rating, image, genres } = show;
        
        // Захист від відсутності картинки або рейтингу
        const imageUrl = image ? image.medium : 'https://via.placeholder.com/210x295?text=No+Image';
        const avgRating = rating && rating.average ? rating.average : 'Немає оцінки';

        // Шаблонний рядок
        return `
            <div class="card">
                <img src="${imageUrl}" alt="${name}">
                <h3>${name}</h3>
                <p><strong>Рейтинг:</strong> ${avgRating}</p>
                <p><strong>Жанри:</strong> ${genres.join(', ')}</p>
            </div>
        `;
    }).join(''); // Об'єднуємо масив рядків в один великий HTML-рядок

    // Вставляємо згенерований HTML на сторінку
    container.innerHTML = html;
};

// 3. Функція фільтрації та сортування
const handleFilterAndSort = () => {
    const searchText = searchInput.value.toLowerCase();
    const sortValue = sortSelect.value;

    // Фільтруємо масив (шукаємо збіги в назві)
    let filteredShows = allShows.filter(show => 
        show.name.toLowerCase().includes(searchText)
    );

    // Сортуємо відфільтрований масив
    if (sortValue === 'rating') {
        // За спаданням рейтингу
        filteredShows.sort((a, b) => {
            const ratingA = a.rating?.average || 0;
            const ratingB = b.rating?.average || 0;
            return ratingB - ratingA;
        });
    } else if (sortValue === 'name') {
        // За алфавітом
        filteredShows.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Малюємо оновлений список
    renderShows(filteredShows);
};

// 4. Додаємо слухачів подій (стрілочні функції)
searchInput.addEventListener('input', handleFilterAndSort);
sortSelect.addEventListener('change', handleFilterAndSort);

// Запускаємо додаток при завантаженні скрипта
fetchShows();