import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '31629561-0abe0a895cd2152106039f707';

export const fetchPictures = async (name, page = 1) => {
  const response = await axios.get(
    `/?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
