import { DeveloperApi } from './js/DeveloperApi';
import Notiflix from 'notiflix';

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

// Створюємо екземплям класу
const developerApi = new DeveloperApi();

// Викликаємо при сабміті, прослуховуємо Форму
const onInputElSubmit = async event => {
  event.preventDefault();

  // записуємо searchQuery в екземпляр
  developerApi.countryQuery = event.target.elements.country.value;
  console.log(developerApi.countryQuery);
  developerApi.searchQuery = event.target.elements.searching.value;
  console.log(developerApi.searchQuery);

  // скидаємо лічильник в екземплярі при новому запиті (сабміті)
  developerApi.page = 0;

  try {
    const { data } = await developerApi.fetchDataByQuery();
    console.log(data);

    // відправляємо запит посторінково
    getPagination(data).on('beforeMove', async e => {
      const currentPage = e.page;
      developerApi.page = currentPage - 1;
      const { data } = await developerApi.fetchDataByQuery();
      console.log('developerApi.page', developerApi.page);
      console.log('currentPage', currentPage);
    });

    if (data.page.totalElements === 0) {
      //   galleryListEl.innerHTML = '';
      Notiflix.Notify.failure(
        'Sorry, there are no events matching your search query. Please try again.'
      );
      return;
    }

    // відмальовую картки через хенделбарс
    // galleryListEl.innerHTML = galleryCard(data.hits);

    Notiflix.Notify.success(
      `Hooray! We found ${data.page.totalElements} events.`
    );
  } catch (err) {
    console.log(err);
  }
};

headerFormEl.addEventListener('submit', onInputElSubmit);

