'use strict'

import { fetchImagesBtnAdditional, searchForm, inputField, galleryImagesList, alertPopup } from './constants';
import { markupImages } from './markupImages';
import { fetchImages } from './fetch';
import { openModal } from './modal';


let isAlertVisible = false; // управляет "видимостью" кнопки догрузки изображений
let page = 1; // Controls the group number
let limit = 12; // Controls the quantity of items in the group to display
let nameOfImage = ""; //select name of the image
export { nameOfImage, page, limit };

galleryImagesList.addEventListener('click', openModal);

searchForm.addEventListener("submit", (event) => {
  event.preventDefault()
  if (!inputField.value) {
    alert('Введите название изображения')
    return
  }

  if (nameOfImage === inputField.value) {
    // console.log(inputField.value); 
    // console.log(nameOfImage);
    alert("Поиск изображения с таким названием был выполнен, введите другое название")
    return
  }

  //выполненеие поиска нового типа изображения
  if (nameOfImage !== inputField.value) {
    nameOfImage = inputField.value;
    // console.log(nameOfImage);
    clearContent();
    page = 1;
    // console.log(nameOfImage);
  }

  else {
    nameOfImage = inputField.value;
    // console.log(nameOfImage)
  }

  fetchImages()
    .then((images) => {

      console.dir(images.hits); //при обращении к значению объекта hits => Array, св-во length сохраняется
      if (images.hits.length === 0) {
        alert('Изображения с таким названием нет, уточните запрос')
        return
      }
      renderImages(images.hits); //получние доступа к Массиву изображений в Объекте Json

      buttonShowOnPageIncrease()
    })
    .catch((error) => console.log(error));


});

//===========добавление новых изображений вниз страницы при клике на кнопке "добавить"===============
fetchImagesBtnAdditional.addEventListener('click', (event) => {
  event.preventDefault;
  fetchImages()
    .then((images) => {
      const totalPages = Math.ceil(images.total / limit); //get quantity of pages in the images'collection
      // console.log(totalPages);
      // console.dir(images.hits); //при обращении к значению объекта hits => Array, св-во length сохраняется

      renderImages(images.hits); //получение доступа к Массиву изображений в Объекте Json;
      //при обращении к значению объекта hits => через Array, св - во length сохраняется
      // let arrayOfImages = images.hits; //проверка полученного массива данных
      // console.dir(arrayOfImages);

      //====прокрутка экрана при загрузке новых изображений при клике на кнопке "добавить"====
      setTimeout(() => {
        galleryImagesList.scrollIntoView({
          behavior: "smooth",
          block: "end"
        });
      }, 500);
      // setTimeout(() => {
      //   let pageHeight = document.body.scrollHeight;
      //   window.scrollTo(0, pageHeight);
      // }, 500);
      // console.log(pageHeight);

      buttonShowOnPageIncrease(totalPages);

      //==получение id изображения==
      // const targetImageId = images.hits[0].id //arrayOfImages[0].id;
      // console.log(targetImageId);
      // const targetImage = images.hits[0]
      // console.dir(targetImage);
      // let coordsTargetImage = targetImage.getBoundingClientRect();
      // console.dir(coordsTargetImage);

      // document.addEventListener('DOMContentLoaded', function () {

      //   let elem = document.getElementById('coords-show-mark');

      //   if (elem) {
      //     elem.onclick = function () {

      //       function createMessageUnder(elem, text) {
      //         let coords = elem.getBoundingClientRect();
      //         let message = document.createElement('div');
      //         message.style.cssText = "position:fixed; color: red";

      //         message.style.left = coords.left + "px";
      //         message.style.top = coords.bottom + "px";

      //         message.innerHTML = text;

      //         return message;
      //       }

      //       let message = createMessageUnder(elem, 'Hello, world!');
      //       document.body.append(message);
      //       setTimeout(() => message.remove(), 5000);
      //     }
      //   }

      // });
    })
    .catch((error) => console.log(error));
});
//=================================================

//Show add_button when page number inreased
function buttonShowOnPageIncrease(value) {

  // Check the end of the collection to display an alert
  if (page > value) {
    fetchImagesBtnAdditional.classList.remove("is-visible");
    return toggleAlertPopupEndOfItems();
  }
  // Show button to load more after first request
  page += 1;
  console.log(page);

  if (page > 1) { //&& images.hits.length > 0
    fetchImagesBtnAdditional.classList.add("is-visible");
  }
}
//=========================
function renderImages(value) {
  const markup = markupImages(value)
  galleryImagesList.insertAdjacentHTML("beforeend", markup);
};

function clearContent() {
  galleryImagesList.innerHTML = '';
};

function toggleAlertPopupEndOfItems() {
  if (isAlertVisible) {
    return;
  }
  isAlertVisible = true;
  alertPopup.classList.add("is-visible");
  setTimeout(() => {
    alertPopup.classList.remove("is-visible");
    isAlertVisible = false;
  }, 2000);
};
