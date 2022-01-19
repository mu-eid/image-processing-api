import httpTest from 'supertest';
import { app } from '../index';

describe('Server status check', () => {
    describe('GET /ping', () => {
        let resp: httpTest.Response;

        beforeAll(async () => {
            resp = await httpTest(app).get('/ping');
        });

        it('should respond with status code 200', () => {
            expect(resp.statusCode).toEqual(200);
        });

        it('shuold send a response with type JSON.', () => {
            expect(resp.get('Content-Type')).toMatch(/json/);
        });

        it('should send a specific JSON payload.', () => {
            expect(resp.get('Content-Length')).toEqual('19');
            expect(resp.body).toEqual({ response: 'pong' });
        });
    });
});
