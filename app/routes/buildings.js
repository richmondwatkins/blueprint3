'use strict';

var traceur = require('traceur');
// var Building = traceur.require(__dirname + '/../models/building.js');
// var User = traceur.require(__dirname + '/../models/user.js');
var Location = traceur.require(__dirname + '/../models/location.js');


exports.new = (req, res)=>{
  console.log('BUILDING NEW*****');
  console.log(res.locals.user);

  if(res.locals.user){
    Location.findAll(locations=>{
      res.render('buildings/new', {locations: locations, title: 'New Floor'});
    });
  }else{
    res.redirect('/');
  }
};
