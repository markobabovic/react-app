import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import decode from 'jwt-decode';

import useStyles from './styles';
import memories from '../../images/memories.png'
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: LOGOUT });

        navigate('/auth');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.jwt;

        if (token) {
            const decodedToken = decode(token);
      
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="relative" color='inherit'>
            <div className={classes.brandContainer}>
                <Link element={Link} to='/'><Typography className={classes.heading} variant="h2" align="center">Memories</Typography></Link>
                <img className={classes.image} src={memories} alt={memories} height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}> 
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Link element={Link} to='/auth'><Button variant="contained" color="primary">Sign In</Button></Link>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar