// Имитация базы данных заявок
const initialRequests = [
    {
        id: 1,
        title: "Доставка продуктов из магазина",
        description: "Нужно купить продукты по списку (молоко, хлеб, картофель, яйца) в ближайшем «Магните» и занести на 4 этаж. Лифт временно не работает.",
        category: "products",
        categoryName: "Продукты / Лекарства",
        address: "ул. Ленина, д. 12, кв. 45",
        time: "Сегодня до 18:00"
    },
    {
        id: 2,
        title: "Сопровождение на прогулку в парк",
        description: "Пожилой человек на инвалидной коляске ищет компанию для часовой прогулки в городском парке. Нужна помощь с преодолением бордюров.",
        category: "walk",
        categoryName: "Сопровождение",
        address: "Встреча у входа в Парк Культуры",
        time: "Завтра (Вторник) в 12:00"
    },
    {
        id: 3,
        title: "Помощь в генеральной уборке",
        description: "Девушка с нарушением зрения просит помочь протереть пыль на верхних полках шкафов и помыть окна к зиме.",
        category: "home",
        categoryName: "Помощь по дому",
        address: "пр. Мира, д. 84, кв. 11",
        time: "В любые выходные"
    },
    {
        id: 4,
        title: "Забрать лекарства из поликлиники",
        description: "Необходимо получить льготный рецептурный препарат в аптечном пункте поликлиники №3 и доставить на дом. Рецепт передам лично.",
        category: "products",
        categoryName: "Продукты / Лекарства",
        address: "ул. Чехова, д. 5, кв. 3",
        time: "Срочно (до четверга)"
    }
];

// Элементы страницы
const cardsContainer = document.getElementById('cards-container');
const tabButtons = document.querySelectorAll('.tab-btn');

// Функция отрисовки карточек
function renderCards(categoryFilter = 'all') {
    cardsContainer.innerHTML = '';
    
    const filteredRequests = categoryFilter === 'all' 
        ? initialRequests 
        : initialRequests.filter(req => req.category === categoryFilter);

    if (filteredRequests.length === 0) {
        cardsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 40px;">Заявок в этой категории пока нет.</p>`;
        return;
    }

    filteredRequests.forEach(req => {
        const cardHTML = `
            <div class="card" id="card-${req.id}">
                <span class="card-tag tag-${req.category}">${req.categoryName}</span>
                <h3>${req.title}</h3>
                <p class="card-desc">${req.description}</p>
                <div class="card-meta">
                    <div>📍 <strong>Адрес:</strong> ${req.address}</div>
                    <div>🕒 <strong>Когда:</strong> ${req.time}</div>
                </div>
                <button class="help-btn" onclick="acceptRequest(${req.id})">Откликнуться на заявку</button>
            </div>
        `;
        cardsContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// Логика кнопки "Откликнуться"
function acceptRequest(id) {
    const card = document.getElementById(`card-${id}`);
    const button = card.querySelector('.help-btn');
    
    button.textContent = 'Вы откликнулись ✓';
    button.classList.add('accepted');
    button.disabled = true;
    
    alert('Спасибо! Контакты заявителя и подробные инструкции отправлены вам в личный кабинет.');
}

// Переключение табов/фильтров
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Убираем активный класс у всех кнопок
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем нажатой кнопке
        button.classList.add('active');
        // Перерисовываем карточки
        renderCards(button.getAttribute('data-category'));
    });
});

// Инициализация при загрузке страницы
renderCards();
