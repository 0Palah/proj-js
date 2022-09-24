import { DeveloperApi } from './js/DeveloperApi';
import Notiflix from 'notiflix';

import { createGalleryPosters } from './js/createGalleryPosters';
import { createModalByID } from './js/createModalByID';

// import galleryCard from './templates/gallery-card.hbs';
import { getPagination } from './js/tui-pagination';

// const searchCountryEl = document.querySelector('#country');
// console.log(searchCountryEl);
// const searchingStrEl = document.querySelector('#searching');
// console.log(searchingStrEl);
// const btnSubmitEl = document.querySelector('.header__form-submit');
// console.log(btnSubmitEl);
const headerFormEl = document.querySelector('.header__form');
console.dir(headerFormEl);
const btnDevelopersEl = document.querySelector('.btn-developers');
console.log(btnDevelopersEl);
const galleryList = document.querySelector('.main-list');
console.log(galleryList);
// const modalEL = document.querySelector('.modal');
//console.log(modalEL);
//
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
    const responseByQuery = await developerApi.fetchDataByQuery();
    const { data } = responseByQuery;
    console.log(data);
    getPagination(data).reset(-16);
    headerFormEl.reset();

    // const { data: { page: { totalElements }, _embedded: { events } } } = await developerApi.fetchDataByQuery();
    const {
      data: {
        page: { totalElements },
      },
    } = responseByQuery;

    let arrayPosters = null;

    if (totalElements === 0) {
      galleryList.innerHTML = '';
      Notiflix.Notify.failure(
        'Sorry, there are no events matching your search query. Please try again.'
      );

      return;
    } else {
      const {
        data: {
          _embedded: { events },
        },
      } = responseByQuery;
      console.log(events);
      arrayPosters = events;
    }

    // відмальовую картки через хенделбарс
    // galleryListEl.innerHTML = galleryCard(data.hits);

    Notiflix.Notify.success(`Hooray! We found ${totalElements} events.`);

    let galleryListPosters = '';

    for (const poster of arrayPosters) {
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

      const { data } = responseByQuery;
      console.log(data);

      const {
        data: {
          page: { totalElements },
          _embedded: { events },
        },
      } = responseByQuery;
      galleryListPosters = '';

      for (const poster of events) {
        galleryListPosters += createGalleryPosters(poster);
      }

      galleryList.innerHTML = galleryListPosters;
    });
  } catch (err) {
    console.log(err);
  }
};

headerFormEl.addEventListener('submit', onInputElSubmit);
galleryList.addEventListener('click', createModalByID);
//console.log(modalTeam(modalCard));
// ==================================================

const rendomGallery = async event => {
  console.clear();

  // записуємо searchQuery в екземпляр
  //   developerApi.countryQuery = 'US';
  //   console.log(developerApi.countryQuery);
  developerApi.searchQuery = 'musi';
  //   console.log(developerApi.searchQuery);

  // скидаємо лічильник в екземплярі при новому запиті (сабміті)
  developerApi.page = 0;
  developerApi.per_page = 16;
  galleryList.innerHTML = '';

  try {
    const responseByQuery = await developerApi.fetchDataByQuery();
    const { data } = responseByQuery;
    console.log(data);
    getPagination(data).reset(-16);

    // const { data: { page: { totalElements }, _embedded: { events } } } = await developerApi.fetchDataByQuery();
    const {
      data: {
        page: { totalElements },
      },
    } = responseByQuery;

    let arrayPosters = null;

    if (totalElements === 0) {
      galleryList.innerHTML = '';
      Notiflix.Notify.failure(
        'Sorry, there are no events matching your search query. Please try again.'
      );

      return;
    } else {
      const {
        data: {
          _embedded: { events },
        },
      } = responseByQuery;
      console.log(events);
      arrayPosters = events;
    }

    // відмальовую картки через хенделбарс
    // galleryListEl.innerHTML = galleryCard(data.hits);

    Notiflix.Notify.success(`Hooray! We found ${totalElements} events.`);

    let galleryListPosters = '';

    for (const poster of arrayPosters) {
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

      const { data } = responseByQuery;
      console.log(data);

      const {
        data: {
          page: { totalElements },
          _embedded: { events },
        },
      } = responseByQuery;
      galleryListPosters = '';

      for (const poster of events) {
        galleryListPosters += createGalleryPosters(poster);
      }

      galleryList.innerHTML = galleryListPosters;
    });
  } catch (err) {
    console.log(err);
  }
};

rendomGallery();
