import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'

const CustomAlert = ({ title, description, status }) => (
    <Alert status={status}>
        <AlertIcon />
        <AlertTitle mr={3}>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
    </Alert>
)

export default CustomAlert