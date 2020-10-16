const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

let access_token;
let productId;
let cartId;

beforeAll((done) => {
  let adminAccess_token;

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
      access_token = response.body.access_token;
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
      productId = response.body.id;
      done()
    })
    .catch((err) => done());
});

afterAll(async (done) => {
  await queryInterface.bulkDelete("Users", null, {});
  await queryInterface.bulkDelete("Products", null, {});
  await queryInterface.bulkDelete("Carts", null, {});
  done();
});

describe('POST to cart', () => {

  describe('failed post new cart', () => {
    test('failed to find product', done => {
      request(app)
        .post(`/user/cart/gvvivkvi`)
        .send({})
        .set("Accept", "application/json")
        .set('access_token', access_token)
        .expect("Content-Type", /json/)
        .then(response => {
          const { body, status } = response;

          expect(body.statusMessage).toEqual('INTERNAL_SERVER_ERROR');
          expect(status).toBe(500);
          done();
        })
        .catch(err => done())
    })
  })

  describe('failed post new cart', () => {
    test('failed to find product', done => {
      request(app)
        .post(`/user/cart/${productId.slice(0, productId.length - 1) + "0"}`)
        .send({})
        .set("Accept", "application/json")
        .set('access_token', access_token)
        .expect("Content-Type", /json/)
        .then(response => {
          const { body, status } = response;

          expect(body.statusMessage).toEqual('NOT_FOUND');
          expect(status).toBe(404);
          done();
        })
        .catch(err => done())
    })
  })

  describe('failed post new cart', () => {
    test('fail to add cart', done => {
      request(app)
        .post(`/user/cart/${productId}`)
        .send({ quantity: -1 })
        .set("Accept", "application/json")
        .set('access_token', access_token)
        .expect("Content-Type", /json/)
        .then(response => {
          const { body, status } = response;

          expect(body.statusMessage).toEqual('VALIDATION_ERROR');
          expect(status).toBe(400);
          done();
        })
        .catch(err => done())
    })
  })

  describe('failed post new cart', () => {
    test('fail to add cart', done => {
      request(app)
        .post(`/user/cart/${productId}`)
        .send({ quantity: 100 })
        .set("Accept", "application/json")
        .set('access_token', access_token)
        .expect("Content-Type", /json/)
        .then(response => {
          const { body, status } = response;

          expect(body.statusMessage).toEqual('BAD_REQUEST');
          expect(status).toBe(400);
          done();
        })
        .catch(err => done())
    })
  })

  describe('success post new cart', () => {
    test('success to add cart', done => {
      request(app)
        .post(`/user/cart/${productId}`)
        .send({ quantity: 10 })
        .set("Accept", "application/json")
        .set('access_token', access_token)
        .expect("Content-Type", /json/)
        .then(response => {
          const { body, status } = response;

          cartId = body.id;
          expect(body.ProductId).toEqual(productId);
          expect(status).toBe(200);
          done();
        })
        .catch(err => done())
    })
  })

  describe('failed post new cart', () => {
    test('fail to add cart', done => {
      request(app)
        .post(`/user/cart/${productId}`)
        .send({ quantity: 100 })
        .set("Accept", "application/json")
        .set('access_token', access_token)
        .expect("Content-Type", /json/)
        .then(response => {
          const { body, status } = response;

          expect(body.statusMessage).toEqual('BAD_REQUEST');
          expect(status).toBe(400);
          done();
        })
        .catch(err => done())
    })
  })

  describe('failed post new cart', () => {
    test('fail to add cart', done => {
      request(app)
        .post(`/user/cart/${productId}`)
        .send({ quantity: 10 })
        .set("Accept", "application/json")
        .set('access_token', access_token)
        .expect("Content-Type", /json/)
        .then(response => {
          const { body, status } = response;

          expect(body.ProductId).toEqual(productId);
          expect(status).toBe(200);
          done();
        })
        .catch(err => done())
    })
  })
})

