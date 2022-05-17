import { useToast as chakraUseToast } from "@chakra-ui/react";

// use custom hook so it wont crash on test enviroment
export const useToast = () => {
    return process.env.NODE_ENV === 'test' ? () => { } : chakraUseToast();
}
