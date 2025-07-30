document.addEventListener('DOMContentLoaded', function() {
    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true, 
        slidesPerView: 'auto',
        autoplay: {
            delay: 5000, 
        },
         spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            
        },
    });
});