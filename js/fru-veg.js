const header = document.querySelector('.header-container');
const hero = document.querySelector('.hero-container');
const h2 = document.querySelector('.hero-h2');

function isH2Visible() {
  return window.getComputedStyle(h2).display !== 'none';
}

window.addEventListener('scroll', () => {
  let active = false;

  if (isH2Visible()) {
    const h2Top = h2.getBoundingClientRect().top;
    if (h2Top <= header.offsetHeight) {
      active = true;
    }

  } else {
    const heroBottom = hero.getBoundingClientRect().bottom;
    if (heroBottom <= header.offsetHeight) {
      active = true;
    }
  }

  if (active) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
});


const menuItems = document.querySelectorAll('.header-li');

menuItems.forEach(li => {
  const submenu = li.querySelector('.header-ul-menu');
  if (!submenu) return;

  let timeout;

  const openMenu = () => {
    clearTimeout(timeout);
    submenu.classList.add('open');
  };

  const closeMenu = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      submenu.classList.remove('open');
    }, 200);
  };

  li.addEventListener('mouseenter', openMenu);
  li.addEventListener('mouseleave', closeMenu);

  submenu.addEventListener('mouseenter', openMenu);
  submenu.addEventListener('mouseleave', closeMenu);
});

const modalBtn = document.querySelector('.header-btn');
const modal = document.querySelector('.modal-contact');
const closeModalBtn = document.querySelector('.modal-btn');

modalBtn.addEventListener('click', () => {
  modal.classList.add('visible');
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
});
closeModalBtn.addEventListener('click', () => {
  modal.classList.remove('visible');
  document.body.style.overflow = 'auto';
  document.documentElement.style.overflow = 'auto';
});

const menuBtn = document.querySelector('.header-openburger');
const menu = document.querySelector('.menu-container');
const menuCloseBtn = document.querySelector('.menu-btn');

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('active');
});

menuCloseBtn.addEventListener('click', () => {
  menu.classList.remove('active');
});

const bigImg = document.querySelector('.main-big-img');
const smallImgs = document.querySelectorAll('.main-img');

smallImgs.forEach(smallImg => {
    smallImg.addEventListener('click', () => {
        bigImg.classList.add('fade-out');
        smallImg.classList.add('fade-out');

        bigImg.offsetWidth;

        setTimeout(() => {
            const tempSrc = smallImg.src;
            smallImg.src = bigImg.src;
            bigImg.src = tempSrc;
            bigImg.classList.remove('fade-out');
            smallImg.classList.remove('fade-out');
        }, 400);
    });
});