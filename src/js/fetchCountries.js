'use strict'
import { error } from '@pnotify/core';
const debounce = require('lodash.debounce');

const input = document.querySelector('#text-input');
const result = document.querySelector('.input-message');
const countryList = document.querySelector('.country-container');


input.addEventListener('input', debounce(onInputSearch, 1000));

function onInputSearch() {
     const countryName = input.value;
     console.log(countryName);
     
     fetchCountryByName(countryName)
          .then(onSuccessFetchCountryMarkup)
               console.log(fetchCountryByName(countryName));     
};

function fetchCountryByName(name) {
     return fetch(`https://restcountries.eu/rest/v2/name/${name}`)
          .then(response => {
               console.log(response)
               // console.log(response.json()) // в промисе после console.log(response.json()) передать данные дальше нельзя.
               return response.json()
          })
};
//console.log(fetchCountryByName()); //вернет Promise (pending) как синхронная функция сообщнеие "Not found"

function onSuccessFetchCountryMarkup(country) { 
          console.log(country.length); //country - массив стран, имеет св-во length
          console.log(country.status); // show "response.status"
     
     if (country.status === 404) {
          error({
               text: 'Проверьте правильность ввода названия страны',
               styling: 'brighttheme',
               delay: 2000,
          })
          // alert('Проверьте правильность ввода названия страны');
          clearContent()
     }

     if (country.length === 1) {
          clearContent()
          const singleMarkup = createSingleCountryCard(country);
          countryList.innerHTML = singleMarkup;
     }
     if (country.length >= 2 && country.length <= 10) {
          clearContent();
          const markup = createCountryList(country);
          countryList.insertAdjacentHTML('beforeend', markup);
     }
     if (country.length > 10) {
          clearContent();
          error({
               text: 'Слишком много совпадений. Уточните название страны',
               styling: 'brighttheme',
               delay: 2000,
          });
          // const message = `Слишком много совпадений. Уточните название страны`;
          // result.innerHTML = message;
     }
};

function createCountryList(obj) { //разметка 1 строки с именем страны
     return obj.map(countryName => {
          return `<li class="country_name"><span><b>Country: </b></span>${countryName.name}</li>`
     }).join('');
};

function createSingleCountryCard(obj) { //разметка 1 карточки с данными страны
     return obj.map(countryName => {
          return `<h2 class="country__title-name">${countryName.name}</h2>
          <div class="country__box">
               <div class="country__content">
                    <p class="country__text">
                         <span>Capital:</span> ${countryName.capital}
                    </p>
                    <p class="country__text">
                         <span>Population:</span> ${countryName.population}
                    </p>
                    <p class="country__text">
                    <span>Languages:</span>
     
                    <ul class="country__languages-list">
                    ${countryName.languages.map(language => //перебор массива внутри массива
                         `<li>${language.name}</li>`
                    ).join("")}
                    </ul> 
                    </p>
               </div>
               <img src="${countryName.flag}" alt="${countryName.demonym}" class="country__img" >
          </div>`
     }).join('');
};

function clearContent() {
     // input.value = "";
     result.innerHTML = "";
     countryList.innerHTML = '';
};

