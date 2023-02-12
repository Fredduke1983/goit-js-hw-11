import axios from 'axios';

const KEY = '33584211-0b8ad53b88131ae018d3e6558';

axios
  .get(`https://pixabay.com/api/?key=${KEY}&q=yellow+flowers&image_type=photo`)
  .then(res => {
    res.data.hits.forEach(element => {
      console.log(element);
    });
  });
