/* global describe, before, beforeEach, it */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'blueprint-test';

var expect = require('chai').expect;
var traceur = require('traceur');
var db = traceur.require(__dirname + '/../../helpers/db.js');
var factory = traceur.require(__dirname + '/../../helpers/factory.js');
var app = require('../../../app/app');
var request = require('supertest');

var User;

describe('users', function(){

  before(function(done){
    db(function(){
      User = traceur.require(__dirname + '/../../../app/models/user.js');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('users').drop(function(){
      factory('user', function(users){
        factory('location', function(locations){
          done();
        });
      });
    });
  });

  describe('login', function(){
    var cookies;

    beforeEach(function(done){
      request(app)
      .post('/login')
      .send('email=sue@aol.com')
      .send('password=5678')
      .end(function(err, res){
        cookies = res.headers['set-cookie'];
        var cookie1 = cookies[0].split(';')[0];
        var cookie2 = cookies[1].split(';')[0];
        cookies = cookie1 + '; ' + cookie2;

        console.log('GETTING COOKIE******');
        console.log(cookies);


        done();
      });
    });

    describe('GET /buildings/new', function(){
        it('should show the new buildings web page', function (done){
          request(app)
          .get('/buildings/new')
          .set('cookie', cookies)
          .end(function(err,res){
            expect(res.status).to.equal(200);
            expect(res.text).to.include('sue@aol.com');
            expect(res.text).to.include('Mountain');
            expect(res.text).to.include('a123456789abcdef01234567');
            done();
          });
        });
        it('should NOT show the buildings web page - not logged in', function(done){
          request(app)
          .get('/buildings/new')
          .end(function(err,res){
            expect(res.status).to.equal(302);
            expect(res.headers.location).to.equal('/');
            done();
          });
        });
    });

  });






  // describe('GET /login', function(){
  //   it('should get the login page', function(done){
  //     request(app)
  //     .get('/login')
  //     .end(function(err, res){
  //       expect(res.status).to.equal(200);
  //       done();
  //     });
  //   });
  // });
  //


  // describe('POST /users', function(){
  //   it('should create a new users', function(done){
  //     request(app)
  //     .post('/users')
  //     .send('email=tlove@aol.com')
  //     .send('password=abc')
  //     .end(function(err, res){
  //       console.log('HEADERS');
  //       console.log(res.header);
  //       expect(res.status).to.equal(302);
  //       expect(res.headers.location).to.equal('/');
  //       expect(res.headers['set-cookie']).to.be.ok;
  //       done();
  //     });
  //   });
  //   it('should NOT create a new users', function(done){
  //     request(app)
  //     .post('/users')
  //     .send('email=sue@aol.com')
  //     .send('password=does not matter')
  //     .end(function(err, res){
  //       expect(res.status).to.equal(302);
  //       console.log('HEADERS');
  //       console.log(res.header);
  //       expect(res.headers.location).to.equal('/login');
  //       expect(res.headers['set-cookie']).to.not.be.ok;
  //       done();
  //     });
  //   });
  // });

  // describe('POST /login', function(){
  //   it('should log in an existing user', function(done){
  //     request(app)
  //     .post('/login')
  //     .send('email=sue@aol.com')
  //     .send('password=5678')
  //     .end(function(err, res){
  //       expect(res.status).to.equal(302);
  //       expect(res.headers.location).to.equal('/');
  //       expect(res.headers['set-cookie']).to.be.ok;
  //       done();
  //     });
  //   });
  //
  //   it('should NOT log in an existing user - bad email', function(done){
  //     request(app)
  //     .post('/login')
  //     .send('email=wrong@aol.com')
  //     .send('password=5678')
  //     .end(function(err, res){
  //       expect(res.status).to.equal(302);
  //       expect(res.headers.location).to.equal('/login');
  //       expect(res.headers['set-cookie']).to.not.be.ok;
  //       done();
  //     });
  //   });
  //
  //   it('should NOT log in an existing user - bad password', function(done){
  //     request(app)
  //     .post('/login')
  //     .send('email=sue@aol.com')
  //     .send('password=562378')
  //     .end(function(err, res){
  //       expect(res.status).to.equal(302);
  //       expect(res.headers.location).to.equal('/login');
  //       expect(res.headers['set-cookie']).to.not.be.ok;
  //       done();
  //     });
  //   });
  // });
  //
  // describe('POST /logout', function(){
  //   it('should logout an existing user', function(done){
  //     request(app)
  //     .post('/logout')
  //     .end(function(err, res){
  //       expect(res.status).to.equal(302);
  //       expect(res.headers.location).to.equal('/');
  //       expect(res.headers['set-cookie']).to.be.ok;
  //       done();
  //     });
  //   });
  // });



});
