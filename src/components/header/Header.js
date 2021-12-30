import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import * as React from "react";
import {NavLink} from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import {useSelector} from "react-redux";
import LanguageSwitcher from "../languageSwitcher/languageSwitcher";
import {Translation} from "react-i18next";

export default () => {

    const cart = useSelector(state => state.cart)
    const totalItems = cart.reduce((sum,item) =>sum + item.count, 0);
    const totalSum = cart.reduce((sum,item) =>sum + (item.count * item.price), 0);
    return (
        <Translation>
            {(t)=>
                <>
        <AppBar
            position="standard"
            color="warning"
            elevation={0}
            sx={{borderBottom: (theme) => `1px solid ${theme.palette.divider}`}}
        >
            <Toolbar sx={{flexWrap: 'wrap'}}>
                <Typography color="inherit"
                            noWrap
                            sx={{flexGrow: 1}}>
                    <Link
                        variant="button"
                        color="text.primary"
                        to="/"
                        sx={{my: 1, mx: 1.5, fontSize: 20}} underline="none"
                        component={NavLink}>
                        Resto <i className="bi bi-list"></i> Menu
                    </Link>
                </Typography>
                <nav>
                    <Link
                        variant="button"
                        color="text.primary"
                        to="/items/create"
                        sx={{my: 1, mx: 1.5}}
                        component={NavLink}>
                        {t('header:createProduct')}
                    </Link>
                    <Link
                        variant="button"
                        color="text.primary"
                        to="/users/registration"
                        sx={{my: 1, mx: 1.5}}
                        component={NavLink}>
                        {t('header:createUser')}
                    </Link>
                    <Link
                        variant="button"
                        color="text.primary"
                        to="/cart"
                        sx={{my: 1, mx: 1.5}}
                        component={NavLink}>
                        <Badge badgeContent={totalItems} color="primary" sx={{my: 1, mx: 1.5}}>
                            <ShoppingCartIcon/>
                        </Badge>
                        {t('header:total')} {totalSum} €
                    </Link>
                </nav>
                <Button href="#" variant="outlined" sx={{my: 1, mx: 1.5}}>
                    {t('header:login')}
                </Button>
                <LanguageSwitcher/>
            </Toolbar>
        </AppBar>
                </>}
        </Translation>
    )
}