import {Alert, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Container from "@mui/material/Container";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart, removeOneItemFromCart} from "../../store/cartSlice";
import CardMedia from "@mui/material/CardMedia";
import React from "react";
import {AddButton} from "../items/Items";
import {Translation} from "react-i18next";

export default () => {

    const items = useSelector(state => state.cart);
    const dispatcher = useDispatch();
    const onRemoveAllItems = (id) => dispatcher(removeFromCart(id));
    const onAddItem =(id)=> dispatcher(addToCart(id));
    const onRemoveItem = (id)=> dispatcher(removeOneItemFromCart(id));
    const totalSum = items.reduce((sum,item) =>sum + (item.count * item.price), 0);
    return (
        <Container maxWidth="md" sx={{ minHeight: 500}}>
            {
                items.length === 0 ?
                    <Alert severity="info">Basket is empty!</Alert>
                    :
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 100}} aria-label="simple table">
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {item.name}
                                        </TableCell>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={item.img}
                                            alt="img" sx={{m: 3}}/>
                                        <TableCell align="right">{item.title}</TableCell>
                                        <TableCell align="right">
                                            <div className="btn-group me-2" role="group" aria-label="First group">
                                                <button onClick={() => onRemoveItem(item)} type="button" className="btn btn-outline-secondary">-</button>
                                                <span className="btn btn-outline text-white bg-secondary">{item.count}</span>
                                                <button onClick={() => onAddItem(item)} type="button" className="btn btn-outline-secondary">+</button>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" >{item.price * item.count} Euro</TableCell>
                                        <TableCell>
                                            <Button variant="outlined" color="error"
                                                    onClick={() => onRemoveAllItems(item.id)}>
                                                <DeleteOutlineIcon/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}} style={{background: `orange`}}
                                >
                                    <TableCell component="th" scope="row">
                                    </TableCell>
                                    <Translation>
                                        {(t)=>
                                            <>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right">{t('cart:total')} </TableCell>
                                    <TableCell align="left">{totalSum} Euro</TableCell>
                                    <TableCell align="right">
                                        <AddButton >{t('cart:go')}</AddButton>
                                    </TableCell>
                                            </>
                                        }
                                    </Translation>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </Container>
    )
}