import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ClipTile from './Cliptile.jsx';
import FindClip from './FindClip.jsx';
import UserClips from './UserClips.jsx';
import Feed from './Feed.jsx';
import LikedClips from './LikedClips.jsx';
import { addClip, loginRequest, signupRequest } from '../requests.js'



function App() {
  const [name, setName] = useState(null);
  const [login, setLogin] = useState(false);
  const [nav, setNav] = useState(false);
  const [page, setPage] = useState('Your Clips');
  const drawerWidth = '33vw';

  useEffect(() => {}, [page])

  function addclip(clip) {
    if (name === null) {
      window.alert('Please Login');
    } else {
      addClip(clip, name);
    }
  }

  const handleClick = () => {
    setLogin(true);
  }
  const handleCancel = () => {
    setLogin(false);
  }
  const handleLogin = (e) => {
    let user = document.getElementById('user').value;
    if (user) {
      loginRequest(user)
        .then(({ data }) => {
          setLogin(false);
          setName(user);
        })
        .catch(err => { console.log(err) })
    }
  }
  const handleSignUp = () => {
    let name = document.getElementById('user').value;
    if (name) {
      signupRequest(name)
        .then(({ data }) => {
          if(data){
          setLogin(false);
          setName(name);
          }
        })
        .catch(err => { console.log(err) })
    }
  }
  const handleMenuClick = () => {
    setNav(true);
  }
  const handleDrawerClose = () => {
    setNav(false);
  }

  function pageSelect(e) {
    setPage(e.target.lastChild.data);
    setNav(false);
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Clipper
          </Typography>
          <Button color="inherit" onClick={handleClick}>Login</Button>
          <Dialog open={login} onClose={handleCancel}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="user"
                label="Username"
                type="text"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleLogin}>Login</Button>
              <Button onClick={handleSignUp}>Signup</Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: '33vw',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '33vw',
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={nav}
      >
        <Grid container justifyContent="space-between" alignItems='center' p={2}>
          <Grid item >
            <Typography variant="h6">
              Clipper
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Divider />
        <List>
          {['Find Clip', 'Your Clips', 'Feed', 'Liked Clips'].map((text, index) => (
            <ListItem button key={text} value={text} onClick={pageSelect}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {page === 'Find Clip' && <FindClip addclip={addclip} />}
      {page === 'Your Clips' && <UserClips name={name}/>}
      {page === 'Feed' && <Feed name={name}/>}
      {page === 'Liked Clips' && <LikedClips name={name}/>}

    </div>
  );
}

export default App;




