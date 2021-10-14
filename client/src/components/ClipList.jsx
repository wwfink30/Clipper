import React, {useEffect, useState} from 'react';
import ClipTile from './Cliptile.jsx';

function ClipList(props) {
  const [clips, setClips] = useState([]);
  useEffect(()=>{setClips(props.clips)},[props.clips]);
  return(
    clips.map((clip, key) => <ClipTile clip={clip} key={key} from={props.from} func={props.func} name={props.name}/>)
  )
}
export default ClipList;