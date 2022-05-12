import { Box, Button } from "@chakra-ui/react";
import { Header } from "../../components/Header/Header";
import { Input } from '@chakra-ui/react'
import { useState } from "react";

export const Home = () => {
    const [url, setUrl] = useState('');
    return (
        <Box display="flex" flexDir="column" minH="100vh">
            <Header />
            <Box as="main" flex="1" p="2rem" flexGrow={1} justifyContent="center" margin="auto" alignItems="center" display="flex" flexDir="column" maxW="800px" marginBottom="5rem">
                <Box as="p" fontSize="1.5rem" marginBottom="1rem">Enter a valid URL in the input to get a short URL.</Box>
                <Input placeholder="www.example.com" size="lg" value={url} onChange={(e) => setUrl(e.target.value)} />
                <Button marginTop="1rem" colorScheme="cyan" color="white">MAKE IT SHORT!</Button>
            </Box>
        </Box>
    );
}
