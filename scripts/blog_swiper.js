const swiperBlog = new Swiper('.swiper_blog', {
    slidesPerView: 'auto',
    spaceBetween:0,
    centeredSlides: true,
    initialSlide: 1,
    speed: 600, // Скорость анимации в ms
    resistanceRatio: 0.7, // Чувствительность свайпа
    navigation: {
        nextEl: '.swiper_blog-nav.swiper-button-custom-next',
        prevEl: '.swiper_blog-nav.swiper-button-custom-prev',
    },
    
    on: {
        init: function() {
            // Принудительное обновление после инициализации
            setTimeout(() => this.update(), 100);
        }
    }
});