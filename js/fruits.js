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


const menuItems = document.querySelectorAll(".header-li");
let currentOpenMenu = null;
let closeTimeout = null;

let autoCloseTimer = null; 

function closeMenu() {
    if (currentOpenMenu) {
        currentOpenMenu.classList.remove("open");
        const svg = currentOpenMenu.parentElement.querySelector(".nav-svg");
        if (svg) svg.style.transform = "";
        currentOpenMenu = null;
    }
    if (closeTimeout) {
        clearTimeout(closeTimeout);
        closeTimeout = null;
    }
    if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
        autoCloseTimer = null;
    }
}

function openMenu(submenu) {
    if (closeTimeout) {
        clearTimeout(closeTimeout);
        closeTimeout = null;
    }
    if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
        autoCloseTimer = null;
    }

    if (currentOpenMenu && currentOpenMenu !== submenu) {
        closeMenu();
    }
    
    submenu.classList.add("open");
    const svg = submenu.parentElement.querySelector(".nav-svg");
    if (svg) svg.style.transform = "rotate(180deg)";
    currentOpenMenu = submenu;

    const isTouchNow = window.matchMedia("(hover: none)").matches;
    if (isTouchNow) {
        autoCloseTimer = setTimeout(() => {
            closeMenu();
        }, 3500);
    }
}

window.addEventListener("click", (e) => {
    if (!e.target.closest(".header-li")) {
        closeMenu();
    }
});
window.addEventListener("scroll", closeMenu);


function initMenuHandlers(isTouchMode) {
    menuItems.forEach((li) => {
        const submenu = li.querySelector(".header-ul-menu");
        if (!submenu) return;
        li.removeEventListener("mouseenter", handleMouseEnter);
        li.removeEventListener("mouseleave", handleMouseLeave);
        li.removeEventListener("click", handleClick);
        submenu.removeEventListener("mouseenter", handleMouseEnter);
        submenu.removeEventListener("mouseleave", handleMouseLeave);

        if (isTouchMode) {
            li.addEventListener("click", handleClick);
        } else {
            li.addEventListener("mouseenter", handleMouseEnter);
            li.addEventListener("mouseleave", handleMouseLeave);
            submenu.addEventListener("mouseenter", handleMouseEnter);
            submenu.addEventListener("mouseleave", handleMouseLeave);
        }
    });
}

function handleMouseEnter(e) {
    if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
        autoCloseTimer = null;
    }
    const submenu = e.currentTarget.querySelector(".header-ul-menu") || e.currentTarget;
    openMenu(submenu);
}

function handleMouseLeave(e) {
    closeTimeout = setTimeout(closeMenu, 180);
}

function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const submenu = e.currentTarget.querySelector(".header-ul-menu");
    if (submenu) {
        if (submenu.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu(submenu);
        }
    }
}



const touchModeQuery = window.matchMedia("(hover: none)");

function handleModeChange(e) {
    initMenuHandlers(e.matches);
    closeMenu();
}

if (touchModeQuery.addListener) {
    touchModeQuery.addListener(handleModeChange);
} else {
    touchModeQuery.addEventListener('change', handleModeChange);
}
handleModeChange(touchModeQuery);

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

const main = document.querySelector('.main-section');

function resizeSections() {
    const windowHeight = window.innerHeight;
    hero.style.minHeight = (windowHeight * 0.5) + 'px';
    main.style.minHeight = (windowHeight * 0.5) + 'px';
}

window.addEventListener('resize', resizeSections);
window.addEventListener('load', resizeSections);

window.addEventListener("load", () => {
    document.getElementById("preloader").classList.add("hide");
  });
