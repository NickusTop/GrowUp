const header = document.querySelector(".header-container");
const trigger = document.querySelector(".hero-h2");

function checkHeader() {
  const triggerTop = trigger.getBoundingClientRect().top;
  if (triggerTop <= header.offsetHeight) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

window.addEventListener("scroll", checkHeader);
window.addEventListener("load", checkHeader);

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
    const isInsideSubmenu = e.target.closest(".header-ul-menu");

    if (isInsideSubmenu) {
        return; 
    }
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

  contactBtn.classList.add('hover');

  setTimeout(() => {
    contactBtn.classList.remove('hover');
  }, 200);
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

window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(el => {
      el.classList.add('visible');
    });
  });




