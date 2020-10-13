const app = require('../app.js');
const jwt = require('jsonwebtoken');
const request = require('supertest');

const userLogin = {
  "email": "bob@email.com",
  "password": "1234",
  "address": "jl. jalan",
  "postOfficeBox": 15000
}

const userFail1 = {
  "email": "",
  "password": "1234",
  "address": "jl. jalan",
  "postOfficeBox": 15000
}

const userFail2 = {
  "email": "bob@email.com",
  "password": "",
  "address": "jl. jalan",
  "postOfficeBox": 15000
}

describe('Login user Testing', () => {

  describe('user login successfully', () => {
    test('successfully login', (done) => {
      request(app)
      .post('/user/login')
      .send(userLogin)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        console.log(response);

        done()
      })
      .catch(done)
    })
  })

  describe('user login fail', () => {
    test('failed login without email', (done) => {
      request(app)
      .post('/user/login')
      .send(userFail1)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        console.log(response);

        done()
      })
      .catch(done)
    })
  })

  describe('user login fail', () => {
    test('failed login without password', (done) => {
      request(app)
      .post('/user/login')
      .send(userFail2)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        console.log(response);

        done()
      })
      .catch(done)
    })
  })
})
