import axios from 'axios';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const KEY = '33584211-0b8ad53b88131ae018d3e6558';
const URL = 'https://pixabay.com/api/';
const perPage = 20;

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
  loadMore.removeAttribute('disabled');
  loadMore.classList.add('is-hidden');
  if (inputValue.length !== 0) {
    getPixa();
    console.log();
  } else Notify.warning('Please, type anything for searching!');
}

function resetGallery() {
  gallery.innerHTML = '';
}

async function onBtnMore() {
  counterPage += 1;
  await getPixa();
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
  lightBox.refresh();
}

async function getPixa() {
  const response = await axios.get(
    `${URL}?key=${KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${counterPage}`
  );
  galleryRef = await response.data.hits.map(element => {
    return `<div class="photo-card">
                        <a class="gallery__link" href="${element.largeImageURL}">
                          <img src="${element.webformatURL}" alt="${element.tags}" data-source="${element.largeImageURL}" loading="lazy"/>
                        </a>
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
    loadMore.setAttribute('disabled', '');
  } else if (galleryRef.length === 0 && counterResponse === 1) {
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    if (galleryRef.length !== 0 && counterResponse === 1) {
      Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
      loadMore.classList.remove('is-hidden');
    }
    renderHTML(gallery, galleryRef);

    lightBox.refresh();
  }
  counterResponse += 1;
}

function renderHTML(gallery, refGallery) {
  gallery.insertAdjacentHTML('beforeend', refGallery.join(''));
}

let lightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
