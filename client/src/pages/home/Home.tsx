import { Box, Button } from "@chakra-ui/react";
import { Header } from "../../components/Header/Header";
import { Input } from '@chakra-ui/react'
import { useState, ChangeEventHandler, MouseEventHandler } from "react";
import { isValidURL } from "../../utils/urlUtils";
import { LoadingSpinner } from "../../components/Spinner/Spinner";
import { CopyIcon } from '@chakra-ui/icons'
import { getHash } from "../../services/urlShortener";
import { useToast } from '@chakra-ui/react'

export const Home = () => {
    const toast = useToast();
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [shortUrl, setShortUrl] = useState('');

    const handleUrlChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setUrl(e.target.value);
    }

    const handleCreateShortenUrl: MouseEventHandler<HTMLButtonElement> = async () => {
        setIsLoading(true);
        const shortenerHash = await getHash(url);
        setUrl('');
        setIsLoading(false)
        setShortUrl(`${process.env.REACT_APP_CLIENT_BASE_URL}/${shortenerHash}`);
    }

    const resetShortenUrl: MouseEventHandler<HTMLButtonElement> = () => {
        setShortUrl('')
    }

    const handleCopyUrl: MouseEventHandler<HTMLButtonElement> = () => {
        navigator.clipboard.writeText(shortUrl);
        toast({
            title: 'Copied to clipboard',
            description: 'You can now paste the URL in your browser',
            status: 'info',
            duration: 5000,
            isClosable: true,
            position: 'bottom'

        });
    }


    return (
        <Box display="flex" flexDir="column" minH="100vh">
            <Header />
            <Box as="main" flex="1" flexGrow={1} justifyContent="center" margin="auto" alignItems="center" display="flex" flexDir="column" maxW="800px" marginBottom="5rem">
                <LoadingSpinner isLoading={isLoading} />
                {!isLoading &&
                    (
                        !shortUrl ?
                            <>
                                <Box as="p" textAlign="center" fontSize="1.5rem" margin="1rem">Enter a valid URL in the input to get a short URL.</Box>
                                <Input placeholder="www.example.com" size="lg" value={url} onChange={handleUrlChange} maxW="400px" w="90vw" />
                                <Button onClick={handleCreateShortenUrl} marginTop="1rem" colorScheme="cyan" color="white" disabled={!isValidURL(url)}>MAKE IT SHORT!</Button>
                            </>
                            :
                            <>
                                <Box as="p" textAlign="center" fontSize="1.5rem" marginBottom="1rem">Here is your shorten URL!</Box>
                                <Box display="flex" flexDir="row" position="relative" minW="300px">
                                    <Input disabled size="lg" value={shortUrl} paddingRight="2rem" _disabled={{ cursor: 'default' }} />
                                    <Button onClick={handleCopyUrl} colorScheme="cyan" color="white" position="absolute" right={0} borderLeftRadius={0} height="100%">
                                        <CopyIcon />
                                    </Button>
                                </Box>
                                <Button onClick={resetShortenUrl} marginTop="1rem" colorScheme="cyan" color="white">Shorten another url</Button>
                            </>
                    )
                }
            </Box>
        </Box>
    );
}
