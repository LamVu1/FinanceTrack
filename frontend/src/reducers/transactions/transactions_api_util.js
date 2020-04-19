import axios from 'axios';


export const fetchTransaction = (id) => {
    return axios.get(`/api/transactions/${id}`);
  };
  
export const createTransaction = (userData) => {
  return axios.post('/api/transactions/create', userData);
};


export const deleteTransaction = (id) => {
  return axios.post(`/api/transactions/delete/${id}`);
};


