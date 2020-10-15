const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

let access_token;
let productId;

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
    })
    .catch((err) => done());

    request(app)
      .post("/admin/login")
      .send({ email: "admin@email.com", password: "1234" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
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

afterAll((done) => {
  queryInterface.bulkDelete("Users", null, {});
  queryInterface.bulkDelete("Products", null, {});
  queryInterface.bulkDelete("Wishlists", null, {});
  done();
});

describe("GET wishlist", () => {

  describe("success get wishlist", () => {
    test('success get data', done => {
      request(app)
      .get('/user/wishlist')
      .set("Accept", "application/json")
      .set('access_token', access_token)
      .expect("Content-Type", /json/)
      .then(response => {
        const { body, status } = response;

        expect(body).toEqual(expect.any(Array));
        expect(status).toBe(200);

        done();
      })
    })
  })
})

describe("POST wishlist", () => {

  describe("success post wishlist", () => {
    test('success post data', done => {
      request(app)
      .post(`/user/wishlist/${productId}`)
      .set("Accept", "application/json")
      .set('access_token', access_token)
      .expect("Content-Type", /json/)
      .then(response => {
        const { body, status } = response;

        expect(body.ProductId).toEqual(productId);
        expect(status).toBe(201);

        done();
      })
    })
  })

  describe("fail post wishlist", () => {
    test('wishlist already exist', done => {
      request(app)
      .post(`/user/wishlist/${productId}`)
      .set("Accept", "application/json")
      .set('access_token', access_token)
      .expect("Content-Type", /json/)
      .then(response => {
        const { body, status } = response;

        expect(body.statusMessage).toEqual("BAD_REQUEST");
        expect(status).toBe(400);

        done();
      })
    })
  })

  describe("fail post wishlist", () => {
    test('productId not exist', done => {
      request(app)
      .post(`/user/wishlist/awdwdwdwdwd`)
      .set("Accept", "application/json")
      .set('access_token', access_token)
      .expect("Content-Type", /json/)
      .then(response => {
        const { body, status } = response;

        expect(body.statusMessage).toEqual("INTERNAL_SERVER_ERROR");
        expect(status).toBe(500);

        done();
      })
    })
  })
})

describe("DELETE wishlist", () => {

  describe("success delete wishlist", () => {
    test('success delete data', done => {
      request(app)
      .delete(`/user/wishlist/${productId}`)
      .set("Accept", "application/json")
      .set('access_token', access_token)
      .expect("Content-Type", /json/)
      .then(response => {
        const { body, status } = response;

        expect(body.ProductId).toEqual(productId);
        expect(status).toBe(200);

        done();
      })
    })
  })

  describe("fail delete wishlist", () => {
    test('wishlist isnt exist', done => {
      request(app)
      .delete(`/user/wishlist/${productId}`)
      .set("Accept", "application/json")
      .set('access_token', access_token)
      .expect("Content-Type", /json/)
      .then(response => {
        const { body, status } = response;

        expect(body.statusMessage).toEqual("NOT_FOUND");
        expect(status).toBe(404);

        done();
      })
    })
  })

  describe("fail post wishlist", () => {
    test('productId not exist', done => {
      request(app)
      .delete(`/user/wishlist/awdwdwdwdwd`)
      .set("Accept", "application/json")
      .set('access_token', access_token)
      .expect("Content-Type", /json/)
      .then(response => {
        const { body, status } = response;

        expect(body.statusMessage).toEqual("INTERNAL_SERVER_ERROR");
        expect(status).toBe(500);

        done();
      })
    })
  })
})
