import { AppBar, Box, Container, 
    IconButton, Menu, MenuItem, Toolbar, Typography, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu'
import { Outlet, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { Chip } from '@mui/material';

// you need to add conditional rendering to menu which is displayed in xs windows.

const pages = ['SignUp to Drive', 'Login'];

const mdTheme = createTheme();
function MainNavBar() {
    const [pathTo, setPathTo] = useState("/");
    const navigate = useNavigate();
    useEffect(
        () => {navigate(pathTo)
    },[pathTo])
    function HandlePath(val) {
        setPathTo(val)
    }

    return (
        <Routes>
            <Route path='/' element={<NavBar />}>
                <Route path='/' element={<Landing onClick={(value) => HandlePath(value)}/>} />
                <Route path='/login' element={<Login onClick={(value) => HandlePath(value)}/>} />
                <Route path='/register' element={<Register onClick={(value) => HandlePath(value)}/>} />
                <Route path='/dashboard' element={<DashB onClick={(value) => HandlePath(value)}/>} />
            </Route>
        </Routes>
    )
}

function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };

      
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
                            >
                                Uber
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
                                Uber
                            </Typography>
                            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                                {<Outlet />}
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
        </ThemeProvider>
    );
}
function Landing(props) {
    return (
        <Stack spacing={1} alignItems="center">
            <Stack direction="row" spacing={1}>
                <Chip label="Sign Up to Drive" color='primary' onClick={() => props.onClick("/register")} clickable/>
                <Chip label="Login" color='primary' onClick={() => props.onClick("/login")} clickable/>
            </Stack>
        </Stack> 
    )
}

function Login(props) {
    return(
        <Stack spacing={1} alignItems="center">
            <Stack direction="row" spacing={1}>
                <Chip label="Don't have an account? Sign Up Here" color='primary' onClick={() => props.onClick("/register")}/>
            </Stack>
        </Stack>
    )
}
function Register(props) {
    return(
        <Stack spacing={1} alignItems="center">
            <Stack direction="row" spacing={1}>
                <Chip label="Already have an account? Login Here" color='primary' onClick={() => props.onClick("/login")}/>
            </Stack>
        </Stack>
    )
}

function DashB() {

}

export default MainNavBar;