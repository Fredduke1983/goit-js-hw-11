import axios from 'axios';
import { Notify } from 'notiflix';
import lightBox from './lightBox';

const KEY = '33584211-0b8ad53b88131ae018d3e6558';
const URL = 'https://pixabay.com/api/';
const perPage = 20;

const loadMore = document.querySelector('.load_more');
const gallery = document.querySelector('.gallery');

async function getPixa(inputValue, counterPage, counterResponse) {
  const response = await axios.get(
    `${URL}?key=${KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${counterPage}`
  );

  let galleryRef = await response.data.hits.map(element => {
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
    loadMore.innerHTML = 'No more';
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
}

function renderHTML(gallery, galleryRef) {
  gallery.insertAdjacentHTML('beforeend', galleryRef.join(''));
}

export default getPixa;
