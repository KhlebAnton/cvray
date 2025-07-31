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


  // Элементы модальных окон
  const modals = {
    basket: document.getElementById('basketMenu'),
    quickOrder: document.getElementById('quickOrderMenu'),
    likeOrder: document.getElementById('likeOrderMenu'),
    catalog: document.getElementById('catalogMenu'),
    search: document.getElementById('searchMenu'),
    form: document.getElementById('modalForm'),
    menu: document.getElementById('mobileMenu')
  };

  // Закрытие модалок при клике на крестик или оверлей
  document.querySelectorAll('.modal-overlay, .modal-content__close').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
      if (e.target === closeBtn || closeBtn.classList.contains('modal-content__close')) {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
          modal.classList.remove('is-open');
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
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
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
    btn.addEventListener('click', () => openModal(modals.likeOrder));
  });
  // Обработчики для кнопок похожего заказа (data-btn="quickBuy")
  document.querySelectorAll('[data-btn="quickBuy"]').forEach(btn => {
    btn.addEventListener('click', () => openModal(modals.quickOrder));
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
      btn.querySelector('span').textContent = 'Добавлен';
    })

  });

  //  data-btn="likeProduct"
  document.querySelectorAll('[data-btn="likeProduct"]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('liked');
     
    })

  });
});