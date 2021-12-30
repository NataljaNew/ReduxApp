import HTTP from "./index";

const getItems =()=>HTTP.get('/items');
const createItem = (data) =>HTTP.post('/items', data);
const updateItem = (data) =>HTTP.put('/items', data);
const getItem = (id) =>HTTP.get(`/items/${id}`);
const deleteItem = (id) =>HTTP.delete(`/items/${id}`);

export {getItems, createItem,updateItem,getItem,deleteItem}