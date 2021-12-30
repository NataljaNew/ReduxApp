import {Form, Formik} from 'formik';
import {Button, CircularProgress, Paper} from '@mui/material';
import * as Yup from 'yup';
import TextFieldInput from "./TextFieldInput";
import Container from "@mui/material/Container";
import './style.css';
import {Translation} from "react-i18next";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    surname: Yup.string()
        .required('Surname is required'),
    email: Yup.string()
        .email()
        .required(),
    password: Yup.string()
        .required('Password is required'),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must be the same')
});
export default () => (
    <Formik initialValues={{
        name: '',
        surname: '',
        email: '',
        password: '',
        repeatPassword: ''
    }}
            onSubmit={(values, helpers) => {
                helpers.setSubmitting(true);
                setTimeout(() => {
                    helpers.setSubmitting(false);
                }, 5000);
            }}
            validationSchema={validationSchema}>
        {props => (
            <Translation>
                {(t)=>
            <Container maxWidth="sm" sx={{ minHeight: 500}}>
                <Paper elevation={3} sx={{p: 1}}>
                    <Form className="item-form ">
                        <TextFieldInput error={props.touched.name && !!props.errors.name}
                                        fieldName="name"
                                        label={t('user:name')}
                                        placeholder="Type name..."/>
                        <TextFieldInput error={props.touched.surname && !!props.errors.surname}
                                        fieldName="surname"
                                        label={t('user:surname')}
                                        placeholder="Type surname..."/>
                        <TextFieldInput error={props.touched.email && !!props.errors.email}
                                        fieldName="email"
                                        label={t('user:email')}
                                        placeholder="Type email..."/>
                        <TextFieldInput error={props.touched.password && !!props.errors.password}
                                        fieldName="password"
                                        label={t('user:password')}
                                        placeholder="Type password..."
                                        type="password"/>
                        <TextFieldInput error={props.touched.repeatPassword && !!props.errors.repeatPassword}
                                        fieldName="repeatPassword"
                                        label={t('user:repeatPassword')}
                                        placeholder="Repeat password..."
                                        type="password"/>
                        {
                            props.isSubmitting ? <CircularProgress/> : <Button variant="outlined" type="submit">{t('user:submit')}</Button>
                        }
                    </Form>
                </Paper>
            </Container>
                }
            </Translation>
        )}
    </Formik>
)