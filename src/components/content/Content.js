import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import {Routes, Route} from "react-router-dom";
import Items from "../items/Items";
import Item from "../forms/Item";
import User from "../forms/User";
import UpdateItem from "../forms/UpdateItem";
import Cart from "../cart/Cart";

// const tiers = [
//     {
//         title: 'Free',
//         price: '0',
//         description: [
//             '10 users included',
//             '2 GB of storage',
//             'Help center access',
//             'Email support',
//         ],
//         buttonText: 'Sign up for free',
//         buttonVariant: 'outlined',
//     },
//     {
//         title: 'Pro',
//         subheader: 'Most popular',
//         price: '15',
//         description: [
//             '20 users included',
//             '10 GB of storage',
//             'Help center access',
//             'Priority email support',
//         ],
//         buttonText: 'Get started',
//         buttonVariant: 'contained',
//     },
//     {
//         title: 'Enterprise',
//         price: '30',
//         description: [
//             '50 users included',
//             '30 GB of storage',
//             'Help center access',
//             'Phone & email support',
//         ],
//         buttonText: 'Contact us',
//         buttonVariant: 'outlined',
//     },
// ];

export default ()=>{
    return (
        <>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <Routes>
                <Route path="/" element={<Items/>}/>
                <Route path="/items/create" element={<Item/>}/>
                <Route path="/users/registration" element={<User/>}/>
                <Route path="/items/update/:itemId" element={<UpdateItem/>}/>
                <Route path="/cart" element={<Cart/>}/>
            </Routes>
        </>
    )
}