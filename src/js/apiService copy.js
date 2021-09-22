'use strict'

import { fetchImagesBtn, searchForm, inputField, imagesList, alertPopup } from './constants';
import { fetchImages } from './fetch';



console.log(inputField.value)
console.log(imagesList);

let isAlertVisible = false;
// Controls the group number
let page = 1;
// Controls the number of items in the group
let limit = 12;
//select name of the image
let nameOfImage = "";



fetchImagesBtn.addEventListener("click", () => {
  //clearContent();

  // Check the end of the collection to display an alert
  // if (page > totalPages) {
  //   return toggleAlertPopup();
  // }
  if (!inputField.value) {
    alert('Введите название изображения')
    return
  }
  else {
    nameOfImage = inputField.value;
    console.log(nameOfImage)
    // localStorage.setItem('pictureName', inputField.value);
    // nameOfImage = localStorage.getItem('pictureName');
    // console.log(localStorage);
  }

  fetchImages()
    .then((images) => {
      const totalPages = Math.ceil(images.total / limit); //get quantity of pages in the images'collection
      console.log(totalPages);
      console.dir(images.hits); //при обращении к значению объекта hits => Array, св-во length сохраняется
      renderImages(images.hits); //получние доступа к Массиву изображений в Объекте Json

      buttonTextAmendOnPageInctease()

      // Increase the group number
      // page += 1;
      // console.log(page);

      // Replace button text after first request
      // if (page > 1) {
      //   fetchImagesBtn.textContent = "Показать больше изображений";
      // }
      // if (page > totalPages) {
      //   return toggleAlertPopup();
      // }
    })
    .catch((error) => console.log(error));
});
//=================================
//update text of button when page inrease
function buttonTextAmendOnPageInctease() {
  page += 1;
  console.log(page);

  // Replace button text after first request
  if (page > 1) {
    fetchImagesBtn.textContent = "Показать больше изображений";
  }
  if (page > totalPages) {
    return toggleAlertPopup();
  }
}
//===============================================
// fetchImages()
//   .then((images) => {
//     const totalPages = Math.ceil(images.total / limit);
//     console.log(totalPages);
//     console.dir(images.hits); //при обращении к значению объекта hits => Array, св-во length сохраняется
//     renderImages(images.hits);

//     // Increase the group number
//     page += 1;
//     console.log(page);

//     // Replace button text after first request
//     if (page > 1) {
//       fetchImagesBtn.textContent = "Показать больше изображений";
//     }
//     if (page > totalPages) {
//       return toggleAlertPopup();
//     }
//   })
//   .catch((error) => console.log(error));
//=========================
// function fetchImages() {
//   const params = new URLSearchParams({
//     "q": nameOfImage,
//     "page": page,
//     "per_page": limit,
//     "image_type": "photo",
//   });

//   //https://pixabay.com/api/?key=22969480-c3583c2b4b1ca4646f49ed52f${params}
//   return fetch(`https://pixabay.com/api/?key=22969480-c3583c2b4b1ca4646f49ed52f&${params}`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       //console.log(response);
//       // return Array.from(response.json()); //при преобразовании возвращаемого Json-объекта с пом. Array.from в массив "теряется" св-во length, length = 0;
//       return response.json();
//     }
//     );
// }

function markupImages(images) { //формирует разметку карточки
  // console.log(images);
  return images.map(({ webformatURL, tags, likes, views, comments, downloads }) => {
    return `<div class="photo-card">
  <img src=${webformatURL} alt=${tags} />

  <div class="stats">
    <p class="stats-item">
      <i class="material-icons">thumb_up</i>
      ${likes}
    </p>
    <p class="stats-item">
      <i class="material-icons">visibility</i>
      ${views}
    </p>
    <p class="stats-item">
      <i class="material-icons">comment</i>
      ${comments}
    </p>
    <p class="stats-item">
      <i class="material-icons">cloud_download</i>
      ${downloads}
    </p>
  </div>
</div>`;
  })
    .join("");
};

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

// function markupImages(images) { //формирует разметку карточки
//     console.log(images);
//   return images.map(({ likes, views, comments, downloads, id }) => {
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
// }
// function renderImages(images) {
//   const markup = markupImages(images)
//   imagesList.insertAdjacentHTML("beforeend", markup);
// }