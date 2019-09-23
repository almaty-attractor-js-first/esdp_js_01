import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://shoeser.ltestl.com:8000'
});

export default instance;
