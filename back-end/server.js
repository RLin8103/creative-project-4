const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const curPlayerSchema = new mongoose.Schema({
  lname: String,
  fname: String,
  ranking: Number,
  image: String,
  justification: String,
});

const allTimePlayerSchema = new mongoose.Schema({
  name: String,
  ranking: Number,
  justification: String,
});

const curTeamSchema = new mongoose.Schema({
    name: String,
    ranking: Number,
    
})

curPlayerSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

allTimePlayerSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
  
curTeamSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

curPlayerSchema.set('toJSON', {
  virtuals: true
});

allTimePlayerSchema.set('toJSON', {
  virtuals: true
});

curTeamSchema.set('toJSON', {
  virtuals: true
});

const CurPlayer = mongoose.model('CurPlayer', curPlayerSchema);

const AllTimePlayer = mongoose.model('ALlTimePlayer', allTimePlayerSchema);

const CurTeam = mongoose.model('CurTeam', curTeamSchema);


app.get('/top/curplayers', async (req, res) => {
  try {
    let curPlayers = await CurPlayer.find();
    res.send({
        
        curPlayers: curPlayers
        
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/top/curplayers', async (req, res) => {
  
  const curPlayer = new CurPlayer({
    lname: req.body.lname,
    fname: req.body.fname,
    ranking: req.body.ranking,
    image: "https://nba-players.herokuapp.com/players/" + req.body.lname + "/" + req.body.fname,
    justification: req.body.justification
  });
  try {
    await curPlayer.save();
    res.send({
        
        curPlayer: curPlayer
        
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/top/curplayers/:id', async (req, res) => {
  try {
    await CurPlayer.deleteOne({
      _id: req.params.id
    });
    console.log(req.params.id)
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});










app.get('/top/alltimeplayers', async (req, res) => {
  try {
    let allTimePlayers = await AllTimePlayer.find();
    res.send({
        
        allTimePlayers: allTimePlayers
        
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/top/alltimeplayers', async (req, res) => {
    const allTimePlayer = new AllTimePlayer({
    name: req.body.name,
    ranking: req.body.ranking,
    justification: req.body.justification
  });
  try {
    await allTimePlayer.save();
    res.send({
        
        allTimePlayer: allTimePlayer
        
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/top/alltimeplayers/:id', async (req, res) => {
  try {
    await AllTimePlayer.deleteOne({
      name: req.params.name
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/top/curteams', async (req, res) => {
  try {
    let curTeams = await CurTeam.find();
    res.send({
        
        curTeams: curTeams
        
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/top/curteams', async (req, res) => {
    const curTeam = new CurTeam({
    name: req.body.name,
    ranking: req.body.ranking,
    justification: req.body.justification
  });
  try {
    await curTeam.save();
    res.send({
        
        curTeam: curTeam
        
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/top/curteams/:id', async (req, res) => {
  try {
    await CurTeam.deleteOne({
      name: req.params.name
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3002, () => console.log('Server listening on port 3002!'));

