import React from "react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
} from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik';
import styled from "@emotion/styled";
import { useAuth } from "./contexts/authContext";
import { Link, useNavigate } from "react-router-dom";

export default function LogInForm() {
    const value = useAuth()
    const passwordRef = React.useRef();
    const navigate = useNavigate();

    function validateEmail(value) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let error
        if (!value) {
            error = 'Email is required'
        } else if (!re.test(value)) {
            error = "You need a valid email address."
        }
        return error
    }

    function validatePassword(value) {
        let re = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
        let error
        if (!value) {
            error = 'Password is required'
        } else if (!re.test(value)) {
            error = "Password must contain at least 8 characters, 1 uppercase, 1 lowercase and 1 number."
        }
        return error
    }

    async function handleSubmit(values, { setSubmitting }) {
        try {
            await value.logIn(values.email, values.password)
            navigate('/');
            setSubmitting(false);
            console.log("Logged in")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <MainContainer>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={handleSubmit}
            >
                {(props) => (
                    <FormContainer>
                        <Title>Log In</Title>
                        <Form>
                            <Field name='email' validate={validateEmail}>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                                        <FormLabel htmlFor='email'>Email</FormLabel>
                                        <Input {...field} id='email' placeholder='Email' type="email" />
                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='password' validate={validatePassword}>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                                        <FormLabel htmlFor='password'>Password</FormLabel>
                                        <Input {...field} id='password' placeholder='Password' type="password" ref={passwordRef} />
                                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Aligned>
                                <Button
                                    mt={4}
                                    colorScheme='teal'
                                    isLoading={props.isSubmitting}
                                    type='submit'
                                >
                                    Log In
                                </Button>
                            </Aligned>
                        </Form>
                        <NeedAccount>Forgot your password? <Link to="/recover-password">Recover it here</Link></NeedAccount>
                        
                    </FormContainer>
                )}
            </Formik>
            <NeedAccount>Need an account? <Link to="/signup">Sign Up!</Link></NeedAccount>
        </MainContainer>
    )
}

const FormContainer = styled.div`
padding: 5rem;
width: 100%;
max-width: 600px;
margin: 0 auto;
background-color: black;
color: white;
border-radius: 10px;
& input {
  color: white;
}
& input::placeholder {
  color: gray;
}
  `;

const MainContainer = styled.div`
display: flex;
flex-direction: column;
padding: 2rem;
min-height: 80vh;
align-items: center;
justify-content: center;
overflow: hidden;
  `;

const Aligned = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  `;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-align: center;
  padding: 1rem;
  `;

const NeedAccount = styled.div`
    font-size: 1rem;
    padding: 1rem;
    color: white;
    text-align: center;
    `;