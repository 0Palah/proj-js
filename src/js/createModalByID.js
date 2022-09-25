'use strict';
import pathToSprite from '../images/icons.svg';
import { DeveloperApi } from './DeveloperApi';
import modalTeam from '../templates/modalTeam.hbs';
// import modal from './modal';
const modalEL = document.querySelector('#data-modal-wrapper');

const developerApi = new DeveloperApi();

// запит по id події
export const createModalByID = async event => {
  event.preventDefault();
  // попали в список  - ВИЙШЛИ
  // попали в посилання (локація)  - ВИЙШЛИ (замінити на функцію від гугл)
  if (event.target.nodeName === 'UL' || event.target.nodeName === 'A') {
    return;
  }

  // Отримуємо ID івенту
  // console.log(event.target);
  // console.dir(event.target.dataset.id);

  // записуємо searchQuery в екземпляр
  developerApi.id = event.target.dataset.id;
  // console.log('\n');
  // console.log(developerApi.id);

  // скидаємо лічильник в екземплярі при новому запиті (сабміті)
  developerApi.page = 0;

  try {
    const responseById = await developerApi.fetchDataById();
    const { data } = responseById;
    // console.log(data);

    const modalCard = {};

    const {
      data: {
        page: { totalElements },
        _embedded: { events },
      },
    } = responseById;
    // console.log('\ntotalElements:', totalElements);
    // console.log('events:', events);
    // console.log('\n');

    let {
      dates: {
        start: { localDate, localTime },
        timezone,
      },
      images,
      name,
      _embedded: { venues },
    } = events[0];

    if (localTime === undefined) {
      localTime = '--';
    }
    localTime = localTime.slice(0, 5);

    // localTime = localTime.slice(0, 5);

    // console.log('localDate:', localDate);
    // console.log('localTime:', localTime);
    // console.log('timezone:', timezone);
    // console.log('name:', name);

    modalCard.localDate = localDate;
    modalCard.localTime = localTime;
    modalCard.timezone = timezone;
    modalCard.name = name;

    if (events[0].info) {
      const { info } = events[0];
      // console.log('info:', info);
      // console.log('\n');
      modalCard.info = events[0].info;
    } else {
      modalCard.info = 'More information on the website.';
    }

    if (events[0].priceRanges) {
      const { currency, max, min } = events[0].priceRanges[0];

      // console.log('currency', currency);
      // console.log('max', max);
      // console.log('min', min);
      // console.log('\n');

      modalCard.currency = currency;
      modalCard.max = max;
      modalCard.min = min;
    } else {
      modalCard.currency = 'currency';
      modalCard.max = 'We are working on it!';
      modalCard.min = 'We are working on it!';
    }

    // console.log('images:', images);
    const image = [...images].sort((a, b) => b.height - a.height)[0].url;

    // console.log('image', image);
    // console.log('\n');

    modalCard.image = image;

    // console.log('venues[0]', venues[0]);

    const {
      name: placeName,
      address: { line1: address },
      city: { name: city },
      country: { name: countryModalCard },
      url: url,
    } = venues[0];

    // console.log('address:', address);
    // console.log('city:', city);
    // console.log('country:', countryModalCard);
    // console.log('placeName:', placeName);
    // console.log(url);
    // console.log('\n');

    modalCard.address = address;
    modalCard.city = city;
    modalCard.country = countryModalCard;
    modalCard.placeName = placeName;
    modalCard.url = url;
    modalCard.spriteUrl = pathToSprite;

    console.log(modalCard);

    // відмальовую картки через хенделбарс в  модалку (написати)
    // return modalTeam(modalCard);
    modalEL.innerHTML = modalTeam(modalCard);

    // console.log(modalTeam(modalCard));

    const openModalBtnEl = document.querySelector('[data-modal-open]');
    const backdropEl = document.querySelector('[data-modal]');
    const closeModalBtnEl = document.querySelector('[data-modal-close]');

    const onOpenModalBtnElClick = event => {
      backdropEl.classList.add('is-open');

      window.addEventListener('keydown', onEscBtnPush);
    };

    const closeModalWindow = event => {
      backdropEl.classList.remove('is-open');
      window.removeEventListener('keydown', onEscBtnPush);
    };

    const onEscBtnPush = event => {
      if (event.code !== 'Escape') {
        return;
      }

      closeModalWindow();
    };

    const onBackdropElClick = event => {
      if (event.currentTarget !== event.target) {
        return;
      }

      closeModalWindow();
    };

    // openModalBtnEl.addEventListener('click', onOpenModalBtnElClick);
    closeModalBtnEl.addEventListener('click', closeModalWindow);
    backdropEl.addEventListener('click', onBackdropElClick);
    onOpenModalBtnElClick();
    //return modalTeam(modalCard);
    //console.log(modalEL);
    //console.log(modalTeam(modalCard));

    // onOpenModalBtnElClick();

    // Notiflix.Notify.success(
    //   `Hooray! We found ${data.page.totalElements} events.`
    // );
  } catch (err) {
    console.log(err);
  }
};
