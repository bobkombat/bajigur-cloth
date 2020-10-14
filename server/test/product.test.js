const request = require('supertest');
const app = require('../app.js');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

let access_token;
const fakeAccess_token1 = 'awdnwadinawd';
const fakeAccess_token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE2YWI4YWUzLTUzOGEtNGY2MC05MTYxLWM0ZjBjYjUxYTQ1OSIsIm5hbWUiOiJKb2huIERvZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTUxNjIzOTAyMn0.6KAZA0HTGuOe_kw3ubZOaDU-gaa-Wv_xLwM1XS299iU';
const fakeAccess_token3 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJvYiIsIm5hbWUiOiJKb2huIERvZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTUxNjIzOTAyMn0.Anhpo3jq4xN8PN_fYJaJpT9Q0QaQzPIFhhGyffWFXks';

let productId;

const product = {
  name: 'baju',
  image_url: 'ianwdinwd',
  price: 1,
  stock: 1
}

const productUpdate = {
  name: 'baju',
  image_url: 'ianwdinwd',
  price: 1,
  stock: 1,
  description: 'bob'
}

const productPriceNegative = {
  name: 'baju',
  image_url: 'ianwdinwd',
  price: -1,
  stock: 1
}

const productStockNegative = {
  name: 'baju',
  image_url: 'ianwdinwd',
  price: 1,
  stock: -1
}

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

afterAll(done => {
  queryInterface.bulkDelete('Products', null, {});
  done();
})

describe('POST new product', () => {

  describe('failed post new product', () => {
    test('all field is empty', done => {
      request(app)
      .post('/product')
      .send()
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(400);
        expect(body.errorMessage[0]).toEqual('product name is empty');
        expect(body.errorMessage[1]).toEqual('image url is empty');
        expect(body.errorMessage[2]).toEqual('price must be an integer');
        expect(body.errorMessage[3]).toEqual('stock must be an integer');

        done();
      })
    })
  })

  describe('failed post new product', () => {
    test('price field is negative', done => {
      request(app)
      .post('/product')
      .send(productPriceNegative)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(400);
        expect(body.errorMessage[0]).toEqual('price cannot be less than 0');

        done();
      })
    })
  })

  describe('failed post new product', () => {
    test('stock field is negative', done => {
      request(app)
      .post('/product')
      .send(productStockNegative)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(400);
        expect(body.errorMessage[0]).toEqual('stock cannot be less than 0');

        done();
      })
    })
  })

  describe('failed post new product', () => {
    test('access_token false', done => {
      request(app)
      .post('/product')
      .send()
      .set('access_token', fakeAccess_token1)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body.statusMessage).toEqual('INVALID_SIGNATURE');

        done();
      })
    })
  })

  describe('failed post new product', () => {
    test('empty access_token', done => {
      request(app)
      .post('/product')
      .send()
      .set('access_token', "")
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body.statusMessage).toEqual('INVALID_ACCOUNT');

        done();
      })
    })
  })

  describe('failed post new product', () => {
    test('fake access_token 1', done => {
      request(app)
      .post('/product')
      .send()
      .set('access_token', fakeAccess_token2)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body.statusMessage).toEqual('INVALID_SIGNATURE');

        done();
      })
    })
  })

  describe('failed post new product', () => {
    test('fake access_token 2', done => {
      request(app)
      .post('/product')
      .send()
      .set('access_token', fakeAccess_token3)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(500);
        expect(body.statusMessage).toEqual('INTERNAL_SERVER_ERROR');
        expect(body.errorMessage).toEqual('INTERNAL_SERVER_ERROR');

        done();
      })
    })
  })

  describe('success post new product', () => {
    test('add new product', done => {
      request(app)
      .post('/product')
      .send(product)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(201);
        expect(body.name).toEqual('baju');
        expect(body.image_url).toEqual('ianwdinwd');
        expect(body.price).toEqual(1);
        expect(body.stock).toEqual(1);

        done()
      })
      .catch(err => done())
    })
  })
})

describe('GET product', () => {

  describe('get product', () => {
    test('get product data', done => {
      request(app)
      .get('/product')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toEqual(expect.any(Array));

        productId = body[0].id;
        done();
      })
    })
  })

  describe('get product detail', () => {
    test('get product data', done => {
      request(app)
      .get(`/product/${productId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body.name).toEqual('baju');

        done();
      })
    })
  })

  describe('get product detail', () => {
    test('failed get product data detail', done => {
      request(app)
      .get(`/product/${productId + '1'}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(500);
        expect(body.statusMessage).toEqual('INTERNAL_SERVER_ERROR');

        done();
      })
    })
  })

  describe('get product detail', () => {
    test('failed get product data detail', done => {
      request(app)
      .get(`/product/${productId.slice(0, productId.length - 1) + '9'}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(404);
        expect(body.statusMessage).toEqual('NOT_FOUND');
        expect(body.errorMessage).toEqual('DATA PRODUCT IS NOT FOUND');

        done();
      })
    })
  })
})

describe('PUT product', () => {

  describe('success update', () => {
    test('success update', done => {
      request(app)
      .put(`/product/${productId}`)
      .send(productUpdate)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(201);
        expect(body.name).toEqual('baju');
        expect(body.image_url).toEqual('ianwdinwd');
        expect(body.price).toEqual(1);
        expect(body.stock).toEqual(1);
        expect(body.description).toEqual('bob');

        done();
      })
    })
  })

  describe('failed update', () => {
    test('failed update', done => {
      request(app)
      .put(`/product/${productId + '5'}`)
      .send(productUpdate)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(500);
        expect(body.statusMessage).toEqual('INTERNAL_SERVER_ERROR');

        done();
      })
    })
  })

  describe('failed update', () => {
    test('failed update', done => {
      request(app)
      .put(`/product/${productId.slice(0, productId.length - 1) + 'a'}`)
      .send(productUpdate)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(404);
        expect(body.statusMessage).toEqual('NOT_FOUND');

        done();
      })
    })
  })
})

describe('DELETE product', () => {

  describe('failed delete', () => {
    test('failed delete', done => {
      request(app)
      .delete(`/product/${productId + '5'}`)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(500);
        expect(body.statusMessage).toEqual('INTERNAL_SERVER_ERROR');

        done();
      })
    })
  })

  describe('failed delete', () => {
    test('failed delete false id', done => {
      request(app)
      .delete(`/product/${productId.slice(0, productId.length - 1) + '2'}`)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(404);
        expect(body.statusMessage).toEqual('NOT_FOUND');

        done();
      })
    })
  })

  describe('success delete', () => {
    test('success delete', done => {
      request(app)
      .delete(`/product/${productId}`)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body.name).toEqual('baju');
        expect(body.image_url).toEqual('ianwdinwd');
        expect(body.price).toEqual(1);
        expect(body.stock).toEqual(1);
        expect(body.description).toEqual('bob');

        done();
      })
    })
  })
})
