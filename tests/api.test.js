'use strict';

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

let app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');

describe('API tests', () => {
    before((done) => {
        db.serialize((err) => { 
            if (err) {
                return done(err);
            }

            buildSchemas(db);

            done();
        });
    });

    describe('GET /health', async () => {
        it('should return health', async () => {
          return new Promise(async function (resolve) {
            app = await require('../src/app')(db);
            resolve(request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200))
          })
        });
    });

    describe('GET /rides/', async () => {
      it('should return all in db', async () => {
        return new Promise(async function (resolve) {
          app = await require('../src/app')(db);
          resolve(request(app)
              .get('/rides')
              .expect('Content-Type', "application/json; charset=utf-8")
              .expect(200))
        })
      });
    });

    describe('GET /rides/:id', async () => {
      it('should return result based on id provided', async () => {
        return new Promise(async function (resolve) {
          app = await require('../src/app')(db);
          resolve(request(app)
              .get('/rides/1')
              .expect('Content-Type', "application/json; charset=utf-8")
              .expect(200))
        })
      });
    });
    
    describe('GET /rides/:id', async () => {
      it('should return result based on id provided', async () => {
        return new Promise(async function (resolve) {
          app = await require('../src/app')(db);
          resolve(request(app)
              .get('/rides/asd')
              .expect('Content-Type', "application/json; charset=utf-8")
              .expect(200))
        })
      });
    });

    describe('POST /rides', async () => {
      it('should add new and return json response', async () => {
        return new Promise(async function (resolve) {
          app = await require('../src/app')(db);
          resolve(request(app)
              .post('/rides')
              .send({
                  "start_lat": 45,
                  "start_long": 45,
                  "end_lat": 90,
                  "end_long": 90,
                  "rider_name": "a rider",
                  "driver_name": "a driver",
                  "driver_vehicle": "avanza"
              })
              .expect('Content-Type', "application/json; charset=utf-8")
              .expect(200))
        })
      });
    });

    describe('POST /rides', async () => {
      it('should add new and return json response', async () => {
        return new Promise(async function (resolve) {
          app = await require('../src/app')(db);
          resolve(request(app)
              .post('/rides')
              .send({
                  "start_lat": -450,
                  "start_long": 45,
                  "end_lat": 90,
                  "end_long": 90,
                  "rider_name": "a rider",
                  "driver_name": "a driver",
                  "driver_vehicle": "avanza"
              })
              .expect('Content-Type', "application/json; charset=utf-8")
              .expect(200))
        })
      });
    });

    describe('POST /rides', async () => {
      it('should add new and return json response', async () => {
        return new Promise(async function (resolve) {
          app = await require('../src/app')(db);
          resolve(request(app)
              .post('/rides')
              .send({
                  "start_lat": 45,
                  "start_long": 45,
                  "end_lat": -900,
                  "end_long": 90,
                  "rider_name": "a rider",
                  "driver_name": "a driver",
                  "driver_vehicle": "avanza"
              })
              .expect('Content-Type', "application/json; charset=utf-8")
              .expect(200))
            })
      });
    });

    describe('POST /rides', async () => {
      it('should add new and return json response', async () => {
        return new Promise(async function (resolve) {
          app = await require('../src/app')(db);
          resolve(request(app)
              .post('/rides')
              .send({
                  "start_lat": 45,
                  "start_long": 45,
                  "end_lat": 90,
                  "end_long": 90,
                  "rider_name": "a rider",
                  "driver_name": 12312312,
                  "driver_vehicle": "avanza"
              })
              .expect('Content-Type', "application/json; charset=utf-8")
              .expect(200))
            })
      });
    });

    describe('POST /rides', async () => {
      it('should add new and return json response', async () => {
        return new Promise(async function (resolve) {
          app = await require('../src/app')(db);
          resolve(request(app)
              .post('/rides')
              .send({
                  "start_lat": 45,
                  "start_long": 45,
                  "end_lat": 90,
                  "end_long": 90,
                  "rider_name": 12312312,
                  "driver_name": "a driver",
                  "driver_vehicle": "avanza"
              })
              .expect('Content-Type', "application/json; charset=utf-8")
              .expect(200))
            })
      });
    });

    describe('POST /rides', async () => {
      it('should add new and return json response', async () => {
        return new Promise(async function (resolve) {
          app = await require('../src/app')(db);
          resolve(request(app)
              .post('/rides')
              .send({
                  "start_lat": 45,
                  "start_long": 45,
                  "end_lat": 90,
                  "end_long": 90,
                  "rider_name": "asdasdas",
                  "driver_name": "a driver",
                  "driver_vehicle": 2132123123
              })
              .expect('Content-Type', "application/json; charset=utf-8")
              .expect(200))
            })
      });
    });

    describe('GET /rides/', async () => {
      it('should return all in db', async () => {
        return new Promise(async function (resolve) {
          app = await require('../src/app')(db);
          resolve(request(app)
              .get('/rides?page=1&row_of_page=3')
              .expect('Content-Type', "application/json; charset=utf-8")
              .expect(200))
        })
      });
    });

    describe('GET /rides/', async () => {
      it('should return all in db', async () => {
        return new Promise(async function (resolve) {
          app = await require('../src/app')(db);
          resolve(request(app)
              .get('/rides?page=-1&row_of_page=3')
              .expect('Content-Type', "application/json; charset=utf-8")
              .expect(200))
        })
      });
    });
});