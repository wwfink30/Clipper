const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name:  String,
  playlists: [{id: Number}],
  likes:   [String],
  clips: [String]
});

const clipSchema = new Schema ({
  id: String,
  url: String,
  likes: {type:Number, default:0},
  date: String,
  streamer: String,
  clipper: String,
  views: Number,
  title: String,
  game: String,
  thumbnail_url: String
});

const playlistSchema = new Schema({
  user: String,
  id: Number,
  title: String,
  clips:[{id:String}],
  likes: Number
});


async function addUser(name) {
  await mongoose.connect('mongodb://localhost:27017/clipper');
  const User = mongoose.model('User', userSchema);
  if( await User.exists({ name }) === false) {
    const newUser = new User({ name });
    await newUser.save();
    return name;
  } else {
    return null;
  }
}

async function login(name) {
  await mongoose.connect('mongodb://localhost:27017/clipper');
  const User = mongoose.model('User', userSchema);
  return user = await User.exists({ name });
}

async function usersClips(name) {
  await mongoose.connect('mongodb://localhost:27017/clipper');
  const User = mongoose.model('User', userSchema);
  return await User.findOne({name}, 'clips').exec();
}

async function likedClips(name) {
  await mongoose.connect('mongodb://localhost:27017/clipper');
  const User = mongoose.model('User', userSchema);
  return await User.findOne({name}, 'likes').exec();
}

async function addClip(clip, username) {
  await mongoose.connect('mongodb://localhost:27017/clipper');
  const Clip = mongoose.model('Clip', clipSchema);
  const User = mongoose.model('User', userSchema);
    const newClip = new Clip({id: clip.id, url:clip.url, title:clip.title, thumbnail_url:clip.thumbnail_url, streamer:clip.broadcaster_name, views: clip.view_count, clipper: clip.creator_name, date:clip.created_at });
    await newClip.save();
    await User.updateOne({name: username}, {$push: {clips: clip.id}});

    return clip.id;

}

async function getClip(id) {
  await mongoose.connect('mongodb://localhost:27017/clipper');
  const Clip = mongoose.model('Clip', clipSchema);
  return clip = await Clip.findOne({ id });
}

async function getClips(sort) {
  await mongoose.connect('mongodb://localhost:27017/clipper');
  const Clip = mongoose.model('Clip',  clipSchema);
  let temp = {};
  temp[sort] = 'desc';
  return clips = await Clip.find().sort(temp);
}

async function likeClip(id, name) {
  await mongoose.connect('mongodb://localhost:27017/clipper');
  const Clip = mongoose.model('Clip',  clipSchema);
  const User = mongoose.model('User', userSchema);
  let q = await Clip.findOne({id});
  let likes = q.likes + 1;
  await Clip.updateOne({id},{likes}).exec()
  await User.updateOne({name},{$push: {likes: id}})
}

module.exports = {
  login,
  addUser,
  addClip,
  getClip,
  getClips,
  usersClips,
  likeClip,
  likedClips
}