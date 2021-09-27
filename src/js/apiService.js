'use strict'

import { fetchImagesBtnInitial, fetchImagesBtnAdditional, searchForm, inputField, imagesList, lightbox, lightboxImage, lightboxClose, alertPopup } from './constants';
import { markupImages } from './markupImages';
import { fetchImages } from './fetch';



// console.log(inputField.value)
// console.log(imagesList);

let isAlertVisible = false;

let page = 1; // Controls the group number
let limit = 12; // Controls the quantity of items in the group to display
let nameOfImage = ""; //select name of the image
export { nameOfImage, page, limit };


fetchImagesBtnInitial.addEventListener("click", (event) => {
  event.preventDefault()
  if (!inputField.value) {
    alert('Введите название изображения')
    return
  }
  if (nameOfImage) {
    if (nameOfImage === inputField.value) {
      // console.log(inputField.value, nameOfImage); 
      // console.log(nameOfImage);
      alert("Такой тип изображений уже в поиске, введите другое название")
      return
    }
  }
  if (nameOfImage) {
    if (nameOfImage !== inputField.value) {
      // console.log(inputField.value, nameOfImage);
      nameOfImage = inputField.value;
      // console.log(nameOfImage);
      clearContent();
      // console.log(nameOfImage);
    }
  }
  else {
    nameOfImage = inputField.value;
    // console.log(nameOfImage)
  }

  fetchImages()
    .then((images) => {
      // const totalPages = Math.ceil(images.total / limit); //get quantity of pages in the images'collection
      // console.log(totalPages);
      // console.dir(images.hits); //при обращении к значению объекта hits => Array, св-во length сохраняется
      renderImages(images.hits); //получние доступа к Массиву изображений в Объекте Json

      buttonShowOnPageIncrease()

    })
    .catch((error) => console.log(error));
});
//=================================================
// inputField.addEventListener("keydown", (event) => { // сделать ввод через Enter


//   if (event.key === "Enter") {
//     event.preventDefault();
//     alert('Enter key pressed');

//     if (!inputField.value) {
//       alert('Введите название изображения')
//       return
//     }
//     if (nameOfImage) {
//       if (nameOfImage !== inputField.value) {
//         // console.log(inputField.value, nameOfImage);
//         nameOfImage = inputField.value;
//         // console.log(nameOfImage);
//         clearContent();
//         // console.log(nameOfImage);
//       }
//     }
//     else {
//       nameOfImage = inputField.value;
//       console.log(nameOfImage)
//     }
//   }
//   fetchImages()
//     .then((images) => {
//       const totalPages = Math.ceil(images.total / limit); //get quantity of pages in the images'collection
//       console.log(totalPages);
//       console.dir(images.hits); //при обращении к значению объекта hits => Array, св-во length сохраняется
//       renderImages(images.hits); //получние доступа к Массиву изображений в Объекте Json

//       buttonTextAmendOnPageIncrease(totalPages)
//     })
//     .catch((error) => console.log(error));
// })
//=================================
//Show add_button when page number inreased
function buttonShowOnPageIncrease(value) {
  page += 1;
  console.log(page);

  // Show button with text after first request
  if (page > 1) {
    fetchImagesBtnAdditional.classList.add("is-visible");
    //fetchImagesBtnAdditional.textContent = "Показать больше изображений";
  }
  // Check the end of the collection to display an alert
  if (page > value) {
    return toggleAlertPopup();
  }
}
//==========================
fetchImagesBtnAdditional.addEventListener('click', (event) => {
  event.preventDefault;
  fetchImages()
    .then((images) => {
      const totalPages = Math.ceil(images.total / limit); //get quantity of pages in the images'collection
      // console.log(totalPages);
      // console.dir(images.hits); //при обращении к значению объекта hits => Array, св-во length сохраняется
      renderImages(images.hits); //получние доступа к Массиву изображений в Объекте Json

      buttonShowOnPageIncrease(totalPages)
    })
    .catch((error) => console.log(error));
});
//=========================
function renderImages(value) {
  const markup = markupImages(value)
  imagesList.insertAdjacentHTML("beforeend", markup);
};

function clearContent() {
  imagesList.innerHTML = '';
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
