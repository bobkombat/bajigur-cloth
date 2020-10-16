const request = require('supertest');
const app = require('../app');
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

let adminAccess_token;
let userAccess_token;

beforeAll(done => {
  request(app)
    .post("/user/register")
    .send({ email: "bob@email.com", password: "123456" })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .then((response) => {
      return request(app)
        .post("/user/login")
        .send({ email: "bob@email.com", password: "123456" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/);
    })
    .then(response => {
      userAccess_token = response.body.access_token;

      return request(app)
        .post("/admin/login")
        .send({ email: "admin@email.com", password: "1234" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
    })
    .then((response) => {
      adminAccess_token = response.body.access_token;

      return request(app)
        .post("/product")
        .send({ name: "baju", image_url: "oiawndiwd", price: 1, stock: 99 })
        .set("Accept", "application/json")
        .set('access_token', adminAccess_token)
        .expect("Content-Type", /json/);
    })
    .then(response => {
      return request(app)
        .post(`/user/cart/${response.body.id}`)
        .send({ quantity: '10' })
        .set("Accept", "application/json")
        .set('access_token', userAccess_token)
        .expect("Content-Type", /json/);
    })
    .then(response => {
      done();
    })
    .catch((err) => done());
})

afterAll(async (done) => {
  await queryInterface.bulkDelete('Products', null, {});
  await queryInterface.bulkDelete('Users', null, {});
  await queryInterface.bulkDelete('TransactionHistories', null, {});
  await queryInterface.bulkDelete('TransactionInvoices', null, {});
  done();
})

describe('GET transaction', () => {

  describe('success get transaction history', () => {
    test('success get data', done => {
      request(app)
      .get('/user/transaction/history')
      .set("Accept", "application/json")
      .set('access_token', userAccess_token)
      .expect("Content-Type", /json/)
      .then(response => {
        const { body, status } = response;

        expect(body).toEqual(expect.any(Array));
        expect(status).toBe(200);

        done()
      })
    })
  })
})

describe('POST transaction', () => {

  describe('success post transaction', () => {
    test('success checkout cart', done => {
      request(app)
      .post('/user/transaction/checkout')
      .set("Accept", "application/json")
      .set('access_token', userAccess_token)
      .expect("Content-Type", /json/)
      .then(response => {
        const { body, status } = response;

        expect(body).toEqual(expect.any(Array));
        expect(status).toBe(201);

        done()
      })
    })
  })

  describe('failed post transaction', () => {
    test('failed checkout cart', done => {
      request(app)
      .post('/user/transaction/checkout')
      .set("Accept", "application/json")
      .set('access_token', userAccess_token)
      .expect("Content-Type", /json/)
      .then(response => {
        const { body, status } = response;

        expect(body.statusMessage).toEqual("BAD_REQUEST");
        expect(status).toBe(400);

        done()
      })
    })
  })
})
