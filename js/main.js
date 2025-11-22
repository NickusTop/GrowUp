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
