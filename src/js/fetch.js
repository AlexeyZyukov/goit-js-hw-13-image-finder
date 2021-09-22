'use strict'
import { nameOfImage, page, limit } from './apiService';

export function fetchImages() { //get information from backend
  const params = new URLSearchParams({
    "q": nameOfImage,
    "page": page,
    "per_page": limit,
    "image_type": "photo",
  });

  return fetch(`https://pixabay.com/api/?key=22969480-c3583c2b4b1ca4646f49ed52f&${params}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      //console.log(response);
      // return Array.from(response.json()); //при преобразовании возвращаемого Json-объекта с пом. Array.from в массив "теряется" св-во length, length = 0;
      return response.json();
    }
    );
}