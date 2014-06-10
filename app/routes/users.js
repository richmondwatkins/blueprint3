'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');

exports.lookup = (req, res, next)=>{
    User.findById(req.session.userId, u=>{
      if(u){
        res.locals.user = u;
        next();
      }else{
        next();
      }
    });
};

exports.portal = (req, res)=>{
  res.render('users/login', {title: 'login'});
};

exports.create = (req,res)=>{
  User.create(req.body, user=>{
    if(user){
      req.session.userId = user._id;
      res.redirect('/');
    }else{
      res.redirect('/login');
    }

  });
};

exports.login = (req, res)=>{
  User.login(req.body, user=>{
    if(user){
      req.session.userId = user._id;
      res.redirect('/');
    }else{
      res.redirect('/login');
    }
  });
};

exports.logout = (req, res)=>{
  req.session = null;
  res.redirect('/');
};
