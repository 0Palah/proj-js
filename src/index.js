import { DeveloperApi } from './js/DeveloperApi';
import Notiflix from 'notiflix';

import { createGalleryPosters } from './js/createGalleryPosters';

// import galleryCard from './templates/gallery-card.hbs';
import { getPagination } from './js/tui-pagination';

const searchCountryEl = document.querySelector('#country');
console.log(searchCountryEl);
const searchingStrEl = document.querySelector('#searching');
console.log(searchingStrEl);
const btnSubmitEl = document.querySelector('.header__form-submit');
console.log(btnSubmitEl);
const headerFormEl = document.querySelector('.header__form');
console.dir(headerFormEl);
const btnDevelopersEl = document.querySelector('.btn-developers');
console.log(btnDevelopersEl);
const galleryList = document.querySelector('.main-list');
console.log(galleryList);

// Створюємо екземплям класу
const developerApi = new DeveloperApi();

// болванка на позицію ГуглКарта

// function initialize(latitude, longitude) {

// function initialize() {
// const myLatlng = new google.maps.LatLng(latitude, longitude);

// const myLatlng = new google.maps.LatLng;
// console.dir(myLatlng);

// const myOptions = {
// 	zoom: 8,
// 	center: myLatlng,
// 	mapTypeId: google.maps.MapTypeId.ROADMAP
// }
// const map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
// }

// initialize();

// запит по id події
const onEventCardClick = async event => {
  event.preventDefault();
  // попали в список  - ВИЙШЛИ
  if (event.target.nodeName === 'UL') {
    return;
  }
  // попали в посилання (локація)  - ВИЙШЛИ (замінити на функцію від гугл)
  if (event.target.nodeName === 'A') {
    return;
  }
  // Отримуємо ID івенту
  console.log(event.target);
  console.dir(event.target.dataset.id);
  // записуємо searchQuery в екземпляр
  developerApi.id = event.target.dataset.id;
  console.log(developerApi.id);

  // скидаємо лічильник в екземплярі при новому запиті (сабміті)
  developerApi.page = 0;

  try {
    const { data } = await developerApi.fetchDataByZId();
    console.log(data);

    if (data.page.totalElements === 0) {
      //   galleryListEl.innerHTML = '';
      Notiflix.Notify.failure(
        'Sorry, there are no events matching your search query. Please try again.'
      );
      return;
    }

    // відмальовую картки через хенделбарс в  модалку (написати)
    // galleryListEl.innerHTML = galleryCard(data.hits);

    Notiflix.Notify.success(
      `Hooray! We found ${data.page.totalElements} events.`
    );
  } catch (err) {
    console.log(err);
  }
};

galleryList.addEventListener('click', onEventCardClick);

// Викликаємо при сабміті, прослуховуємо Форму
const onInputElSubmit = async event => {
  event.preventDefault();
  console.clear();

  // записуємо searchQuery в екземпляр
  developerApi.countryQuery = event.target.elements.country.value;
  console.log(developerApi.countryQuery);
  developerApi.searchQuery = event.target.elements.searching.value;
  console.log(developerApi.searchQuery);

  // скидаємо лічильник в екземплярі при новому запиті (сабміті)
  developerApi.page = 0;
  developerApi.per_page = 16;
  galleryList.innerHTML = '';

  try {
    const { data } = await developerApi.fetchDataByQuery();
    console.log(data);

    const {
      data: {
        page: { totalElements },
        _embedded: { events },
      },
    } = await developerApi.fetchDataByQuery();

    if (totalElements === 0) {
      galleryList.innerHTML = '';
      Notiflix.Notify.failure(
        'Sorry, there are no events matching your search query. Please try again.'
      );
      return;
    }

    // відмальовую картки через хенделбарс
    // galleryListEl.innerHTML = galleryCard(data.hits);

    Notiflix.Notify.success(`Hooray! We found ${totalElements} events.`);

    let galleryListPosters = '';

    for (const poster of events) {
      galleryListPosters += createGalleryPosters(poster);
    }

    // console.log(galleryListPosters);

    // відмальовую картки через хенделбарс
    galleryList.innerHTML = galleryListPosters;

    // викликаємо пагінацію
    // показуємо блок пагінації
    // paginationButton.addEventListener('click', getPostersbyPages);
    // відправляємо запит посторінково
    getPagination(data).on('beforeMove', async e => {
      const currentPage = e.page;
      developerApi.page = currentPage - 1;
      const { data } = await developerApi.fetchDataByQuery();
      console.log(data);
      const {
        data: {
          page: { totalElements },
          _embedded: { events },
        },
      } = await developerApi.fetchDataByQuery();
      galleryListPosters = '';
      for (const poster of events) {
        galleryListPosters += createGalleryPosters(poster);
      }
      galleryList.innerHTML = galleryListPosters;
      console.log('developerApi.page', developerApi.page);
      console.log('currentPage', currentPage);
    });
  } catch (err) {
    console.log(err);
  }
};

headerFormEl.addEventListener('submit', onInputElSubmit);
