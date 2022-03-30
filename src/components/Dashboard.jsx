import React from 'react'
import { Box, Button, VStack, HStack, Center } from '@chakra-ui/react'
import styled from '@emotion/styled'

export default function Dashboard() {
    return (
        <MainAlignedContainer>
            <Center>
                <Title>Dashboard</Title>
            </Center>
        </MainAlignedContainer>
    )
}


const MainAlignedContainer = styled.div`
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