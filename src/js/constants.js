'use strict'

const fetchImagesBtn = document.querySelector(".btn");
const searchForm = document.querySelector("#search-form")
const inputField = document.querySelector('[name="query"]')
const imagesList = document.querySelector(".gallery");
const alertPopup = document.querySelector(".alert");
//let nameOfImage = "";
let isAlertVisible = false;
// Controls the group number
// let page = 1;
// // Controls the number of items in the group
// let limit = 12;

export { fetchImagesBtn, searchForm, inputField, imagesList, alertPopup, isAlertVisible };