const app = require('../app.js');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

let access_token;

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

beforeAll(done => {
  request(app)
    .post("/user/register")
    .send({ email: "bob@email.com", password: "123456" })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .then((response) => {
      userId = response.body.id;

      done();
    })
    .catch(err => done())
})

afterAll(async (done) => {
  await queryInterface.bulkDelete('Users', null, {});
  done();
})

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

        access_token = body.access_token;

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

describe('GET users', () => {
  describe('success get all user', () => {
    test('success get users', done => {
      request(app)
      .get('/admin/users')
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(body).toEqual(expect.any(Array));
        expect(status).toBe(200);

        done();
      })
    })
  })

  describe('success get one user', () => {
    test('success get user', done => {
      request(app)
      .get(`/admin/users/${userId}`)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(body.id).toEqual(userId);
        expect(status).toBe(200);

        done();
      })
    })
  })

  describe('failed get one user', () => {
    test('user not exist', done => {
      request(app)
      .get(`/admin/users/${userId.slice(0, userId.length - 1) + "1"}`)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(body.statusMessage).toEqual("NOT_FOUND");
        expect(status).toBe(404);

        done();
      })
    })
  })

  describe('success get one user wishlist', () => {
    test('success get user', done => {
      request(app)
      .get(`/admin/users/${userId}/wishlist`)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        console.log(body);

        expect(body.id).toEqual(userId);
        expect(body.Wishlists).toEqual(expect.any(Array));
        expect(status).toBe(200);

        done();
      })
    })
  })

  describe('failed get one user wishlist', () => {
    test('user not exist', done => {
      request(app)
      .get(`/admin/users/${userId.slice(0, userId.length - 1) + "1"}/wishlist`)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(body.statusMessage).toEqual("NOT_FOUND");
        expect(status).toBe(404);

        done();
      })
    })
  })

  describe('success get one user cart', () => {
    test('success get user', done => {
      request(app)
      .get(`/admin/users/${userId}/cart`)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(body.id).toEqual(userId);
        expect(body.Carts).toEqual(expect.any(Array));
        expect(status).toBe(200);

        done();
      })
    })
  })

  describe('failed get one user cart', () => {
    test('user not exist', done => {
      request(app)
      .get(`/admin/users/${userId.slice(0, userId.length - 1) + "1"}/cart`)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(body.statusMessage).toEqual("NOT_FOUND");
        expect(status).toBe(404);

        done();
      })
    })
  })

  describe('success get one user transaction', () => {
    test('success get user', done => {
      request(app)
      .get(`/admin/users/${userId}/transaction`)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(body.id).toEqual(userId);
        expect(body.TransactionInvoices).toEqual(expect.any(Array));
        expect(status).toBe(200);

        done();
      })
    })
  })

  describe('failed get one user transaction', () => {
    test('user not exist', done => {
      request(app)
      .get(`/admin/users/${userId.slice(0, userId.length - 1) + "1"}/transaction`)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(body.statusMessage).toEqual("NOT_FOUND");
        expect(status).toBe(404);

        done();
      })
    })
  })
})
