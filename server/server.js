const express = require('express');
const Axios = require('axios');
const path = require('path');
const db = require('../database/connection.js');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('./client/dist'));

app.get('/broadid', (req, res) => {
  Axios({
    method: 'GET',
    url: 'https://api.twitch.tv/helix/users',
    params: {
      login: req.query.name
    },
    headers: {
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Client-ID': 'e595nbnp8sh2cvbm67n2mzsy82uut6',
      'Authorization': 'Bearer wsybecd1afbppqmnjvvhh8p225j4w7'
    }
  })
  .then(({data}) => {
    res.send(data);
  })
  .catch(err=>{
    console.log('failed to get clips ->', err);
    res.status(502).send(err);
  });
});

app.get('/gameid', (req, res) => {
  Axios({
    method: 'GET',
    url: 'https://api.twitch.tv/helix/games',
    params: {
      name: req.query.name
    },
    headers: {
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Client-ID': 'e595nbnp8sh2cvbm67n2mzsy82uut6',
      'Authorization': 'Bearer wsybecd1afbppqmnjvvhh8p225j4w7'
    }
  })
  .then(({data}) => {
    res.send(data);
  })
  .catch(err=>{
    console.log('failed to get clips ->', err);
    res.status(502).send(err);
  });
});

app.get('/clipid', (req, res) => {
  Axios({
    method: 'GET',
    url: 'https://api.twitch.tv/helix/clips',
    params: {
      id: req.query.id,
      broadcaster_id: req.query.broadcaster_id,
      game_id: req.query.game_id
    },
    headers: {
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Client-ID': 'e595nbnp8sh2cvbm67n2mzsy82uut6',
      'Authorization': 'Bearer wsybecd1afbppqmnjvvhh8p225j4w7'
    }
  })
  .then(({data}) => {
    res.send(data.data);
  })
  .catch(err=>{
    console.log('failed to get clips ->', err);
    res.status(502).send(err);
  });
});

app.post('/signup', (req, res) => {
  db.addUser(req.body.name)
  .then((name) => {
    res.send(name);
  })
  .catch(err => {
    console.log('failed to signup ->', err);
    res.status(502).send(err);
  })
})

app.get('/login', (req, res) => {
  db.login(req.query.name)
  .then((name) => {
    res.send(name);
  })
  .catch(err=>{
    console.log('db failed');
    res.status(500).send(err);
  })
})

app.get('/userclips', (req, res) => {
  db.usersClips(req.query.name)
  .then(({clips}) => {
    let promises = clips.map((id) => db.getClip(id))
    Promise.all(promises).then((clip) => {res.send(clip)})
    .catch(err => {
      console.log('failed to get clips', err);
      res.status(503).send(err);
    })
  })
  .catch(err => {
    console.log('failed to get ids', err);
    res.status(502).send(err);
  })
})

app.get('/likedclips', (req, res) => {
  db.likedClips(req.query.name)
  .then(({likes}) => {
    let promises = likes.map((id) => db.getClip(id))
    Promise.all(promises).then((clip) => {res.send(clip)})
    .catch(err => {
      console.log('failed to get clips', err);
      res.status(503).send(err);
    })
  })
  .catch(err => {
    console.log('failed to get ids', err);
    res.status(502).send(err);
  })
})

app.post('/addclip', (req, res) => {
  db.addClip(req.body.clip, req.body.name)
    .then((id) => {
      res.send(id);
    })
    .catch(err => {
      console.log('failed to post ->', err);
      res.status(502).send(err);
    })
})

app.get('/getclips', (req, res) => {
  db.getClips(req.body.criteria)
  .then((clips) => {
    res.send(clips);
  })
  .catch(err => {
    console.log('failed to get clips ->', err);
    res.status(502).send(err);
  })
})

app.get('/getclip', (req, res) => {
  db.getClip(req.body.id)
  .then((clip) => {
    res.send(clip);
  })
  .catch(err => {
    console.log('failed to get clip ->', err);
    res.status(502).send(err);
  })
})

app.put('/likeclip', (req, res) => {
  db.likeClip(req.body.clipid, req.body.name)
  .then(() => {res.end()})
  .catch(err => {res.status(501).send(err)})
})


app.listen(PORT, () => {
  console.log('listening on port ->', PORT);
})