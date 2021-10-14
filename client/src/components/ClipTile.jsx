import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import {likeClip} from '../requests.js';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxHeight: '20vh',
});

function ClipTile({clip, from = 'else', func, name}) {

  function handleClick() {
    func(clip);
  }
  function handleLike() {
    likeClip(clip.id, name)
    .then(() => {console.log('liked')})
    .catch(err => {console.log('failed to like', err)})
  }

  return (
    <Paper sx={{ p: 2, margin: 'auto', flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
            <Img alt="complex" src={clip.thumbnail_url} />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h5" component="div">
                {clip.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {clip.broadcaster_name}
              </Typography>
            </Grid>
            <Grid item>
              <Button variant='outlined' href={clip.url}>
                View Clip on Twitch
              </Button>
              {from === 'find' &&
                <Button variant='outlined' onClick={handleClick}>
                  Add Clip
                </Button>
              }
              {from === 'else' &&
                <Button variant='outlined' onClick={handleLike}>
                  Like({clip.likes})
                </Button>
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ClipTile;
