const request = require('supertest');
const app = require('../app.js');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

let access_token;
let bannerId;

beforeAll(done => {
  request(app)
  .post('/admin/login')
  .send({ email: 'admin@email.com', password: '1234' })
  .set('Accept', 'application/json')
  .expect('Content-Type', /json/)
  .then(response => {
    const { body } = response;
    access_token = body.access_token;

    done()
  })
  .catch(err => done())
})

afterAll(async done => {
  await queryInterface.bulkDelete('Banners', null, {});
  done();
})

describe('POST banners', () => {

  describe('failed post new banner', () => {
    test('fake access_token 4', done => {
      request(app)
      .post('/banner')
      .send({})
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(400);
        expect(body.statusMessage).toEqual("VALIDATION_ERROR");

        done();
      })
    })
  })

  describe('success post new product', () => {
    test('add new product', done => {
      request(app)
      .post('/banner')
      .send({ name: 'test', image_url: 'test', expired: 'false'})
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(201);
        expect(body.name).toEqual('test');
        expect(body.image_url).toEqual('test');
        expect(body.expired).toEqual(false);

        bannerId = body.id;

        done()
      })
      .catch(err => done())
    })
  })
})

describe('PUT banners', () => {
  describe('failed post new banner', () => {
    test('no data send to body', done => {
      request(app)
      .put(`/banner/noanwdwd`)
      .send({})
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(404);
        expect(body.statusMessage).toEqual("NOT_FOUND");

        done();
      })
    })
  })

  describe('success put banner', () => {
    test('update banner', done => {
      request(app)
      .put(`/banner/${bannerId}`)
      .send({ name: 'test', image_url: 'test', expired: 'true'})
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(201);
        expect(body.name).toEqual('test');
        expect(body.image_url).toEqual('test');
        expect(body.expired).toEqual(true);

        bannerId = body.id;

        done()
      })
      .catch(err => done())
    })
  })

  describe('failed post new banner', () => {
    test('banner not found', done => {
      request(app)
      .put(`/banner/${bannerId.slice(0, bannerId.length - 1) + '1'}`)
      .send({})
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(404);
        expect(body.statusMessage).toEqual("NOT_FOUND");

        done();
      })
    })
  })
})

describe('GET banners', () => {

  describe('success get banner', () => {
    test('get all banner', done => {
      request(app)
      .get(`/banner`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toEqual(expect.any(Array));

        done();
      })
    })
  })

  describe('success get banner', () => {
    test('get one banner', done => {
      request(app)
      .get(`/banner/${bannerId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body.id).toEqual(bannerId);

        done();
      })
    })
  })

  describe('failed get banner', () => {
    test('failed get one banner', done => {
      request(app)
      .get(`/banner/${bannerId.slice(0, bannerId.length - 1) + '1'}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(404);
        expect(body.statusMessage).toEqual("NOT_FOUND");

        done();
      })
    })
  })

  describe('failed get banner', () => {
    test('failed get one banner', done => {
      request(app)
      .get(`/banner/awdawdawdawdawdawd`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(500);
        expect(body.statusMessage).toEqual("INTERNAL_SERVER_ERROR");

        done();
      })
    })
  })
})

describe('DELETE banners', () => {

  describe('failed delete banner', () => {
    test('failed get one banner', done => {
      request(app)
      .delete(`/banner/${bannerId.slice(0, bannerId.length - 1) + '1'}`)
      .set('Accept', 'application/json')
      .set('access_token', access_token)
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(404);
        expect(body.statusMessage).toEqual("NOT_FOUND");

        done();
      })
    })
  })

  describe('failed delete banner', () => {
    test('failed get one banner fake id', done => {
      request(app)
      .delete(`/banner/awdawdawdawdawdawd`)
      .set('Accept', 'application/json')
      .set('access_token', access_token)
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(500);
        expect(body.statusMessage).toEqual("INTERNAL_SERVER_ERROR");

        done();
      })
    })
  })

  describe('success delete banner', () => {
    test('get one banner', done => {
      request(app)
      .delete(`/banner/${bannerId}`)
      .set('Accept', 'application/json')
      .set('access_token', access_token)
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body.id).toEqual(bannerId);

        done();
      })
    })
  })
})
