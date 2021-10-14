import Axios from 'axios';

export function clipLink (clipID) {
  return Axios.get('/clipid', {
    params:{id: clipID}
  })
}

export function findClip ({game, streamer}) {
  if (game) {
    return Axios.get('/gameid', {params: {name: game}})
        .then((data) => {
          let id = data.data.data[0].id
          return Axios.get('/clipid', {params: {game_id: id}})
        })
  } else {
    return Axios.get('/broadid', {params: {name: streamer}})
        .then((data) => {
          let id = data.data.data[0].id
          return Axios.get('/clipid', {params: {broadcaster_id: id}})
        })
  }
}

export function addClip (clip, user) {
  return Axios.post('/addclip', {clip, name: user});
}

export function loginRequest (user) {
  return Axios.get('/login', {
    params: {name: user}
  })
}
export function signupRequest (user) {
  return Axios.post('/signup', {name: user})
}

export async function getClip (id) {
  return clip = await Axios.get('/getclip', {params: {id}})
}

export async function getClips (sort) {
  return await Axios.get('/getclips', {params: {sort}})
}

export async function userClips(name) {
  return await Axios.get('/userclips', {params: {name}})
}

export async function likedClips(name) {
  return await Axios.get('/likedclips', {params: {name}})
}

export async function likeClip(clipid, name) {
  return await Axios.put('/likeclip', {clipid, name})
}
