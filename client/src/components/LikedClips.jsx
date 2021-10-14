import ClipList from './ClipList.jsx';
import React, {useState, useEffect} from 'react';
import {likedClips} from '../requests.js';
function LikedClips(props) {
  const [clips, setClips] = useState([]);
  useEffect(() => {
    if(props.name !== null){
    likedClips(props.name)
    .then(({data}) => {
      console.log(data)
      setClips(data)})
    .catch(err=>{console.log(err)})
    }
  }, [props.name])
  return (
    <ClipList clips={clips}/>
  )
}
export default LikedClips;