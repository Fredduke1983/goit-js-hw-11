import axios from 'axios';

const KEY = '33584211-0b8ad53b88131ae018d3e6558';
const URL = 'https://pixabay.com/api/';
const searchForm = document.querySelector('.search-form');
const loadMore = document.querySelector('.load_more');
const gallery = document.querySelector('.gallery');

let counterPage = 1;
let inputValue = null;
let galleryRef = null;

searchForm.addEventListener('input', onSearchInput);
searchForm.addEventListener('submit', onSubmitForm);
loadMore.addEventListener('click', onBtnMore);

function onSearchInput(e) {
  inputValue = e.target.value;
}

function onSubmitForm(e) {
  e.preventDefault();
  counterPage = 1;
  e.target.reset();
  getPixa();
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
                          <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
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
  gallery.insertAdjacentHTML('beforeend', galleryRef.join());

  // axios
  //   .get(
  //     `${URL}?key=${KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=${counterPage}`
  //   )
  //   .then(res => {
  //     if (res.data.hits.length !== 0) {
  //       res.data.hits.forEach(element => {
  //         console.log(element.tags);
  //       });
  //     } else console.log('not imgs');
  //   });
}
