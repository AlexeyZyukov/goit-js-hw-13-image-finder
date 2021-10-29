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
      <li class="material-icons">thumb_up</li>
      likes: ${likes}
    </p>
    <p class="stats-item">
      <li class="material-icons">visibility</li>
      views: ${views}
    </p>
    <p class="stats-item">
      <li class="material-icons">comment</li>
      comments: ${comments}
    </p>
    <p class="stats-item">
      <li class="material-icons">cloud_download</li>
      downloads: ${downloads}
    </p class="stats-item">
    <a href="${pageURL}" class="stats-item home-page-link" target="blank">
    <li class="material-icons">home</li>
      home page
      </a>
  </div>
  
</div>`;
    })
    .join('');
}
