import React, {useEffect, useState} from 'react';
import ClipList from './ClipList.jsx';
import {getClips} from '../requests.js';

function Feed(props) {
  const [clips, setClips] = useState([]);
  useEffect(() => {
    getClips().then(({data}) => {console.log(data);setClips(data)}).catch(err=>{console.log(err)})
  }, [props])
  return (
    <ClipList clips={clips} name={props.name}/>
  )
}

export default Feed;