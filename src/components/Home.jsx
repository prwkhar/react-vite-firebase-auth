import React from 'react'
import { useAuth } from "./contexts/authContext";
import { Link, useNavigate } from "react-router-dom";
import {
    Button,
    Box,
    VStack,
    HStack
} from '@chakra-ui/react'
import styled from '@emotion/styled';

export default function Home() {
    const value = useAuth();
    return (
        <MainContainer>
            <Container>
            <VStack spacing={4}>
                <h1>Home</h1>
                <Box m={3} p={2}>
                    {RenderButtons()}
                </Box>
                {value.currentUser ? <HaveAccount><Link to="/dashboard">Go to Dashboard</Link></HaveAccount> : ''}
            </VStack>
            </Container>
        </MainContainer>
    )
}

const RenderButtons = () => {
    const value = useAuth();
    const navigate = useNavigate();

    async function handleLogOut() {
        try {
            await value.logOut();
            console.log('logged out');
        } catch (error) {
            console.log(error);
        }
    }
    if (value.currentUser) {
        return (
            <HStack spacing={5}>
                <Button variantColor="blue" variant="outline" onClick={() => navigate('/profile')}>Profile</Button>
                <Button variantColor="blue" variant="outline" onClick={handleLogOut}>Log Out</Button>
            </HStack>
        )
    }
    else {
        return (
            <HStack spacing={5}>
                <Button variantColor="blue" variant="outline" onClick={() => navigate('/login') }>Login</Button>
                <Button variantColor="blue" variant="outline" onClick={() => navigate('/signup') }>Sign Up</Button>
            </HStack>
        )
    }
}

const MainContainer = styled.div`
display: flex;
flex-direction: column;
padding: 2rem;
min-height: 80vh;
align-items: center;
justify-content: center;
overflow: hidden;
  `;

  const Container = styled.div`
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

  const HaveAccount = styled.div`
  font-size: 1rem;
  padding: 1rem;
  color: white;
  text-align: center;
  `;