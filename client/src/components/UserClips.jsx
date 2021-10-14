import ClipList from './ClipList.jsx';
import React, {useState, useEffect} from 'react';
import {userClips} from '../requests.js';
function UserClips(props) {
  const [clips, setClips] = useState([]);
  useEffect(() => {
    if(props.name !== null){
    userClips(props.name)
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
export default UserClips;