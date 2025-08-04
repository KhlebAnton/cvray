const swiperReviews = new Swiper('.swiper_review',
    {
        slidesPerView: 'auto',
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper_review .swiper-button-custom-next',
            prevEl: '.swiper_review .swiper-button-custom-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,

        },
        breakpoints: {
            
            1000: {
                spaceBetween: 20,
                slidesPerView: 3,
            },
            1300: {
                spaceBetween: 20,
                slidesPerView: 4,
            }
        }
    }
);