import React, {useEffect, useState} from 'react';
import ClipList from './ClipList.jsx';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {getClips} from '../requests.js';

function Feed(props) {
  const [clips, setClips] = useState([]);
  const [sort, setSort] = useState('likes');
  useEffect(() => {
    getClips(sort).then(({data}) => {console.log(data);setClips(data)}).catch(err=>{console.log(err)})
  }, [sort]);
  function handleChange(e) {
    setSort(e.target.value);
  }
  return (
    <div>
      <Select
          id="sort-by"
          value={sort}
          onChange={handleChange}
        >
          <MenuItem value="likes">Likes</MenuItem>
          <MenuItem value="views">Views</MenuItem>
        </Select>
      <ClipList clips={clips} name={props.name}/>
    </div>
  )
}

export default Feed;