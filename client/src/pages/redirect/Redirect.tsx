import { Box, Button, Link } from "@chakra-ui/react";
import { Header } from "../../components/Header/Header";
import { useState, useEffect } from "react";
import { LoadingSpinner } from "../../components/Spinner/Spinner";
import { useParams } from "react-router-dom";
import { getGoUrl } from "../../services/urlShortener";


export const Redirect = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { hash = '', username = '', customCode = '' } = useParams();
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setTimeout(async () => {
            const url = await getGoUrl({
                username,
                hash,
                customCode
            });

            if (url) {
                return window.location.href = url;
            }
            setIsLoading(false);
            setHasError(true);

        }, 1000);
    }, [hash]);

    return (
        <Box display="flex" flexDir="column" minH="100vh">
            <Header />
            <Box as="main" flex="1" p="2rem" flexGrow={1} justifyContent="center" margin="auto" alignItems="center" display="flex" flexDir="column" maxW="800px" marginBottom="5rem">
                {isLoading &&
                    <>
                        <Box as="p" textAlign="center" fontSize="1.5rem" marginBottom="1rem">You will be redirected in a moment. Please wait...</Box>
                        <LoadingSpinner isLoading={isLoading} />
                    </>
                }

                {hasError &&
                    <>
                        <Box as="p" textAlign="center" fontSize="1.5rem" marginBottom="1rem">We cannot find any url with this shortcode.</Box>
                        <Link href="/">
                            <Button colorScheme="cyan" color="white">CREATE A SHORT LINK</Button>
                        </Link>
                    </>
                }
            </Box>
        </Box>
    );
}
