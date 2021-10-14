import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import ClipList from './ClipList.jsx';
import {clipLink, findClip} from '../requests.js';



function FindClip(props) {
  const [clips, setClips] = useState([]);
  const [findWith, setFindWith] = useState('url');
  const handleSubmit = () => {
    let search = document.getElementById('search').value;
    if(findWith === 'url') {
      search = search.split('/');
      let id = search.pop();
      clipLink(id)
      .then(({data}) => {
        setClips(data);
      })
      .catch(err=>{
        console.log('failed to find clip', err)
      })
    } else if (findWith === 'broadcaster'){
      findClip({streamer: search})
      .then(({data}) => {
        setClips(data);
      })
      .catch(err => {console.log(err)})
    } else {
      findClip({game: search})
      .then(({data}) => {
        setClips(data);
      })
      .catch(err => {console.log(err)})
    }
  }
  const handleChange = (e) => {
    setFindWith(e.target.value);
  }



  return (
    <div>
      <FormControl fullWidth>
      <Select
          id="find-criteria"
          value={findWith}
          onChange={handleChange}
        >
          <MenuItem value="url">Link</MenuItem>
          <MenuItem value="broadcaster">Streamer</MenuItem>
          <MenuItem value="game">Game</MenuItem>
        </Select>
        <TextField id='search' label='Enter Exact Search'/>
        <Button onClick={handleSubmit}>Search</Button>
      </FormControl>
      <ClipList clips={clips} from='find' func={props.addclip}/>
    </div>
  )
}

export default FindClip;