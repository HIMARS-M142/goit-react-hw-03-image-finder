import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38635161-10d0366f68e32b154c323a4cf';
export const getSearchApi = async (find, page) => {
  const { data } = await axios.get(
    `${BASE_URL}?q=${find}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};
