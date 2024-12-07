import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_p9AZOma6DvVHOsf4jqVl0A2bOnm4gDzlM6CD8T16saXxCOEXzHDcrthDTvvKijl1';

export function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1/breeds';

  return axios
    .get(BASE_URL)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log('error', error));
}

export function fetchCatByBreed(breedId) {
  const CAT_INFO_URL = `https://api.thecatapi.com/v1/images/${breedId}`;

  return axios.get(CAT_INFO_URL).then(response => {
    return response.data;
  });
}
