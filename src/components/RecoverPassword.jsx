import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button
} from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik';
import styled from "@emotion/styled";
import { useAuth } from "./contexts/authContext";
import { Link } from "react-router-dom";
import CustomAlert from "./CustomAlert";

export default function RecoverPassword() {
    const value = useAuth()
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

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

    async function handleSubmit(values, { setSubmitting }) {
        try {
            await value.resetPassword(values.email)
            setMessage('Check your email for a reset link')
            setSubmitting(false);
        } catch (error) {
            if(error.code === 'auth/user-not-found') {
                setError('User not found. Try signing up or using another email')
            } else if (error.code === 'auth/invalid-email') {
                setError('Invalid email')
            } else if (error.code === 'auth/network-request-failed') {
                setError('Network error. Please try again later')
            } else {
                setError('Something went wrong. Please try again later')
            }
        }
    }

    return (
        <MainContainer>
            <Formik
                initialValues={{ email: ''}}
                onSubmit={handleSubmit}
            >
                {(props) => (
                    <FormContainer>
                        <Title>Recover your password</Title>
                        {message && <CustomAlert status="success" title={message} />}
                        {error && <CustomAlert status="error" title={error} />}
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
                            <Aligned>
                                <Button
                                    mt={4}
                                    colorScheme='teal'
                                    isLoading={props.isSubmitting}
                                    type='submit'
                                >
                                    Reset Password
                                </Button>
                            </Aligned>
                        </Form>
                        <NeedAccount><Link to="/login">Login</Link></NeedAccount>

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