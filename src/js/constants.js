'use strict'

// const fetchImagesBtnInitial = document.querySelector(".fetch-initial");
const fetchImagesBtnAdditional = document.querySelector(".fetch-additional");
const searchForm = document.querySelector("#search-form")
const inputField = document.querySelector('[name="query"]')
const galleryImagesList = document.querySelector(".gallery");
const alertPopup = document.querySelector(".alert");
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
const lightboxClose = document.querySelector('button[data-action="close-lightbox"]');



export { fetchImagesBtnAdditional, searchForm, inputField, galleryImagesList, lightbox, lightboxImage, lightboxClose, alertPopup };