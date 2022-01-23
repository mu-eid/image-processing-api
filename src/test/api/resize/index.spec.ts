import httpTest from 'supertest';
import { app } from '../../../index';

describe('Resize API', () => {
    describe('On Success', () => {
        let resp: httpTest.Response;
        const TEST_URL = '/resize?image=fjord&width=300&height=200';

        beforeAll(async () => {
            resp = await httpTest(app).get(TEST_URL);
        });

        it('should respond with status code 200', () => {
            expect(resp.statusCode).toEqual(200);
        });

        it('should send an image file of type [JPEG]', () => {
            expect(resp.get('Content-Type')).toMatch(/jpeg/);
        });
    });

    describe('On Failure', () => {
        describe('When given a wrong file name', () => {
            let resp: httpTest.Response;
            const TEST_URL = '/resize?image=fjooord&width=300&height=200';

            beforeAll(async () => {
                resp = await httpTest(app).get(TEST_URL);
            });

            it('should respond with code 404', () => {
                expect(resp.statusCode).toEqual(404);
            });

            it('should return a specific error message of type [JSON]', () => {
                expect(resp.get('Content-Type')).toMatch(/json/);

                expect(resp.body).toEqual({
                    error: {
                        message: 'Resizing: something went wrong.',
                        reason: 'No such image file',
                    },
                });
            });
        });
    });

    describe('When [Width] value is missing or not a number', () => {
        let resp: httpTest.Response;
        const TEST_URL = '/resize?image=fjord&height=200';

        beforeAll(async () => {
            resp = await httpTest(app).get(TEST_URL);
        });

        it('should respond with code 400', () => {
            expect(resp.statusCode).toEqual(400);
        });

        it('should return a specific error message of type [JSON]', () => {
            expect(resp.get('Content-Type')).toMatch(/json/);

            expect(resp.body).toEqual({
                error: {
                    message: 'Need to provide a [width] value for resizing',
                },
            });
        });
    });

    describe('When [Height] value is missing or not a number', () => {
        let resp: httpTest.Response;
        const TEST_URL = '/resize?image=fjord&width=300';

        beforeAll(async () => {
            resp = await httpTest(app).get(TEST_URL);
        });

        it('should respond with code 400', () => {
            expect(resp.statusCode).toEqual(400);
        });

        it('should return a specific error message of type [JSON]', () => {
            expect(resp.get('Content-Type')).toMatch(/json/);

            expect(resp.body).toEqual({
                error: {
                    message: 'Need to provide a [height] value for resizing',
                },
            });
        });
    });
});
