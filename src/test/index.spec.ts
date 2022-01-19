import httpTest from 'supertest';
import { app } from '../index';

describe('Server', () => {
    describe('GET /ping', () => {
        let resp: httpTest.Response;

        beforeAll(async () => {
            resp = await httpTest(app).get('/ping');
        });

        it('should respond successfully to a request for /ping endpoint.', () => {
            expect(resp.statusCode).toEqual(200);
        });

        it('shuold send a JSON response type.', () => {
            expect(resp.get('Content-Type')).toMatch(/json/);
        });

        it('should send a specific JSON response body.', () => {
            expect(resp.get('Content-Length')).toEqual('19');
            expect(resp.body).toEqual({ response: 'pong' });
        });
    });
});
