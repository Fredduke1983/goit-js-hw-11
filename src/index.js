import axios from 'axios';
import { Notify } from 'notiflix';

const KEY = '33584211-0b8ad53b88131ae018d3e6558';
const URL = 'https://pixabay.com/api/';
const searchForm = document.querySelector('.search-form');
const loadMore = document.querySelector('.load_more');
const gallery = document.querySelector('.gallery');
const inputField = document.querySelector('input[name="searchQuery"');

let counterPage = null;
let counterResponse = null;
let inputValue = '';
let galleryRef = null;

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
  if (inputValue.length !== 0) {
    getPixa();
  } else Notify.warning('Please, type anything for searching!');
}

function resetGallery() {
  gallery.innerHTML = '';
}

function onBtnMore() {
  counterPage += 1;

  getPixa();
}

async function getPixa() {
  const response = await axios.get(
    `${URL}?key=${KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=${counterPage}`
  );
  galleryRef = await response.data.hits.map(element => {
    return `<div class="photo-card">
                          <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" width="100%" height="100%"/>
                          <div class="info">
                            <p class="info-item">
                              <b>Likes: ${element.likes}</b>
                            </p>
                            <p class="info-item">
                              <b>Views: ${element.views}</b>
                            </p>
                            <p class="info-item">
                              <b>Comments: ${element.comments}</b>
                            </p>
                            <p class="info-item">
                              <b>Downloads: ${element.downloads}</b>
                            </p>
                          </div>
                        </div>`;
  });
  if (galleryRef.length === 0 && counterResponse > 1) {
    Notify.info("We're sorry, but you've reached the end of search results.");
  } else if (galleryRef.length === 0 && counterResponse === 1) {
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    gallery.insertAdjacentHTML('beforeend', galleryRef.join(''));
  }
  counterResponse += 1;
}
