document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header');
  let lastScrollY = window.scrollY;
  let scrollUpDistance = 0;

  window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 100) {
      header.classList.remove('is-scrolled', 'is-visible');
      scrollUpDistance = 0;
      return;
    }

    if (currentScrollY > lastScrollY) {
      header.classList.add('is-scrolled');
      header.classList.remove('is-visible');
      scrollUpDistance = 0;
    } else if (currentScrollY <= 200) {
      header.classList.remove('is-scrolled');
      header.classList.add('is-visible');
    }
    else {
      scrollUpDistance += (lastScrollY - currentScrollY);

      if (scrollUpDistance > 300) {
        header.classList.remove('is-scrolled');
        header.classList.add('is-visible');
      }

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
    const product = btn.closest('.product-card') || btn.closest('.product_page-container');

    const imgProduct = product.querySelector('.product-card_img') || product.querySelector('.product-page_preview img');
    const titleProduct = product.querySelector('.product-card_title') || product.querySelector('.product-page__title h1');
    const priceProduct = product.querySelector('.product-card_price') || product.querySelector('.product-page__price-new');

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
    filter: document.getElementById('menuFilter'),
    orderSucces: document.getElementById('modalSuccesOrder'),
  };

  // Закрытие модалок при клике на крестик или оверлей
  document.querySelectorAll('.modal-overlay, .modal-content__close, [data-btn="closeModal"]').forEach(closeBtn => {
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
  });
  // btn--filter
  if (document.querySelector('.btn--filter')) {
    document.querySelector('.btn--filter').addEventListener('click', () => {
      openModal(modals.filter)
    });
  }


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
  document.querySelectorAll('[data-btn="auth"]').forEach(btn => {
    btn.addEventListener('click', () => {
    openModal(modals.auth)
  })
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
  function validateDateInput(input) {
    const value = input.value;
    const label = input.closest('.input_label');
    const errorMsg = label.querySelector('.error_msg');

    // Проверка на пустоту
    if (!value || value.length < 10) {
      showError(input, 'Введите дату в формате ДД.ММ.ГГГГ');
      return false;
    }

    // Разбиваем дату на части
    const [day, month, year] = value.split('.').map(Number);
    const date = new Date(year, month - 1, day);

    // Проверка на корректность (например, нет 31 февраля)
    const isDateValid = (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );

    if (!isDateValid) {
      showError(input, 'Некорректная дата');
      return false;
    }

    // Проверка, что дата не в прошлом
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      showError(input, 'Дата не может быть в прошлом');
      return false;
    }

    // Проверка, что дата не больше чем +100 лет
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 100);

    if (date > maxDate) {
      showError(input, 'Нельзя так далеко планировать');
      return false;
    }

    // Если всё правильно
    clearError(input);
    return true;
  }
  function showError(input, message) {
    const label = input.closest('.input_label');
    const errorMsg = label.querySelector('.error_msg');

    label.classList.add('error');
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
  }
  // Скрыть ошибку
  function clearError(input) {
    const label = input.closest('.input_label');
    const errorMsg = label.querySelector('.error_msg');

    label.classList.remove('error');
    errorMsg.style.display = 'none';
  }
  // Инициализация Cleave.js для даты (маска ДД.ММ.ГГГГ)
  const dateInputs = document.querySelectorAll('.date-input');
  dateInputs.forEach(input => {
    new Cleave(input, {
      date: true,
      datePattern: ['d', 'm', 'Y'],
      delimiter: '.',

    });

    // Проверка при вводе
    // input.addEventListener('input', function() {
    //     validateDateInput(this);
    // });
  });
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let isFormValid = true;

      // Проверка имени
      const nameInput = this.querySelector('input[name="name"]');
      if (nameInput) {
        if (!validateName(nameInput.value)) {
          showError(nameInput, '*ошибка ввода имени');
          nameInput.value += '*';
          isFormValid = false;
        } else {
          clearError(nameInput);
        }
      }

      // Проверка даты
      const dateInput = this.querySelector('.date-input');
      if (dateInput) {
        if (!validateDateInput(dateInput)) {
          isFormValid = false;
        }
      }

      if (isFormValid) {
        if (form.querySelector('.success_form__content')) {
          form.classList.add('success_form');
        }
        if (form.classList.contains('order-form')) {
          const dateForm = {
            nameClient: form.querySelector('input[name="recipient"]').checked ? form.querySelector('input[name="name"]').value : form.querySelector('input[name="nameRecipient"]').value,
            dateDelivery: form.querySelector('input[name="date"]').value,
            adressDelivery: form.querySelector('input[name="city"]').value + ", " + form.querySelector('input[name="adress"]').value,
            comment: form.querySelector('textarea[name="msg"]').value ? form.querySelector('textarea[name="msg"]').value : 'Нет комментария',
          };
          modals.orderSucces.querySelector('.order-data__date').textContent = dateForm.dateDelivery;
          modals.orderSucces.querySelector('.order-data__adress').textContent = dateForm.adressDelivery;
          modals.orderSucces.querySelector('.order-data__name').textContent = dateForm.nameClient;
          modals.orderSucces.querySelector('.order-data__comment').textContent = dateForm.comment;

          openModal(modals.orderSucces);

        }
      }
    });

    // Валидация имени при вводе
    const nameInput = form.querySelector('input[name="name"]');
    if (nameInput) {
      nameInput.addEventListener('input', function () {
        if (validateName(this.value)) {
          clearError(this);
        }
      });
    }
  });
  // category
  // Получаем все элементы табов
  const tabs = document.querySelectorAll('.product-filter__tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      tabs.forEach(t => t.classList.remove('is-active'));
      this.classList.add('is-active');
    });
  });

  // Находим все dropdown-компоненты на странице
  const dropdownWrappers = document.querySelectorAll('.dropdown-wrapper');

  dropdownWrappers.forEach(wrapper => {
    const dropdownBtn = wrapper.querySelector('.btn--dropdown');

    dropdownBtn.addEventListener('click', function (e) {
      e.preventDefault();
      wrapper.classList.toggle('is-open');
      dropdownBtn.classList.toggle('is-active')
    });
  });

  document.addEventListener('click', function (e) {
    dropdownWrappers.forEach(wrapper => {
      const dropdownBtn = wrapper.querySelector('.btn--dropdown');
      if (!wrapper.contains(e.target)) {
        wrapper.classList.remove('is-open');
        dropdownBtn.classList.remove('is-active')
      }
    });
  });


  // Находим все блоки с классом filter-price
  const filterPrices = document.querySelectorAll('.filter-price');

  if (filterPrices.length === 0) return;

  filterPrices.forEach(filter => {
    const sliderMin = filter.querySelector('.slider-min');
    const sliderMax = filter.querySelector('.slider-max');
    const sliderTrack = filter.querySelector('.slider-track');
    const priceMin = filter.querySelector('.price-min');
    const priceMax = filter.querySelector('.price-max');

    if (!sliderMin || !sliderMax || !sliderTrack || !priceMin || !priceMax) {
      console.error('Не хватает элементов для слайдера в блоке', filter);
      return;
    }

    function updateSlider() {
      const minVal = parseInt(sliderMin.value);
      const maxVal = parseInt(sliderMax.value);

      if (minVal > maxVal) {
        [sliderMin.value, sliderMax.value] = [maxVal, minVal]; // Обмен значений
        priceMin.textContent = formatPrice(maxVal);
        priceMax.textContent = formatPrice(minVal);
      } else {
        priceMin.textContent = formatPrice(minVal);
        priceMax.textContent = formatPrice(maxVal);
      }

      sliderTrack.style.left = (minVal / sliderMin.max * 100) + '%';
      sliderTrack.style.right = (100 - (maxVal / sliderMax.max * 100)) + '%';
    }

    function formatPrice(value) {
      return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
    }

    sliderMin.addEventListener('input', updateSlider);
    sliderMax.addEventListener('input', updateSlider);

    updateSlider();
  });

  // filter
  const filterContainer = document.querySelector('.filter-container');
  if (filterContainer) {
    const filterItems = filterContainer.querySelectorAll('.filter-item');

    filterItems.forEach(item => {
      const top = item.querySelector('.filter-item_top');
      top.addEventListener('click', () => {
        filterItems.forEach(i => {
          if (i !== item) {
            i.classList.remove('is-open');
          }
        });
        item.classList.toggle('is-open');
      });
    });

    const applyBtn = document.querySelector('[data-btn="apllyFilter"]');
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        modals.filter.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
      });
    }

    const resetBtn = document.querySelector('[data-btn="resetFilter"]');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        const checkboxes = filterContainer.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
          checkbox.checked = false;
        });

        const priceSliderMin = filterContainer.querySelector('.slider-min');
        const priceSliderMax = filterContainer.querySelector('.slider-max');
        if (priceSliderMin && priceSliderMax) {
          priceSliderMin.value = priceSliderMin.min;
          priceSliderMax.value = priceSliderMax.max;

          const event = new Event('input');
          priceSliderMin.dispatchEvent(event);
          priceSliderMax.dispatchEvent(event);
        }
      });
    }
  };


});

