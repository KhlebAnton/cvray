// Настройки Swiper
const swiperSettings = {
    slidesPerView: 2, // По умолчанию 4 на ПК
    spaceBetween: 10,
    navigation: {
        nextEl: '.swiper-button-custom-next',
        prevEl: '.swiper-button-custom-prev',
    },
    pagination: {
            el: '.swiper-pagination',
            clickable: true,
            
        },
    breakpoints: {
        500: {
            slidesPerView: 3,
             spaceBetween: 10,
        },
        800: {
            slidesPerView: 4,
             spaceBetween: 10,
        },
        1000: {
             spaceBetween: 20,
            slidesPerView: 3,
        },
         1200: {
             spaceBetween: 20,
            slidesPerView: 4,
        }
    }
};

// Создаём экземпляры Swiper для каждого блока
const swipers = {};
document.querySelectorAll('.swiper_promo').forEach(swiperEl => {
    const promoType = swiperEl.getAttribute('data-promo');
    swipers[promoType] = new Swiper(swiperEl, swiperSettings);
});
// Находим все элементы
const tabs = document.querySelectorAll('.product-promo-tab');
const swiperPromos = document.querySelectorAll('.swiper_promo');
const tabLinks = document.querySelectorAll('.tab_link');

// Обработчик клика на вкладку
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');

        // 1. Переключаем активность вкладок
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');

        // 2. Переключаем контент (swiper)
        swiperPromos.forEach(swiper => {
            swiper.style.display = 'none';
        });
        const activeSwiper = document.querySelector(`.swiper_promo[data-promo="${tabName}"]`);
        if (activeSwiper) {
            activeSwiper.style.display = 'block';
            // Обновляем Swiper (если скрыт, он может некорректно считать размеры)
            swipers[tabName].update();
        }

        // 3. Переключаем ссылки "Смотреть все"
        tabLinks.forEach(link => {
            link.style.display = 'none';
        });
        const activeLink = document.querySelector(`.tab_link[data-link="${tabName}"]`);
        if (activeLink) {
            activeLink.style.display = 'inline-block';
        }
    });
});

// Инициализация: показываем первую вкладку при загрузке
document.querySelector('.product-promo-tab.is-active').click();