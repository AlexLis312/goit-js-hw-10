import './styles.css';
import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catInfoContainer: document.querySelector('.cat-info'),
  loaderElement: document.querySelector('.loader'),
  errorMessage: document.querySelector('.error'),
};

refs.breedSelect.addEventListener('change', e => {
  const currentCat = e.currentTarget.value;

  clearCatInfo();
  show(refs.loaderElement);

  fetchCatByBreed(currentCat)
    .then(catsData => {
      renderCatImage(catsData);
      renderCatInfo(catsData.breeds);
      hide(refs.loaderElement);
    })
    .catch(error => {
      console.log(error);
      hide(refs.loaderElement);
      Notiflix.Notify.failure('Error loading breed list. Try again!');
    });
});

fetchBreeds()
  .then(breeds => {
    populateBreedOptions(breeds);
    show(refs.breedSelect);
    hide(refs.loaderElement);
  })
  .catch(error => {
    console.error('Error loading breed list:', error);
    hide(refs.loaderElement);
    Notiflix.Notify.failure('Error loading cat data. Try again!');
  });

function renderCatInfo(data) {
  const element = createCatInfoMarkup(data);
  refs.catInfoContainer.insertAdjacentHTML('beforeend', element);
}

function show(element) {
  element.classList.remove('is-hidden');
}

function hide(element) {
  element.classList.add('is-hidden');
}

function renderCatImage(image) {
  const imageUI = document.createElement('img');
  imageUI.src = image.url;
  refs.catInfoContainer.appendChild(imageUI);
}

function createCatInfoMarkup(items) {
  return items.map(({ name, description, temperament }) => {
    return ` <div>
  <h1>${name}</h1>
  <p class="description" >${description}</p>
  <h2>Temperament: <span class="temperament">${temperament}</span></h2></div>
    `;
  });
}

function populateBreedOptions(items) {
  return items.map(({ reference_image_id, name }) => {
    const optUI = document.createElement('option');
    optUI.value = reference_image_id;
    optUI.textContent = name;
    refs.breedSelect.appendChild(optUI);
  });
}

function clearCatInfo() {
  refs.catInfoContainer.innerHTML = '';
}
