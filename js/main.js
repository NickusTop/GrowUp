const header = document.querySelector('.header-container');
const trigger = document.querySelector('.hero-h2');


window.addEventListener('scroll', () => {
  const triggerTop = trigger.getBoundingClientRect().top;

  if (triggerTop <= header.offsetHeight) { 
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
});

const menuItems = document.querySelectorAll('.header-li');

let currentOpenMenu = null;

menuItems.forEach(li => {
  const submenu = li.querySelector('.header-ul-menu');
  if (!submenu) return;

  let timeout;

  const openMenu = () => {
    if (currentOpenMenu && currentOpenMenu !== submenu) {
      currentOpenMenu.style.transition = 'none';
      currentOpenMenu.classList.remove('open');
      currentOpenMenu.offsetHeight;
      currentOpenMenu.style.transition = '';
    }

    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    submenu.classList.add('open');
    currentOpenMenu = submenu;
  };

  const closeMenu = () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      submenu.classList.remove('open');
      if (currentOpenMenu === submenu) currentOpenMenu = null;
      timeout = null;
    }, 200);
  };

  li.addEventListener('mouseenter', openMenu);
  li.addEventListener('mouseleave', closeMenu);

  submenu.addEventListener('mouseenter', openMenu);
  submenu.addEventListener('mouseleave', closeMenu);
});

const contactBtn = document.querySelector('.header-btn');
const footer = document.querySelector('.footer');

contactBtn.addEventListener('click', () => {
  footer.scrollIntoView({ behavior: 'smooth' });
});

const buttons = document.querySelectorAll('.header-btn');

buttons.forEach(btn => {
  btn.addEventListener('touchstart', () => {
    // добавляем класс hover на 1 секунду
    btn.classList.add('hover-touch');

    // через 1 секунду убираем
    setTimeout(() => {
      btn.classList.remove('hover-touch');
    }, 1000);
  });
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
