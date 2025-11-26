const header = document.querySelector('.header-container');
const trigger = document.querySelector('.hero-h2');

function checkHeader() {
  const triggerTop = trigger.getBoundingClientRect().top;

  if (triggerTop <= header.offsetHeight) { 
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
}

window.addEventListener('scroll', checkHeader);

window.addEventListener('load', checkHeader);


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
      currentOpenMenu.offsetHeight; // reflow
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

window.addEventListener('scroll', () => {
  if (currentOpenMenu) {
    currentOpenMenu.classList.remove('open');
    currentOpenMenu = null;
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  }
});


const contactBtn = document.querySelector('.header-btn');
const footer = document.querySelector('.footer');

contactBtn.addEventListener('click', () => {
  footer.scrollIntoView({ behavior: 'smooth' });
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
