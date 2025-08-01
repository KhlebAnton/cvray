document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 0) {
      header.classList.remove('is-scrolled', 'is-visible');
      return;
    }

    if (currentScrollY > lastScrollY) {
      header.classList.add('is-scrolled');
      header.classList.remove('is-visible');
    } else {
      header.classList.remove('is-scrolled');
      header.classList.add('is-visible');
    }

    lastScrollY = currentScrollY;
  });
  const btnToTop = document.querySelector('.btn_page-top');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      btnToTop.classList.add('is-visible');
    } else {
      btnToTop.classList.remove('is-visible');
    }
  });

  btnToTop.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  function productOnModal(btn, modal) {
    const product = btn.closest('.product-card');

    const imgProduct = product.querySelector('.product-card_img');
    const titleProduct = product.querySelector('.product-card_title');
    const priceProduct = product.querySelector('.product-card_price');

    const imgModal = modal.querySelector('.quick-order__img');
    const titleModal = modal.querySelector('.quick-order__name');
    const priceModal = modal.querySelector('.quick-order__price');
    imgModal.src = imgProduct.src;
    titleModal.textContent = titleProduct.textContent;
    priceModal.textContent = priceProduct.textContent;
  }
  // Элементы модальных окон
  const modals = {
    basket: document.getElementById('basketMenu'),
    quickOrder: document.getElementById('quickOrderMenu'),
    likeOrder: document.getElementById('likeOrderMenu'),
    catalog: document.getElementById('catalogMenu'),
    search: document.getElementById('searchMenu'),
    form: document.getElementById('modalForm'),
    menu: document.getElementById('mobileMenu'),
    auth: document.getElementById('modalAuth'),
    regist: document.getElementById('modalRegist'),
    password: document.getElementById('modalPassword'),
  };

  // Закрытие модалок при клике на крестик или оверлей
  document.querySelectorAll('.modal-overlay, .modal-content__close').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
      if (e.target === closeBtn || closeBtn.classList.contains('modal-content__close')) {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
          modal.classList.remove('is-open');
          if (modal.querySelector('form')) {
            modal.querySelector('form').classList.remove('success_form');

          }
        });
        document.body.classList.remove('no-scroll');
      }
    });
  });

  // Предотвращаем закрытие при клике внутри контента
  document.querySelectorAll('.menu-content, .modal-content').forEach(content => {
    content.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  // Открытие модалок
  function openModal(modal) {
    if (!modal) return;
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('is-open'));
    modal.classList.add('is-open');
    document.body.classList.add('no-scroll');
  }

  // Обработчики для кнопок меню
  document.querySelectorAll('.btn--menu').forEach(btn => {
    btn.addEventListener('click', () => openModal(modals.catalog));
  });

  // Обработчики для кнопок поиска
  document.querySelectorAll('.btn--search').forEach(btn => {
    btn.addEventListener('click', () => openModal(modals.search));
  });

  // Обработчики для кнопок корзины
  document.querySelectorAll('.btn--basket').forEach(btn => {
    btn.addEventListener('click', () => openModal(modals.basket));
  });

  // Обработчики для кнопок быстрого заказа (data-btn="buyLike")
  document.querySelectorAll('[data-btn="buyLike"]').forEach(btn => {
    btn.addEventListener('click', () => {
      productOnModal(btn, modals.likeOrder);
      openModal(modals.likeOrder);
    });
  });
  // Обработчики для кнопок похожего заказа (data-btn="quickBuy")
  document.querySelectorAll('[data-btn="quickBuy"]').forEach(btn => {
    btn.addEventListener('click', () => {
      productOnModal(btn, modals.quickOrder);

      openModal(modals.quickOrder)
    });
  });

  // Обработчики для кнопок формы (data-btn="modalForm")
  document.querySelectorAll('[data-btn="modalForm"]').forEach(btn => {
    btn.addEventListener('click', () => openModal(modals.form));
  });

  // burger 
  document.querySelector('.btn--burger').addEventListener('click', () => {
    openModal(modals.menu)
  })

  // data-btn="addBasket"
  document.querySelectorAll('[data-btn="addBasket"]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.add('added');
      btn.querySelector('span').textContent = 'В корзине';
    })

  });

  //  data-btn="likeProduct"
  document.querySelectorAll('[data-btn="likeProduct"]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('liked');

    })

  });
  // auth 
  document.querySelector('[data-btn="auth"]').addEventListener('click', () => {
    openModal(modals.auth)
  })
  // regist
  document.querySelector('[data-btn="regist"]').addEventListener('click', () => {
    openModal(modals.regist)
  })
  // paswword 
  document.querySelector('[data-btn="password"]').addEventListener('click', () => {
    openModal(modals.password)
  })


  const phoneInputs = document.querySelectorAll('.phone-input');
  if (phoneInputs.length) {
    phoneInputs.forEach(input => {
      var iti = window.intlTelInput(input, {
        nationalMode: true,
        initialCountry: 'auto',
        geoIpLookup: function (callback) {
          jQuery.get('https://ipinfo.io', function () { }, 'jsonp').always(function (resp) {
            var countryCode = resp && resp.country ? resp.country : 'us';
            callback(countryCode);
          });
        },
        utilsScript: './scripts/utils.js',
        preferredCountries: ['ru']
      });
      var handleChange = function () {
        var text = iti.isValidNumber() ? iti.getNumber() : '';
        iti.setNumber(text);
        input.value = text;
      };
      input.addEventListener('mouseleave', handleChange);
      input.addEventListener('change', handleChange);
    });
  }
  function validateName(name) {
    name = name.trim();
    return name.length >= 2 && /^[a-zA-Zа-яА-ЯёЁ\- ]+$/.test(name);
  }

  document.querySelectorAll('.form').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const nameInput = this.querySelector('input[name="name"]');
      if (!nameInput) {
        if (form.querySelector('.success_form__content')) {
          form.classList.add('success_form');

        }
        return
      }; 

      const nameLabel = nameInput.closest('.input_label');
      const errorMsg = nameLabel.querySelector('.error_msg');

      if (!validateName(nameInput.value)) {
        e.preventDefault();
        nameLabel.classList.add('error');
        errorMsg.style.display = 'block';
      } else {
        nameLabel.classList.remove('error');
        errorMsg.style.display = 'none';
        if (form.querySelector('.success_form__content')) {
          form.classList.add('success_form');

        }
      }

    });

    const nameInput = form.querySelector('input[name="name"]');
    if (nameInput) {
      nameInput.addEventListener('input', function () {
        const nameLabel = this.closest('.input_label');
        const errorMsg = nameLabel.querySelector('.error_msg');

        if (validateName(this.value)) {
          nameLabel.classList.remove('error');
          errorMsg.style.display = 'none';
        }
      });
    }

  });



});