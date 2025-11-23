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

menuItems.forEach(li => {
  const submenu = li.querySelector('.header-ul-menu'); // подменю конкретного li
  if (!submenu) return; // если подменю нет, пропускаем

  let timeout = null;

  const openMenu = () => {
    clearTimeout(timeout);
    submenu.classList.add('open');
  };

  const closeMenu = () => {
    timeout = setTimeout(() => {
      submenu.classList.remove('open');
    }, 200);
  };

  li.addEventListener('mouseenter', openMenu);
  li.addEventListener('mouseleave', closeMenu);

  submenu.addEventListener('mouseenter', openMenu);
  submenu.addEventListener('mouseleave', closeMenu);
});

