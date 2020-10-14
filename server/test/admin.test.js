const app = require('../app.js');
const jwt = require('jsonwebtoken');
const request = require('supertest');

const adminLogin = {
  "email": "admin@email.com",
  "password": "1234"
}

const adminLoginFail1 = {
  "email": "admin@email.com",
  "password": "12341"
}

const adminLoginFail2 = {
  "email": "admin1@email.com",
  "password": "12341"
}

const adminFail1 = {
  "email": "",
  "password": "1234"
}

const adminFail2 = {
  "email": "admin@email.com",
  "password": ""
}

describe('Login Admin Testing', () => {

  describe('Admin login successfully', () => {
    test('successfully login', (done) => {
      request(app)
      .post('/admin/login')
      .send(adminLogin)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;
        const dataUser = jwt.verify(body.access_token, process.env.JWT_SECRET);

        expect(body.access_token).not.toBeFalsy();
        expect(dataUser.email).toEqual(adminLogin.email);
        expect(dataUser.role).toEqual('admin');
        expect(status).toBe(200);

        done()
      })
      .catch(done)
    })
  })

  describe('Admin login fail', () => {
    test('failed login without email', (done) => {
      request(app)
      .post('/admin/login')
      .send(adminFail1)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;

        expect(body.errorMessage).toEqual("DATA ADMIN IS NOT FOUND");
        expect(status).toBe(404);

        done()
      })
      .catch(done)
    })
  })

  describe('Admin login fail', () => {
    test('failed login without password', (done) => {
      request(app)
      .post('/admin/login')
      .send(adminFail2)
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

  describe('Admin login fail', () => {
    test('failed login wrong email', (done) => {
      request(app)
      .post('/admin/login')
      .send(adminLoginFail1)
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

  describe('Admin login fail', () => {
    test('failed login wrong password', (done) => {
      request(app)
      .post('/admin/login')
      .send(adminLoginFail2)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;

        expect(body.errorMessage).toEqual("DATA ADMIN IS NOT FOUND");
        expect(status).toBe(404);
        done();
      })
      .catch(done)
    })
  })
})
