import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import RootLayout from './Pages/RootLayout/RootLayout';
import PostDetails from './components/PostDetails/PostDetails';

const user = JSON.parse(localStorage.getItem('profile'));

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<RootLayout />}>
    <Route path='/' element={<Navigate to="/posts" />}></Route>
    <Route path='/posts' exact element={<Home />}></Route>
    <Route path='/posts/search' exact element={<Home />}></Route>
    <Route path='/posts/:id' element={<PostDetails />}></Route>
    <Route path='/auth' element={!user ? <Auth /> : <Navigate to="/posts" />}></Route>
  </Route>
));

function App() {
  

  return (  
    <GoogleOAuthProvider clientId="671638482179-7spbg28vk3rbfb6cojs4s8buabm5knok.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}

export default App;
