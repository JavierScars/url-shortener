import ReactDOM from 'react-dom/client';
import { Route, Navigate } from 'react-router-dom';
import { Home } from './pages/home/Home';
import reportWebVitals from './reportWebVitals';
import { Router } from './router/Router';
import { Box, ChakraProvider } from '@chakra-ui/react'
import { Redirect } from './pages/redirect/Redirect';
import { Login } from './pages/login/Login';
import { UserContextProvider } from './context/userContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ChakraProvider>
    <UserContextProvider>
      <Box minH="100vh" minW="100vw">
        <Router>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/:hash' element={<Redirect />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Router>
      </Box>
    </UserContextProvider>
  </ChakraProvider>
);

reportWebVitals();
