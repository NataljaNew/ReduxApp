import {createSlice} from "@reduxjs/toolkit";
import {addLocalStorage, getLocalStorage} from "../storage/local";


const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart(state, action) {
            const item = action.payload
            const existingItem = state.find(p => p.id === item.id)
            if (existingItem) {
                existingItem.count++;
            } else{
                item.count = 1;
                state.push(item);
            }
        },
        removeFromCart(state, {payload: id}) {
            return state.filter(i=>i.id !== id)
        },
        removeOneItemFromCart(state, action) {
            const item = action.payload
            const existingItem = state.find(p => p.id === item.id)
            if (existingItem.count >1) {
                existingItem.count--;
            } else{
                return state.filter(i=>i.id !== item.id)
            }
        }
    }
});
let prevCart = [];
const subscribeToStore =(store)=>{
    store.subscribe(()=>{
        const cart =  store.getState().cart;
        if (prevCart !== cart) {
            addLocalStorage('cart', cart);
            prevCart = cart;
        }
    });
}
const loadCartFromLocalStorage =()=> getLocalStorage('cart') || [];

export default cartSlice.reducer;
export const {addToCart,removeFromCart, removeOneItemFromCart} = cartSlice.actions;
export {subscribeToStore, loadCartFromLocalStorage};