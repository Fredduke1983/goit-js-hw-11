import axios from 'axios';

const KEY = '33584211-0b8ad53b88131ae018d3e6558';
const URL = 'https://pixabay.com/api/';
const searchForm = document.querySelector('.search-form');
const loadMore = document.querySelector('.load_more');
let counterPage = 1;
let inputValue = null;

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

function getPixa() {
  axios
    .get(
      `${URL}?key=${KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=${counterPage}`
    )
    .then(res => {
      if (res.data.hits.length !== 0) {
        res.data.hits.forEach(element => {
          console.log(element.tags);
        });
      } else console.log('not imgs');
    });
}
