'use strict'
const buttonScrollToTop = document.querySelector(".scroll_to_top")

window.addEventListener('scroll', function scrollToTop() {
    if (window.pageYOffset > document.documentElement.clientHeight / 2) {
        buttonScrollToTop.classList.add("is-visible")
    }
    else { buttonScrollToTop.classList.remove("is-visible") }
});

buttonScrollToTop.addEventListener('click', function () {
    window.scrollTo(0, 0);
});

// export { scroll };