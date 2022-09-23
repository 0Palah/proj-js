'use strict';

const openModalBtnEl = document.querySelector("[data-team-modal-open]");
const backdropEl = document.querySelector("[data-team-modal]");
const closeModalBtnEl = document.querySelector("[data-team-modal-close]");
console.log(closeModalBtnEl);

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

openModalBtnEl.addEventListener('click', onOpenModalBtnElClick);
closeModalBtnEl.addEventListener('click', closeModalWindow);
backdropEl.addEventListener('click', onBackdropElClick);
