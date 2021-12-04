'use strict';

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = require('../src/app')(db);
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

    describe('GET /health', () => {
        it('should return health', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });

    describe('GET /rides/:id', () => {
        it('should return result based on id provided', (done) => {
            request(app)
                .get('/rides/1')
                .expect('Content-Type', "application/json; charset=utf-8")
                .expect(200, done);
        });
    });

    describe('GET /rides/', () => {
        it('should return all in db', (done) => {
            request(app)
                .get('/rides')
                .expect('Content-Type', "application/json; charset=utf-8")
                .expect(200, done);
        });
    });

    describe('POST /rides', () => {
        it('should add new and return json response', (done) => {
            request(app)
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
                .expect(200, done);
        });
    });

    describe('POST /rides', () => {
        it('should add new and return json response', (done) => {
            request(app)
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
                .expect(200, done);
        });
    });

    describe('POST /rides', () => {
        it('should add new and return json response', (done) => {
            request(app)
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
                .expect(200, done);
        });
    });

    describe('POST /rides', () => {
        it('should add new and return json response', (done) => {
            request(app)
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
                .expect(200, done);
        });
    });

    describe('POST /rides', () => {
        it('should add new and return json response', (done) => {
            request(app)
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
                .expect(200, done);
        });
    });
});