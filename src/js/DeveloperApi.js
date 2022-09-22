'use strict';
import axios from 'axios';

//  Клас з параметрами запиту та методами для зипиту на сервер
export class DeveloperApi {
  #BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events';
  #API_KEY = 'SvtlCFgxjcKvTdhUmCGG3PAdpLAkdCAX';

  constructor() {
    this.page = 0;
    this.per_page = 16;
    //   searchQuery будемо записувати в екземплярі при сабміті форми
    this.searchQuery = '';
    this.countryQuery = '';
    this.id = '';
    // this.id = 'ZfqgVMyxjZBYPzgVMyWMZd';
  }

  //  Метод для запиту на сервер
  fetchDataByQuery() {
    //  Обєкт параметрів запиту
    const searchParams = {
      keyword: this.searchQuery,
      apikey: this.#API_KEY,
      countryCode: this.countryQuery,
      page: this.page,
      size: this.per_page,
    };

    //   Виводить результат запиту
    return axios.get(`${this.#BASE_URL}`, {
      params: searchParams,
    });
  }

  // fetchDataByZId() {
  //   const searchParamsId = {
  //     id: this.id,
  //   };
  //   //   Виводить результат запиту
  //   return axios.get(`${this.#BASE_URL}`, {
  //     params: searchParamsId,
  //   });
  // }
}
