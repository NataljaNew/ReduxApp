import {Formik, Form} from "formik";
import {Alert, Button, CircularProgress, Paper} from "@mui/material";
import * as PropTypes from "prop-types";
import * as Yup from 'yup';
import TextFieldInput from "./TextFieldInput";
import Container from "@mui/material/Container";
import * as React from "react";
import { getItem, updateItem} from "../../api/api";
import {useEffect, useState} from "react";
import './style.css';
import {useParams} from "react-router-dom";
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
const UpdateProduct = () => {
    const {itemId} = useParams();
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState(null);
    const [notification, setNotification] = useState({isVisible:false, message:'', severity: ''});
    const onUpdateItem = (item, helpers) => {
        item.id = itemId;
        updateItem(item)
            .then(({status}) => {
                if(status === 202){
                    setNotification({isVisible: true, message: 'Item created', severity: 'success'});
                    helpers.resetForm();
                }

            })
            .catch((error) => setNotification({isVisible: true, message: 'something went wrong', severity: 'error'}))
            .finally(()=>helpers.setSubmitting(false))
    }
    useEffect(() => {
        getItem(itemId)
            .then(({data}) => setItem(data))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);
    return(
        <>
            { loading ?
                <div>Loading...</div> :


        <Formik initialValues={{
            title: item?.title ||'',
            img:  item?.img ||'',
            category: item?.category ||'',
            quantity: item?.quantity ||'',
            price: item?.price ||''
        }}
                onSubmit={onUpdateItem}
                validationSchema={validationSchema}>
            {props => (
                <Container disableGutters maxWidth="sm" component="main" sx={{pt: 8, pb: 6}}>

                        {
                            notification.isVisible &&
                            <Alert severity={notification.severity} sx={{ width: '100%' }}>
                                {notification.message}
                            </Alert>
                        }
                        <Paper elevation={3} sx={{py: 1}}>
                        <Form className="product-form">
                            <TextFieldInput error={props.touched.title && !!props.errors.title}
                                            fieldName="title"
                                            label="Title:"
                                            placeholder="Enter title"/>
                            <TextFieldInput error={props.touched.img && !!props.errors.img}
                                            fieldName="img"
                                            label="Img url:"
                                            placeholder="Enter img url:"
                                            multiline
                                            rows={3}
                            />
                            <TextFieldInput error={props.touched.category && !!props.errors.category}
                                            fieldName="category"
                                            label="Category"
                                            placeholder="Enter category"
                            />
                            <TextFieldInput error={props.touched.quantity && !!props.errors.quantity}
                                            fieldName="quantity"
                                            label="Quantity"
                                            placeholder="Enter quantity"/>
                            <TextFieldInput error={props.touched.price && !!props.errors.price}
                                            fieldName="price"
                                            label="Price"
                                            placeholder="Enter price"/>
                            {
                                props.isSubmitting ? <CircularProgress/> :
                                    <Button type="submit" variant="outlined">Submit</Button>
                            }
                        </Form>
                    </Paper>
                </Container>
            )}
        </Formik>
            }
        </>
    )
}

export default UpdateProduct;