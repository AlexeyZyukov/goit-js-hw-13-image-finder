'use strict';

//====формирует разметку карточки=====
export function markupImages(images) {
  // console.log(images);
  return images
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads, pageURL }) => {
      return `<div class="photo-card">
  <img src=${webformatURL} alt=${tags} data-source=${largeImageURL} class="photo-card_img"/>

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
    <a href="${pageURL}" class="stats-item home-page-link" target="blank">
    <i class="material-icons">home</i>
      home page
      </a>
  </div>
  
</div>`;
    })
    .join('');
}
