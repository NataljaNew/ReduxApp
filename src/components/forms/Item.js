import {Formik, Form} from "formik";
import {Alert, Button, CircularProgress, Paper} from "@mui/material";
import * as PropTypes from "prop-types";
import * as Yup from 'yup';
import TextFieldInput from "./TextFieldInput";
import Container from "@mui/material/Container";
import * as React from "react";
import {createItem} from "../../api/api";
import {useState} from "react";
import './style.css';
import {Translation} from "react-i18next";

Form.propTypes = {children: PropTypes.node};

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .min(5, 'Value must be more than 5')
        .required(),
    img: Yup.string().required(),
    category: Yup.string().max(120, 'more than 120')
        .required(),
    quantity: Yup.number()
        .typeError('must be a number')
        .positive()
        .required(),
    price: Yup.number().typeError('must be a number')
        .positive()
        .required()
});
export default () => {
    const [notification, setNotification] = useState({isVisible:false, message:'', severity: ''});
    const onCreateItem = (item, helpers) => {
        createItem(item)
            .then(({status}) => {
                if(status === 200){
                    setNotification({isVisible: true, message: 'Item created', severity: 'success'});
                    helpers.resetForm();
                }

            })
            .catch((error) => setNotification({isVisible: true, message: 'something went wrong', severity: 'error'}))
            .finally(()=>helpers.setSubmitting(false))
    }
    return(
        <Formik initialValues={{
            title: '',
            img: '',
            category: '',
            quantity: '',
            price: ''
        }}
                onSubmit={onCreateItem}
                validationSchema={validationSchema}>
            {props => (
                <Translation>
                    {(t)=>
                <Container disableGutters maxWidth="sm" component="main" sx={{pt: 8, pb: 6}}>
                    <Paper elevation={3} sx={{py: 1}}>
                        {
                            notification.isVisible &&
                            <Alert severity={notification.severity} sx={{ width: '100%' }}>
                                {notification.message}
                            </Alert>
                        }

                        <Form className="product-form">
                            <TextFieldInput error={props.touched.title && !!props.errors.title}
                                            fieldName="title"
                                            label={t('item:title')}
                                            placeholder="Enter title"/>
                            <TextFieldInput error={props.touched.img && !!props.errors.img}
                                            fieldName="img"
                                            label={t('item:url')}
                                            placeholder="Enter img url"
                                            multiline
                                            rows={3}
                            />
                            <TextFieldInput error={props.touched.category && !!props.errors.category}
                                            fieldName="category"
                                            label={t('item:category')}
                                            placeholder="Enter category"

                            />
                            <TextFieldInput error={props.touched.quantity && !!props.errors.quantity}
                                            fieldName="quantity"
                                            label={t('item:quantity')}
                                            placeholder="Enter quantity"/>
                            <TextFieldInput error={props.touched.price && !!props.errors.price}
                                            fieldName="price"
                                            label={t('item:price')}
                                            placeholder="Enter price"/>
                            {
                                props.isSubmitting ? <CircularProgress/> :
                                    <Button type="submit" variant="outlined">{t('item:submit')}</Button>
                            }
                        </Form>
                    </Paper>
                </Container>
                    }
                </Translation>
            )}
        </Formik>
    )
}