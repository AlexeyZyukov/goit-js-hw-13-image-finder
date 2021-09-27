'use strict'

export function markupImages(images) { //формирует разметку карточки
  // console.log(images);
  return images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `<div class="photo-card">
  <a class="photo-card__link" href=${largeImageURL}>
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
  </a>
</div>`;
  })
    .join("");
};