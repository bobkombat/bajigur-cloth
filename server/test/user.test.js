const app = require('../app.js');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

const userRegister = {
  "email": "bob@email.com",
  "password": "1234",
  "address": "jl. jalan",
  "postoffice": 15000
}

const userRegisterFail1 = {
  "email": "bobss",
  "password": "1234",
  "address": "jl. jalan",
  "postoffice": 15000
}

const userRegisterFail2 = {
  "email": "bob@email.com",
  "password": "12",
  "address": "jl. jalan",
  "postoffice": 15000
}

const userLogin = {
  "email": "bob@email.com",
  "password": "1234",
  "address": "jl. jalan",
  "postoffice": 15000
}

const userFail1 = {
  "email": "",
  "password": "1234"
}

const userFail2 = {
  "email": "bob@email.com",
  "password": ""
}

const userFail3 = {
  "email": "awdwdwd",
  "password": "1234"
}

const userFail4 = {
  "email": "bob@email.com",
  "password": "12341"
}

afterAll(async done => {
  await queryInterface.bulkDelete('Users', null, {});
  done();
})

describe('Register user testing', () => {

  describe('user register failed', () => {
    test('failed register wrong email', (done) => {
      request(app)
      .post('/user/register')
      .send(userRegisterFail1)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;

        expect(body.statusMessage).toEqual('VALIDATION_ERROR');
        expect(status).toBe(400);

        done()
      })
    })
  })

  describe('user register success', () => {
    test('success register user', (done) => {
      request(app)
      .post('/user/register')
      .send(userRegister)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;

        expect(body.email).toEqual(userRegister.email);
        expect(status).toBe(201);

        done()
      })
    })
  })

  describe('user register failed', () => {
    test('failed register user with the same email', (done) => {
      request(app)
      .post('/user/register')
      .send(userRegister)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;

        expect(body.errorMessage).toEqual("ACCOUNT ALREADY EXIST");
        expect(status).toBe(401);

        done()
      })
    })
  })
})

describe('Login user Testing', () => {

  describe('user login successfully', () => {
    test('successfully login', (done) => {
      request(app)
      .post('/user/login')
      .send(userLogin)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;
        const dataUser = jwt.verify(body.access_token, process.env.JWT_SECRET);

        expect(body.access_token).not.toBeFalsy();
        expect(dataUser.email).toEqual(userLogin.email);
        expect(status).toBe(200);

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
        const { status, body } = response;

        expect(body.errorMessage).toEqual("DATA USER IS NOT FOUND");
        expect(status).toBe(404);

        done()
      })
      .catch(done)
    })
  })

  describe('user login fail', () => {
    test('failed login without email', (done) => {
      request(app)
      .post('/user/login')
      .send(userFail3)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;

        expect(body.errorMessage).toEqual("DATA USER IS NOT FOUND");
        expect(status).toBe(404);

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
        const { status, body } = response;

        expect(body.errorMessage).toEqual("EMAIL/PASSWORD IS WRONG");
        expect(status).toBe(401);
        done();
      })
      .catch(done)
    })
  })

  describe('user login fail', () => {
    test('failed login without password', (done) => {
      request(app)
      .post('/user/login')
      .send(userFail4)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;

        expect(body.errorMessage).toEqual("EMAIL/PASSWORD IS WRONG");
        expect(status).toBe(401);
        done();
      })
      .catch(done)
    })
  })
})
