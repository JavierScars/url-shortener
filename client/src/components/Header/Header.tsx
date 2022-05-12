import { Box, Link } from "@chakra-ui/react";

export const Header = () => {
    return (
        <Box as="header" bgColor="cyan.500" color="white" data-testid="header-component">
            <Box padding="2rem 1rem">
                <Link fontWeight="bold" href="/" _hover={{ textDecoration: "none" }} fontSize="2rem">URL-<Box as="span" fontStyle="italic">Shortener</Box></Link>
                <Box as="p" fontSize="1rem" marginLeft="1rem">
                    URL-Shortener is a simple URL shortener that allows you to create a short URL from a long URL.
                </Box>
            </Box>
        </Box >
    );
}
