import { expect } from 'chai';
import request from 'request';

describe('test app routes (endpoints)', () => {
    describe('GET /api/status', () => {
        it ('should return correct data', () => {
            request('http://localhost:4000/api/status', (error, response, body) => {
                console.log(body);
                expect(JSON.parse(body)).to.equal({ mongodb: true });
                expect(response.statusCode).to.equal(200);
            });
        });
    });
});