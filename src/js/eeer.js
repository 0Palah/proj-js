// import { DeveloperApi } from './js/DeveloperApi';
// import Notiflix from 'notiflix';
// import templateContentList from './templates/contentList.hbs';

// // const searchCountryEl = document.querySelector('#country');
// // console.log(searchCountryEl);
// // const searchingStrEl = document.querySelector('#searching');
// // console.log(searchingStrEl);
// // const btnSubmitEl = document.querySelector('.header__form-submit');
// // console.log(btnSubmitEl);
// const headerFormEl = document.querySelector('.header__form');
// console.dir(headerFormEl);

// const galleryList = document.querySelector('.main-list');
// console.log(galleryList);

// // Створюємо екземплям класу
// const developerApi = new DeveloperApi();

// // function initialize(latitude, longitude) {

// // function initialize() {
// // const myLatlng = new google.maps.LatLng(latitude, longitude);

// // const myLatlng = new google.maps.LatLng;
// // console.dir(myLatlng);

// // const myOptions = {
// // 	zoom: 8,
// // 	center: myLatlng,
// // 	mapTypeId: google.maps.MapTypeId.ROADMAP
// // }
// // const map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
// // }

// // initialize();

// const createGalleryPosters = poster => {
//   const {
//     dates: {
//       start: { localDate: data },
//     },
//     id,
//     images,
//     name,
//     _embedded: { venues },
//   } = poster;

//   // console.log(venues[0]);

//   const {
//     address: { line1: address },
//     city: { name: city },
//     location: { longitude, latitude },
//   } = venues[0];

//   // console.log('images:', images);
//   const image = [...images].sort((a, b) => b.height - a.height)[0].url;
//   // console.log(image);

//   console.log('\naddress:', address);
//   console.log('city:', city);
//   console.log('data:', data);
//   console.log('id:', id);
//   console.log('image:', image);
//   console.log('name:', name);
//   console.log('longitude:', longitude);
//   console.log('latitude:', latitude);
//   console.log('\n');

//   const posterCard = {};

//   posterCard.address = address;
//   posterCard.city = city;
//   posterCard.data = data;
//   posterCard.id = id;
//   posterCard.image = image;
//   posterCard.name = name;
//   posterCard.longitude = longitude;
//   posterCard.latitude = latitude;

//   return templateContentList(posterCard);
// };

// const getPostersbyPages = async event => {
//   try {
//     developerApi.page += 1;

//     const { data } = await developerApi.fetchDataByQuery();
//     console.log(data);

//     const {
//       data: {
//         page: { totalElements },
//         _embedded: { events },
//       },
//     } = await developerApi.fetchDataByQuery();

//     //підключаєм бібліотеку пагінації
//   } catch (err) {
//     console.log(err);
//   }
// };

// // Викликаємо при сабміті, прослуховуємо Форму
// const onInputElSubmit = async event => {
//   event.preventDefault();
//   console.clear();

//   // записуємо searchQuery в екземпляр
//   developerApi.countryQuery = event.target.elements.country.value;
//   console.log(developerApi.countryQuery);
//   developerApi.searchQuery = event.target.elements.searching.value;
//   console.log(developerApi.searchQuery);

//   // скидаємо лічильник в екземплярі при новому запиті (сабміті)
//   developerApi.page = 0;
//   developerApi.per_page = 16;
//   galleryList.innerHTML = '';

//   try {
//     const { data } = await developerApi.fetchDataByQuery();
//     console.log(data);

//     const {
//       data: {
//         page: { totalElements },
//         _embedded: { events },
//       },
//     } = await developerApi.fetchDataByQuery();

//     if (totalElements === 0) {
//       galleryList.innerHTML = '';
//       Notiflix.Notify.failure(
//         'Sorry, there are no events matching your search query. Please try again.'
//       );
//       return;
//     }

//     Notiflix.Notify.success(`Hooray! We found ${totalElements} events.`);

//     let galleryListPosters = '';

//     for (const poster of events) {
//       galleryListPosters += createGalleryPosters(poster);
//     }

//     // console.log(galleryListPosters);

//     // відмальовую картки через хенделбарс
//     galleryList.innerHTML = galleryListPosters;

//     // викликаємо пагінацію
//     // показуємо блок пагінації
//     // paginationButton.addEventListener('click', getPostersbyPages);
//   } catch (err) {
//     console.log(err);
//   }
// };

// headerFormEl.addEventListener('submit', onInputElSubmit);
