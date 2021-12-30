import React, {useEffect, useState} from "react";
import {deleteItem, getItems} from "../../api/api";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import {styled} from "@mui/styles";
import Button from "@mui/material/Button";
import {Box, CircularProgress} from "@mui/material";
import {addToCart} from "../../store/cartSlice";
import {useDispatch} from "react-redux";
import Link from "@mui/material/Link";
import {NavLink} from "react-router-dom";
import {Translation} from "react-i18next";

const AddButton = styled(Button)({
    width: '150px',
    height: '40px',
    backgroundColor: '#29a745',
    borderRadius: '4px',
    color: 'black',
    fontSize: '16px',
    cursor: 'pointer',
});

const Items = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState({isVisible: false, message: '', severity: ''});

    const dispatcher = useDispatch();
    const onAddItem = (item) => dispatcher(addToCart(item));

    const onDeleteItem =(id) => {
        deleteItem(id)
            .then(({status}) => {
                if (status === 204) {
                    setNotification({isVisible: true, message: 'Product deleted successfully', severity: 'success'});
                    const itemsNew = items.filter(item => item.id !== id);
                    setItems(itemsNew);
                }
            })
            .catch((error) => setNotification({isVisible: true, message: 'Something goes wrong', severity: 'error'}));
    }


    useEffect(() => {
        getItems()
            .then(({data}) => setItems(data))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Translation>
            {(t)=>
        <>
            <div className="container h-100" >
                <div className="row d-flex flex-row">
                        {loading ?
                            <>
                                <Box sx={{display: 'flex', justifyContent: "center"}}><CircularProgress/></Box>
                                <div>Loading ... </div>
                            </>
                             :
                            <div className="col h-100">
                                    {items.map((item) => (

                                        <Card key={items.id} sx={{minWidth: 200, minHeight: 300, display: 'inline-block', m: 2}}>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {item.title}
                                                </Typography>
                                            </CardContent>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={item.img}
                                                alt="img"/>
                                            <CardContent>
                                                <Typography variant="body2" color="text.secondary">
                                                    {t('items:category')} {item.category}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {t('items:price')} {item.price} Euro
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <AddButton onClick={() => onAddItem(item)}>{t('items:addBtn')}</AddButton>
                                            </CardActions>
                                            <Link
                                                variant="button"
                                                color="text.primary"
                                                to={`/items/update/${item.id}`}
                                                sx={{my: 1, mx: 1.5}}component={NavLink}>
                                                {t('items:update')}
                                            </Link>
                                            <Button
                                                variant="button"
                                                color="text.primary"
                                                onClick={()=>onDeleteItem(item.id)}
                                                sx={{my: 1, mx: 1.5}}>
                                                {t('items:delete')}
                                            </Button>
                                        </Card>
                                    ))}
                            </div>
                        }
                </div>
            </div>
        </>}
        </Translation>
    )
}
export default Items;
export {AddButton};