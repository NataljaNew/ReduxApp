
import {createLogger, logger} from "redux-logger/src";
import {configureStore} from "@reduxjs/toolkit";
import cart, {loadCartFromLocalStorage, subscribeToStore} from "./cartSlice";


const buildStore=()=>{
    const store = configureStore({
        reducer:{
            cart
        },
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
        preloadedState: {
            cart: loadCartFromLocalStorage()
        }
    });
    subscribeToStore(store);

    return store;

}

const store = buildStore();

export default store;