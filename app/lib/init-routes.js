'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var locations = traceur.require(__dirname + '/../routes/locations.js');
  var floors = traceur.require(__dirname + '/../routes/floors.js');
  var users = traceur.require(__dirname + '/../routes/users.js');
  var buildings = traceur.require(__dirname + '/../routes/buildings.js');


  app.get('/', dbg, home.index);
  app.get('/locations/new', dbg, locations.new);
  app.post('/locations', dbg, locations.create);
  app.get('/locations', dbg, locations.index);

  app.get('/floors/new', dbg, floors.new);
  app.post('/floors', dbg, floors.create);
  app.get('/floors', dbg, floors.index);

  app.get('/login', dbg, users.portal);
  app.post('/login', dbg, users.login);

  app.post('/logout', dbg, users.logout);

  app.post('/users', dbg, users.create);

  app.all('*', users.lookup);
  app.get('/buildings/new', dbg, buildings.new);

  console.log('Routes Loaded');
  fn();
}
