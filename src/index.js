import { Notify } from 'notiflix';
import lightBox from './scripts/lightBox';
import getPixa from './scripts/pixa';

const searchForm = document.querySelector('.search-form');
const loadMore = document.querySelector('.load_more');
const gallery = document.querySelector('.gallery');
const inputField = document.querySelector('input[name="searchQuery"');

let counterPage = null;
let counterResponse = null;
let inputValue = '';

searchForm.addEventListener('input', onSearchInput);
searchForm.addEventListener('submit', onSubmitForm);
loadMore.addEventListener('click', onBtnMore);

function onSearchInput() {
  inputValue = inputField.value;
}

function onSubmitForm(e) {
  e.preventDefault();
  onSearchInput();
  resetGallery();
  counterPage = 1;
  counterResponse = 1;
  e.target.reset();

  loadMore.innerHTML = 'Load more...';
  loadMore.removeAttribute('disabled');
  loadMore.classList.add('is-hidden');

  if (inputValue.length !== 0) {
    getPixa(inputValue, counterPage, counterResponse);
  } else Notify.warning('Please, type anything for searching!');
}

function resetGallery() {
  gallery.innerHTML = '';
}

async function onBtnMore() {
  counterPage += 1;
  counterResponse += 1;

  await getPixa(inputValue, counterPage, counterResponse);
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });

  lightBox.refresh();
}