describe('GET cart', () => {

  describe('success get cart', () => {
    test('success get data', done => {
      request(app)
        .get(`/user/cart`)
        .set("Accept", "application/json")
        .set('access_token', access_token)
        .expect("Content-Type", /json/)
        .then(response => {
          const { status, body } = response;

          expect(body).toEqual(expect.any(Array));
          expect(status).toBe(200);

          done();
        })
        .catch(err => done());
    })
  })
})

describe('PUT cart', () => {

  describe('failed put new cart', () => {
    test('failed to find product', done => {
      request(app)
        .put(`/user/cart/gvvivkvi`)
        .send({})
        .set("Accept", "application/json")
        .set('access_token', access_token)
        .expect("Content-Type", /json/)
        .then(response => {
          const { body, status } = response;

          expect(body.statusMessage).toEqual('INTERNAL_SERVER_ERROR');
          expect(status).toBe(500);
          done();
        })
        .catch(err => done())
    })
  })

  describe('failed put new cart', () => {
    test('failed to find product', done => {
      request(app)
        .put(`/user/cart/${productId.slice(0, productId.length - 1) + "0"}`)
        .send({})
        .set("Accept", "application/json")
        .set('access_token', access_token)
        .expect("Content-Type", /json/)
        .then(response => {
          const { body, status } = response;

          expect(body.statusMessage).toEqual('NOT_FOUND');
          expect(status).toBe(404);
          done();
        })
        .catch(err => done())
    })
  })

  describe('failed put new cart', () => {
    test('fail to put cart', done => {
      request(app)
        .put(`/user/cart/${productId}`)
        .send({ quantity: -1 })
        .set("Accept", "application/json")
        .set('access_token', access_token)
        .expect("Content-Type", /json/)
        .then(response => {
          const { body, status } = response;

          expect(body.statusMessage).toEqual('VALIDATION_ERROR');
          expect(status).toBe(400);
          done();
        })
        .catch(err => done())
    })
  })

  describe('failed put new cart', () => {
    test('fail to put cart', done => {
      request(app)
        .put(`/user/cart/${productId}`)
        .send({ quantity: 1000 })
        .set("Accept", "application/json")
        .set('access_token', access_token)
        .expect("Content-Type", /json/)
        .then(response => {
          const { body, status } = response;

          expect(body.statusMessage).toEqual('BAD_REQUEST');
          expect(status).toBe(400);
          done();
        })
        .catch(err => done())
    })
  })
})

describe('DELETE cart', () => {

  describe('failed delete cart', () => {
    test('failed to find product', done => {
      request(app)
        .delete(`/user/cart/gvvivkvi`)
        .send({})
        .set("Accept", "application/json")
        .set('access_token', access_token)
        .expect("Content-Type", /json/)
        .then(response => {
          const { body, status } = response;

          expect(body.statusMessage).toEqual('INTERNAL_SERVER_ERROR');
          expect(status).toBe(500);
          done();
        })
        .catch(err => done())
    })
  })

  describe('failed delete cart', () => {
    test('failed to find product', done => {
      request(app)
        .delete(`/user/cart/${cartId.slice(0, cartId.length - 1) + "0"}`)
        .send({})
        .set("Accept", "application/json")
        .set('access_token', access_token)
        .expect("Content-Type", /json/)
        .then(response => {
          const { body, status } = response;

          expect(body.statusMessage).toEqual('NOT_FOUND');
          expect(status).toBe(404);
          done();
        })
        .catch(err => done())
    })
  })

  describe('failed delete cart', () => {
    test('failed to find product', done => {
      request(app)
        .delete(`/user/cart/${cartId}`)
        .send({})
        .set("Accept", "application/json")
        .set('access_token', access_token)
        .expect("Content-Type", /json/)
        .then(response => {
          const { body, status } = response;

          expect(body.id).toEqual(cartId);
          expect(status).toBe(200);
          done();
        })
        .catch(err => done())
    })
  })
})
