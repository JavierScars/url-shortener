import { useToast as chakraUseToast } from "@chakra-ui/react";

export const useToast = () => {
    return process.env.NODE_ENV === 'test' ? () => { } : chakraUseToast();
}
