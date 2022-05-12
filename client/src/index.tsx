import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route } from 'react-router-dom';
import { Home } from './pages/home/Home';
import reportWebVitals from './reportWebVitals';
import { Router } from './router/Router';
import { Box, ChakraProvider } from '@chakra-ui/react'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Box minH="100vh" minW="100vw">
        <Router>
          <Route path='/' element={<Home />} />
        </Router>
      </Box>
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
