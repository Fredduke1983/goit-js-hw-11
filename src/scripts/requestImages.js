function requestImages(response) {
  return response.data.hits.map(element => {
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
}
export default requestImages;
