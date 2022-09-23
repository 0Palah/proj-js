import { DeveloperApi } from './DeveloperApi';

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
  console.log('\n');
  console.log(developerApi.id);

  // скидаємо лічильник в екземплярі при новому запиті (сабміті)
  developerApi.page = 0;

  try {
    const { data } = await developerApi.fetchDataByZId();
    console.log(data);

    const modalCard = {};

    const {
      data: {
        page: { totalElements },
        _embedded: { events },
      },
    } = await developerApi.fetchDataByZId();
    console.log('\ntotalElements:', totalElements);
    console.log('events:', events);
    console.log('\n');

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

    console.log('localDate:', localDate);
    console.log('localTime:', localTime);
    console.log('timezone:', timezone);
    console.log('name:', name);


            modalCard.info = info;
        } else {
            modalCard.info = 'info';
        }

    modalCard.localDate = localDate;
    modalCard.localTime = localTime;
    modalCard.timezone = timezone;
    modalCard.name = name;


    if (events[0].info) {
      const { info } = events[0];
      console.log('info:', info);
      console.log('\n');

      modalCard.info = info;
      // modalCard.info = events[0].info;
    } else {
      modalCard.info = 'info';
    }

    if (events[0].priceRanges) {
      const { currency, max, min } = events[0].priceRanges[0];

      console.log('currency', currency);
      console.log('max', max);
      console.log('min', min);
      console.log('\n');

      modalCard.currency = currency;
      modalCard.max = max;
      modalCard.min = min;
    } else {
      modalCard.currency = 'currency';
      modalCard.max = 'max';
      modalCard.min = 'min';
    }

    console.log('images:', images);
    const image = [...images].sort((a, b) => b.height - a.height)[0].url;

    console.log('image', image);
    console.log('\n');

    modalCard.image = image;

    console.log('venues[0]', venues[0]);


        const { address: { line1: address }, city: { name: city }, country: { name: countryModalCard} } = venues[0];

        console.log('address:', address);
        console.log('city:', city);
        console.log('country:', countryModalCard);
        console.log('\n');

        modalCard.address = address;
        modalCard.city = city;
        modalCard.country = countryModalCard;


    console.log(modalCard);

    // відмальовую картки через хенделбарс в  модалку (написати)
    // galleryListEl.innerHTML = galleryCard(data.hits);

    // Notiflix.Notify.success(
    //   `Hooray! We found ${data.page.totalElements} events.`
    // );
  } catch (err) {
    console.log(err);
  }
};
