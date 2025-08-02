document.addEventListener('DOMContentLoaded', function () {
    const swiperThumbs = new Swiper('.swiper-product-page', {
        direction: 'horizontal',
        slidesPerView: '5',
        spaceBetween: 6,
        navigation: {
            nextEl: '.swiper-product-button-next',
            prevEl: '.swiper-product-button-prev',
        },
        breakpoints: {
            1300: {
                slidesPerView: '4',
                spaceBetween: 10,
                direction: 'vertical'
            }
        }
    });

    const mainImage = document.querySelector('.product_page__img');
    const thumbnails = document.querySelectorAll('.product-page_preview img, .product-page_preview video');
    let currentVideo = null;

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function () {
            mainImage.innerHTML = '';

            const btnVideo = document.createElement('div');
            btnVideo.classList.add('video_btn');

            const clone = this.cloneNode(true);
            mainImage.appendChild(clone);

            if (clone.tagName.toLowerCase() === 'video') {
                currentVideo = clone;
                mainImage.appendChild(btnVideo);

                clone.setAttribute('playsinline', '');

                clone.addEventListener('loadedmetadata', function () {
                    btnVideo.style.display = 'flex';
                });

                clone.addEventListener('play', function () {
                    btnVideo.style.display = 'none';
                });

                clone.addEventListener('pause', function () {
                    btnVideo.style.display = 'flex';
                });

                clone.addEventListener('ended', function () {
                    clone.currentTime = 0;
                    btnVideo.style.display = 'flex';
                });

                btnVideo.addEventListener('click', function (e) {
                    e.stopPropagation();
                    if (clone.paused) {
                        clone.play();
                    } else {
                        clone.pause();
                    }
                });

                clone.addEventListener('click', function () {
                    if (clone.paused) {
                        clone.play();
                    } else {
                        clone.pause();
                    }
                });


            }
        });
    });

    const minusBtn = document.querySelector('.counter_btn-minus');
    const plusBtn = document.querySelector('.counter_btn-plus');
    const input = document.querySelector('.counter_count input[name="count"]');

    function validateInput() {
        let value = parseInt(input.value) || 0;
        if (value < 0) value = 0;
        if (value > 999) value = 999;
        input.value = value;
        return value;
    }

    minusBtn.addEventListener('click', function () {
        let value = validateInput();
        if (value > 0) {
            input.value = value - 1;
        }
    });

    plusBtn.addEventListener('click', function () {
        let value = validateInput();
        input.value = value + 1;
    });

    input.addEventListener('input', function (e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    input.addEventListener('blur', validateInput);

    const btnLinkCopy = document.querySelector('.btn.product_card_link');
    btnLinkCopy.addEventListener('click', () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
            .then(() => btnLinkCopy.classList.add('copy'))
            .catch(err => console.error('Не удалось скопировать ссылку:', err));
    });
});

