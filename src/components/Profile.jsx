import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  VStack,
  HStack
} from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik';
import styled from "@emotion/styled";
import { useAuth } from "./contexts/authContext";
import { Link, useNavigate } from "react-router-dom";
import CustomAlert from "./CustomAlert";

export default function SingUpForm() {
  const value = useAuth();
  const navigate = useNavigate();
  const [editingEmail, setEditingEmail] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const passwordRef = React.useRef();
  const newEmailRef = React.useRef();

  async function handleLogOut() {
    try {
      await value.logOut();
      console.log('logged out');
      navigate('/');
    } catch (error) {
      setError('Something went wrong. Please try again later');
    }
  }

  function renderButtons() {
    if (editingEmail) {
      return (
        <HStack>
            <Button colorScheme="green" variant="solid" onClick={handleEditEmail}>Update Email</Button>
          </HStack>
      )
    } else {
      return (
        <HStack>
          <Button colorScheme="blue" variant="solid" onClick={handleLogOut}>Log Out</Button>
          <Button colorScheme="red" variant="solid" onClick={handleLogOut}>Delete Account</Button>
        </HStack>
      )
    }
  }

  async function handleEditEmail() {
    if(passwordRef.current.value === '') {
      setError('Please enter your password');
      setMessage('');
      setEditingEmail(false);
      return
    }
    if (newEmailRef.current.value !== value.currentUser.email) {
      try {
        setError('');
        await value.updateUserEmail(newEmailRef.current.value, passwordRef.current.value);
        setMessage('Email updated');
        setEditingEmail(false);
      } catch (error) {
        setMessage('');
        if (error.code === 'auth/wrong-password') {
          setError('Wrong password');
        } else {
          setError('Something went wrong. Please try again later');
        }
      }
    } else {
      setError('New email is the same as the old one');
      setEditingEmail(false);
    }
  }

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

  return (
    <MainContainer>
      <FormContainer>
        <VStack spacing={4}>
          <Title>Profile</Title>
          {message && <CustomAlert status="success" title={message} />}
          {error && <CustomAlert status="error" title={error} />}
          <Formik
            initialValues={{ email: value.currentUser.email, password: '' }}
          >
            {(props) => (
              <Form>
                <Field name='email' validate={validateEmail}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                      <FormLabel htmlFor='email'>Email</FormLabel>
                      <HStack spacing={3}>
                        <Input {...field} id='email' placeholder='Email' type="email" ref={newEmailRef} disabled={!editingEmail} />
                        <Button onClick={() => setEditingEmail(!editingEmail)}>{editingEmail ? 'Cancel' : 'Edit'}</Button>
                      </HStack>
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name='password'>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                      <FormLabel htmlFor='password'>Current Password</FormLabel>
                      <HStack spacing={3}>
                        <Input {...field} id='password' placeholder='Current Password' type="text" ref={passwordRef} disabled={!editingEmail} />
                      </HStack>

                      <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Form>

            )}
          </Formik>
          {renderButtons()}
        </VStack>
        <HaveAccount><Link to="/">Back to HomePage</Link></HaveAccount>
      </FormContainer>
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

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-align: center;
  padding: 1rem;
  `;

const HaveAccount = styled.div`
  font-size: 1rem;
  padding: 1rem;
  color: white;
  text-align: center;
  `;