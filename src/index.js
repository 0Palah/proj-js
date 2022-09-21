import { DeveloperApi } from './js/DeveloperApi';
import Notiflix from 'notiflix';
// import galleryCard from './templates/gallery-card.hbs';

const searchCountryEl = document.querySelector('#country');
console.log(searchCountryEl);
const searchingStrEl = document.querySelector('#searching');
console.log(searchingStrEl);
const btnSubmitEl = document.querySelector('.header__form-submit');
console.log(btnSubmitEl);
const headerFormEl = document.querySelector('.header__form');
console.dir(headerFormEl);

const onInputElSubmit = async event => {
  event.preventDefault();
  const countryCode = searchCountryEl.value;
  console.log(countryCode);
};

headerFormEl.addEventListener('submit', onInputElSubmit);
