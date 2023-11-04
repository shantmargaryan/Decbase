const header = document.querySelector(".header");
const nav = document.querySelector(".header__nav");
const headerLinks = document.querySelectorAll(".header__link");
const burger = document.querySelector(".burger");


burger.addEventListener("click", function () {
    burger.classList.toggle("burger_active");
    nav.classList.toggle("header__nav_active");
    if (burger.classList.contains("burger_active")) {
        header.classList.add("header_active")
        nav.style.paddingTop = header.offsetHeight + "px";
        disableScroll();
    } else {
        nav.style.paddingTop = "";
        setTimeout(() => {
        }, 300);
        header.classList.remove("header_active");
        enableScroll();
    }
    for (let i = 0; i < headerLinks.length; i++) {
        const element = headerLinks[i];
        element.addEventListener("click", function () {
            nav.classList.remove("header__nav_active");
            burger.classList.remove("burger_active");
            header.classList.remove("header_active");
        })
    }
});

const disableScroll = () => {
    const fixBlocks = document?.querySelectorAll('.fixed-block');
    const pagePosition = window.scrollY;
    const paddingOffset = `${(window.innerWidth - document.body.offsetWidth)
        }px`;

    document.documentElement.style.scrollBehavior = 'none';
    fixBlocks.forEach(el => { el.style.paddingRight = paddingOffset; });
    document.body.style.paddingRight = paddingOffset;
    document.body.classList.add('dis-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = `-${pagePosition} px`;
}

const enableScroll = () => {
    const fixBlocks = document?.querySelectorAll('.fixed-block');
    const pagePosition = parseInt(document.body.dataset.position, 10);
    fixBlocks.forEach(el => { el.style.paddingRight = '0px'; });
    document.body.style.paddingRight = '0px';

    document.body.style.top = 'auto';
    document.body.classList.remove('dis-scroll');
    window.scroll({
        top: pagePosition,
        left: 0
    });
    document.body.removeAttribute('data-position');
    // document.documentElement.style.scrollBehavior = 'smooth';
}

const mediaQueryMinWidth_992 = window.matchMedia('(min-width: 992px)');
mediaQueryMinWidth_992.addEventListener("change", (e) => {
    if (e.matches) {
        header.classList.remove("header_active")
        nav.style.paddingTop = "";
        return true;
    }
    else {
        header.classList.add("header_active")
        nav.style.paddingTop = header.offsetHeight + "px";
    }
    return false;
});