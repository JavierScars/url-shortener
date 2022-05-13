import { Box, Spinner } from "@chakra-ui/react";
import { FC } from "react";

interface LoadingSpinnerProps {
    isLoading: boolean;
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ isLoading }) => {
    return isLoading ? (
        <Box data-testid="loading-spinner">
            <Spinner
                thickness='5px'
                speed='0.65s'
                emptyColor='gray.200'
                color='cyan.500'
                size='xl'
            />
        </Box>
    ) : null;
}