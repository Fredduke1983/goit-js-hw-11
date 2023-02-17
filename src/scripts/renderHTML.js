export default function renderHTML(gallery, galleryRef) {
  gallery.insertAdjacentHTML('beforeend', galleryRef.join(''));
}
