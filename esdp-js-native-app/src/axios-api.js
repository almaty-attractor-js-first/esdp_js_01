import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://shoeser.ltestl.com/api'
});

export default instance;
