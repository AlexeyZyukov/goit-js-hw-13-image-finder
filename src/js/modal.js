'use strict'
import { galleryImagesList, lightbox, lightboxImage, lightboxClose } from './constants';

// galleryImagesList.addEventListener('click', openModal);

export function openModal(event) {
    if (event.target.nodeName !== "IMG") {
        return;
    }
    event.preventDefault()
    lightbox.classList.add('is-open')
    lightboxImage.src = `${event.target.dataset.source}`; //получено из разметки функции createGalleryItem
    console.dir(event.target)
    lightboxImage.alt = event.target.alt; //получено из разметки функции createGalleryItem
};


//====== close modal window =========
// lightboxClose.addEventListener('click', overlayWindowClose);

//закрытие модального окна по кнопке
function overlayWindowClose() {
    lightbox.classList.remove('is-open');
    lightboxImage.src = '#';
    lightboxImage.alt = '';
};

//закрытие модального окна по клику мыши
lightbox.addEventListener('click', overlayWindowsCloseByMouse);
function overlayWindowsCloseByMouse(event) {
    let result = new MouseEvent('event', {
    });
    overlayWindowClose()
};

//закрытие модального окна по escape / esc
document.addEventListener('keydown', overlayWindowCloseByEsc)
function overlayWindowCloseByEsc(event) {
    if (event.key === 'Escape')
        //console.log(event.key); 
        overlayWindowClose()
};