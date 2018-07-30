const chai = require('chai');
const chaiHttp = require('chai-http');
const http = require('http');
const nock = require('nock');
const request = require('request');
const requestHeadersFilter = require('../index');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Example of usage to remove headers from request', () => {
  let server;

  const url = 'https://mock-server';

  before(() => {
    server = http.createServer();

    server.on('request', (req, res) => {
      requestHeadersFilter.filterHeaders(req, [/^n?x-/]);

      const requestStream = request(url);

      req.pipe(requestStream).pipe(res);
    });
  });

  after(() => {
    nock.cleanAll();
  });

  it('should remove all unrequired headers from request', (done) => {
    const expected = {
      'cookie': 'a=1; b=2',
      'content-type': 'text/plain; charset=utf-8'
    };

    const unexpected = {
      'nx-header': 'something'
    };

    nock(url, {badheaders: ['nx-proto']})
      .get('/')
      .reply(function () {
        expect(this.req.headers).to.contain(expected);
        expect(this.req.headers).to.not.contain(unexpected);
      });

    chai.request(server)
      .get('/')
      .set({
        ...expected,
        ...unexpected
      })
      .end(() => {
        done();
      });
  });
});
