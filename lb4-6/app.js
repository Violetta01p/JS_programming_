"use strict";

// Отримуємо елементи з HTML
const container = document.getElementById('showsContainer');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const errorMessage = document.getElementById('error-message');

// Створюємо нові елементи для пагінації в JS (або знайдіть їх, якщо вони вже є в HTML)
// Для зручності додамо їх динамічно під контейнер фільмів, якщо їх немає в HTML
const paginationContainer = document.createElement('div');
paginationContainer.className = 'pagination';
container.after(paginationContainer);

let allShows = [];       // Масив для збереження всіх завантажених фільмів
let filteredShows = [];  // Масив для збереження відфільтрованих/відсортованих фільмів
let currentPage = 1;     // Поточна сторінка
const itemsPerPage = 12; // Кількість фільмів на одній сторінці (можна змінити)

// 1. Асинхронна функція для отримання даних
const fetchShows = async () => {
    try {
        const response = await fetch('https://api.tvmaze.com/shows');
        
        if (!response.ok) {
            throw new Error(`Помилка: ${response.status}`);
        }

        const data = await response.json();
        
        // Тепер беремо ВСІ фільми, що повернуло API
        allShows = data; 
      
        
        // Ініціалізуємо відфільтрований масив початковими даними
        filteredShows = [...allShows];

        // Запускаємо фільтрацію та малювання (воно врахує поточну сторінку)
        handleFilterAndSort();
    } catch (error) {
        errorMessage.textContent = 'Не вдалося завантажити фільми. Спробуйте пізніше.';
        errorMessage.classList.remove('hidden');
        container.innerHTML = '';
        console.error(error);
    }
};

// 2. Функція відображення даних на сторінці (з урахуванням пагінації)
const renderShows = (shows) => {
    container.innerHTML = ''; 

    if (shows.length === 0) {
        container.innerHTML = '<p>За вашим запитом нічого не знайдено.</p>';
        paginationContainer.innerHTML = ''; // Ховаємо пагінацію, якщо нічого немає
        return;
    }

    // --- ЛОГІКА ПАГІНАЦІЇ ---
    // Рахуємо індекси для обрізання масиву під поточну сторінку
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Беремо шматочок масиву лише для поточної сторінки
    const showsToDisplay = shows.slice(startIndex, endIndex);

    // Створюємо HTML розмітку для шматочка фільмів
    const html = showsToDisplay.map(show => {
        const { name, rating, image, genres } = show;
        const imageUrl = image ? image.medium : 'https://via.placeholder.com/210x295?text=No+Image';
        const avgRating = rating && rating.average ? rating.average : 'Немає оцінки';

        return `
            <div class="card">
                <img src="${imageUrl}" alt="${name}">
                <h3>${name}</h3>
                <p><strong>Рейтинг:</strong> ${avgRating}</p>
                <p><strong>Жанри:</strong> ${genres.join(', ')}</p>
            </div>
        `;
    }).join('');

    container.innerHTML = html;

    // Після малювання фільмів, оновлюємо кнопочки сторінок
    renderPagination(shows.length);
};

// 3. Функція для створення кнопок перемикання сторінок
const renderPagination = (totalItems) => {
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Якщо сторінка всього одна, кнопки гортання не потрібні
    if (totalPages <= 1) return;

    // Кнопка "Назад"
    const prevButton = document.createElement('button');
    prevButton.textContent = '« Назад';
    prevButton.disabled = currentPage === 1; // Вимикаємо на першій сторінці
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderShows(filteredShows);
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Скрол вгору при гортанні
        }
    });

    // Інформація про поточну сторінку
    const pageInfo = document.createElement('span');
    pageInfo.textContent = ` Сторінка ${currentPage} з ${totalPages} `;
    pageInfo.style.margin = '0 15px';

    // Кнопка "Вперед"
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Вперед »';
    nextButton.disabled = currentPage === totalPages; // Вимикаємо на останній сторінці
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderShows(filteredShows);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Додаємо елементи у контейнер пагінації
    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(pageInfo);
    paginationContainer.appendChild(nextButton);
};

// 4. Функція фільтрації та сортування
const handleFilterAndSort = () => {
    const searchText = searchInput.value.toLowerCase();
    const sortValue = sortSelect.value;

    // Фільтруємо глобальний масив усіх фільмів
    filteredShows = allShows.filter(show => 
        show.name.toLowerCase().includes(searchText)
    );

    // Сортуємо
    if (sortValue === 'rating') {
        filteredShows.sort((a, b) => {
            const ratingA = a.rating?.average || 0;
            const ratingB = b.rating?.average || 0;
            return ratingB - ratingA;
        });
    } else if (sortValue === 'name') {
        filteredShows.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Скидаємо сторінку на 1-шу при кожному новому пошуку чи сортуванні
    currentPage = 1;

    // Малюємо фільми з урахуванням фільтру та пагінації
    renderShows(filteredShows);
};

// 5. Додаємо слухачів подій
searchInput.addEventListener('input', handleFilterAndSort);
sortSelect.addEventListener('change', handleFilterAndSort);

// Запускаємо додаток
fetchShows();