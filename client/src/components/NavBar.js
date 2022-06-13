import { AppBar, Box, Container, Button,
    IconButton, Menu, MenuItem, Toolbar, Typography, createTheme, ThemeProvider, CssBaseline, ListItemIcon } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu'
import { useLocation, useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { Avatar, Chip } from '@mui/material';
import { Logout } from '@mui/icons-material';

const pages = ['SignUp to Drive', 'Login'];

const mdTheme = createTheme();

function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [conditionalComp, setConditionalComp] = useState(null)
    
    const [anchorElPro, setAnchorElPro] = useState(null);
    const open = Boolean(anchorElPro);

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };
      
    const handleClick = (event) => {
        console.log("gag")
        setAnchorElPro(event.currentTarget);
        console.log(anchorElPro)
    }
    const handleClose = () => {
        setAnchorElPro(null);
    }

    useEffect(
        () => {
            if(location.pathname === "/"){
                setConditionalComp(
                    (
                        <Stack spacing={1} alignItems="center">
                            <Stack direction="row" spacing={1}>
                                <Chip label="Sign Up to Drive" color='primary' onClick={() => navigate('/register') } clickable/>
                                <Chip label="Login" color='primary' onClick={() => navigate('/login') } clickable/>
                            </Stack>
                        </Stack>
                    )
                )
            }
            else if(location.pathname === "/login"){
                setConditionalComp(
                    (
                        <Stack spacing={1} alignItems="center">
                            <Stack direction="row" spacing={1}>
                                <Chip label="Don't have an account? Sign Up Here" color='primary' onClick={() => navigate('/register')} clickable/>
                            </Stack>
                        </Stack>
                    )
                )
            }
            else if(location.pathname === "/register"){
                setConditionalComp
                    (
                        <Stack spacing={1} alignItems="center">
                            <Stack direction="row" spacing={1}>
                                <Chip label="Already have an account? Login Here" color='primary' onClick={() => navigate('/login') } clickable/>
                            </Stack>
                        </Stack>
                    )
            }
            // else if(location.pathname === "/dashboard"){
            //     setConditionalComp
            //     (
            //         <Box sx={{ display: 'flex',}}>
            //             <IconButton
            //                 aria-controls='account-menu'
            //                 aria-haspopup="true"
            //                 onClick={handleClick}
            //                 size="large"
            //                 sx={{ ml:2 }}
            //             >
            //                 {/* <Stack spacing={1} alignItems="center">
            //                     <Stack direction="row" spacing={1}>
            //                         <Chip
            //                             avatar={<Avatar alt="Driver Photo" />}
            //                             // src={location.state.user.profile_photo}/>}
            //                             // label={location.state.user.first_name + " " + location.state.user.last_name}
            //                             label="HOKJO"
            //                         />
            //                     </Stack>
            //                 </Stack> */}
            //                 <MenuIcon />
            //             </IconButton>
            //             <Menu
            //                 id='account-menu'
            //                 anchorEl={anchorElPro}
            //                 anchorOrigin={{
            //                     vertical: 'bottom',
            //                     horizontal: 'left',
            //                 }}
            //                 keepMounted
            //                 transformOrigin={{
            //                     vertical: 'top',
            //                     horizontal: 'left',
            //                 }}
            //                 open={open}
            //                 onClose={handleClose}
            //                 sx={{
            //                         display: { xs: 'block', md: 'none' },
            //                     }}
            //                 >
            //                 <MenuItem>
            //                     <Avatar /> My Account
            //                 </MenuItem>
            //                 <MenuItem
            //                     onClick={() =>console.log("heloo")}
            //                 >
            //                     <ListItemIcon>
            //                         <Logout fontSize='small' />
            //                     </ListItemIcon>
            //                     Logout
            //                 </MenuItem>
            //             </Menu>
            //         </Box>
            //     )
            // }
        },[location.pathname]
    )
    
      
    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline />
                <AppBar position='static'>
                    <Container maxWidth="xl">
                        <Toolbar>
                            <Typography
                                variant='h6'
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: {xs: 'none', md: 'flex'} }}
                                onClick={() => { navigate('/')}}
                            >
                                Real Time Taxi App
                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'} }}>
                                <IconButton
                                    size="large"
                                    aria-label='drivers option'
                                    aria-controls='menu-appbar'
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    {pages.map((page) => (
                                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <Typography
                                variant='h6'
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                                
                            >
                                Real Time Taxi App
                            </Typography>
                            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                                {location.pathname === "/dashboard" || location.pathname === "/editProfile/:id" ? 
                                (
                                    <Box sx={{ flexGrow: 0,  }}>
                                <IconButton
                                    aria-controls='account-menu'
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                    size="large"
                                    sx={{ ml:2 }}
                                >
                                    <Stack spacing={1} alignItems="center">
                                        <Stack direction="row" spacing={1}>
                                            <Chip
                                                avatar={<Avatar alt="Driver Photo" src={location.state.user.drivers_photo}/>}
                                                label={location.state.user.first_name + " " + location.state.user.last_name}
                                            />
                                            {/* {console.log(props.location.state.user.profile_photo)} */}
                                        </Stack>
                                    </Stack>
                                </IconButton>
                                <Menu
                                    id="account-menu"
                                    anchorEl={anchorElPro}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                                    open={open}
                                    onClose={handleClose}
                                    sx={{
                                            display: { xs: 'block', md: 'block' },
                                        }}
                                    >
                                    <MenuItem
                                        onClick={() => navigate(`/editProfile/${location.state.user._id}`, {state: {userData: location.state.user}})}
                                    >
                                        <Avatar sx={{ mr: 2}}/>  My Account
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => console.log("heloo")}
                                    >
                                        <ListItemIcon sx={{ mr: 2}}>
                                            <Logout fontSize='small' sx={{ml: 2}}/>
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </Box>
                                ) : 
                                (conditionalComp)}
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
        </ThemeProvider>
    );
}

export default NavBar;