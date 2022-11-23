import { Container } from '@material-ui/core';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const RootLayout = () => {
  return (
    <Container maxwidth="xl">
        <Navbar />
        <Outlet />
    </Container>
  )
}

export default RootLayout