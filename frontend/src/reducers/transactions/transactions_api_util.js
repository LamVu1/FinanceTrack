import axios from 'axios';
// const querystring = require('querystring');


export const fetchTransactions = (id) => {
    return axios.get(`/api/transactions/${id}`);
  };
  

export const fetchTransactionsFiltered = (filterDate) => {
  
  return axios.get('/api/transactions/filter',{
    params: {
      id: filterDate.id,
      start_date: filterDate.start_date,
      end_date: filterDate.end_date
    }});
};
  
export const createTransaction = (userData) => {
  return axios.post('/api/transactions/create', userData);
};


export const deleteTransaction = (id) => {
  return axios.post(`/api/transactions/delete/${id}`);
};


