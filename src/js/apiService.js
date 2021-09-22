'use strict'

import { fetchImagesBtn, searchForm, inputField, imagesList, alertPopup } from './constants';
import { markupImages } from './markupImages';
import { fetchImages } from './fetch';



console.log(inputField.value)
console.log(imagesList);

let isAlertVisible = false;

let page = 1; // Controls the group number
let limit = 12; // Controls the quantity of items in the group to display
let nameOfImage = ""; //select name of the image
export { nameOfImage, page, limit };


fetchImagesBtn.addEventListener("click", () => {
  if (!inputField.value) {
    alert('Введите название изображения')
    return
  }
  else {
    nameOfImage = inputField.value;
    console.log(nameOfImage)
  }

  fetchImages()
    .then((images) => {
      const totalPages = Math.ceil(images.total / limit); //get quantity of pages in the images'collection
      console.log(totalPages);
      console.dir(images.hits); //при обращении к значению объекта hits => Array, св-во length сохраняется
      renderImages(images.hits); //получние доступа к Массиву изображений в Объекте Json

      buttonTextAmendOnPageIncrease(totalPages)
    })
    .catch((error) => console.log(error));
});
//=================================
//update text of button when page number inreased
function buttonTextAmendOnPageIncrease(value) {
  page += 1;
  console.log(page);

  // Replace button text after first request
  if (page > 1) {
    fetchImagesBtn.textContent = "Показать больше изображений";
  }
  // Check the end of the collection to display an alert
  if (page > value) {
    return toggleAlertPopup();
  }
}
//=========================
function renderImages(value) {
  const markup = markupImages(value)
  imagesList.insertAdjacentHTML("beforeend", markup);
};

function toggleAlertPopup() {
  if (isAlertVisible) {
    return;
  }
  isAlertVisible = true;
  alertPopup.classList.add("is-visible");
  setTimeout(() => {
    alertPopup.classList.remove("is-visible");
    isAlertVisible = false;
  }, 4000);
};

function clearContent() {
  // input.value = "";
  result.innerHTML = "";
  countryList.innerHTML = '';
};


//=================================================================
// function markupImages(images) { //формирует разметку карточки
//     // console.log(images);
//   if (images.isArray) {
//    return images.map(({ likes, views, comments, downloads, id }) => {
//     return `<div class="photo-card">
//   <img src=${webformatURL} alt=${tags} />

//   <div class="stats">
//     <p class="stats-item">
//       <i class="material-icons">thumb_up</i>
//       ${likes}
//     </p>
//     <p class="stats-item">
//       <i class="material-icons">visibility</i>
//       ${views}
//     </p>
//     <p class="stats-item">
//       <i class="material-icons">comment</i>
//       ${comments}
//     </p>
//     <p class="stats-item">
//       <i class="material-icons">image_id</i>
//       ${id}
//     </p>
//     <p class="stats-item">
//       <i class="material-icons">cloud_download</i>
//       ${downloads}
//     </p>
//   </div>
// </div>`;
//     })
//     .join("");
//   }
//   // return "input of .map() is not array";
// };
