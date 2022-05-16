import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Router } from './router/Router';
import { Box, ChakraProvider } from '@chakra-ui/react'
import { UserContextProvider } from './context/userContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ChakraProvider>
    <UserContextProvider>
      <Box minH="100vh" minW="100vw">
        <Router />
      </Box>
    </UserContextProvider>
  </ChakraProvider>
);

reportWebVitals();