const accordionContainer = document.querySelector('.accordion-container');
if (accordionContainer) {
  const accordionItems = accordionContainer.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const top = item.querySelector('.accordion-item_top');
    top.addEventListener('click', () => {
      accordionItems.forEach(i => {
        if (i !== item) {
          i.classList.remove('is-open');
        }
      });
      item.classList.toggle('is-open');
    });
  });
}

// Находим все счётчики на странице
const counters = document.querySelectorAll('.counter');

if (counters) {
  counters.forEach(counter => {
    const minusBtn = counter.querySelector('.counter_btn-minus');
    const plusBtn = counter.querySelector('.counter_btn-plus');
    const input = counter.querySelector('.counter_count input[name="count"]');

    const isBasketItemCounter = counter.closest('.basket-item') !== null;

    function validateInput() {
      let value = parseInt(input.value) || (isBasketItemCounter ? 1 : 0);

      // Для корзины минимум 1, для остальных 0
      if (isBasketItemCounter) {
        if (value < 1) value = 1;
      } else {
        if (value < 0) value = 0;
      }

      if (value > 999) value = 999;
      input.value = value;
      return value;
    }

    function updateTotalPrice() {
      if (!isBasketItemCounter) return;

      const basketItem = counter.closest('.basket-item');
      const priceNew = basketItem.querySelector('.basket-item__price-new');
      const priceOld = basketItem.querySelector('.basket-item__price-old');
      const priceAllNew = basketItem.querySelector('.basket-item__price_all-new');
      const priceAllOld = basketItem.querySelector('.basket-item__price_all-old');

      const unitPrice = parseInt(priceNew.textContent.replace(/\s+/g, '').replace('₽', ''));
      const unitPriceOld = parseInt(priceOld.textContent.replace(/\s+/g, '').replace('₽', ''));

      const count = parseInt(input.value) || 1; // Для корзины минимум 1

      const totalPrice = unitPrice * count;
      const totalPriceOld = unitPriceOld * count;

      priceAllNew.textContent = totalPrice.toLocaleString('ru-RU') + ' ₽';
      if (priceAllOld) {
        priceAllOld.textContent = totalPriceOld.toLocaleString('ru-RU') + ' ₽';
      }
    }

    minusBtn.addEventListener('click', function () {
      let value = validateInput();
      if (value > (isBasketItemCounter ? 1 : 0)) {
        input.value = value - 1;
        updateTotalPrice();
      }
    });

    plusBtn.addEventListener('click', function () {
      let value = validateInput();
      if (value < 999) {
        input.value = value + 1;
        updateTotalPrice();
      }
    });

    input.addEventListener('input', function () {
      this.value = this.value.replace(/[^0-9]/g, '');
      if (this.value.length > 3) {
        this.value = this.value.slice(0, 3);
      }
    });

    input.addEventListener('change', function () {
      validateInput();
      updateTotalPrice();
    });

    input.addEventListener('blur', function () {
      validateInput();
      updateTotalPrice();
    });

    // Инициализация при загрузке
    validateInput();
    updateTotalPrice();
  });
}