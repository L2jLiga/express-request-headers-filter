const chai = require('chai');
const chaiHttp = require('chai-http');
const http = require('http');
const nock = require('nock');
const request = require('request');
const requestHeadersFilter = require('../index');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Example of usage to filter headers for response', () => {
  let server;
  let nockServer;

  const url = 'https://mock-server';

  before(() => {
    nockServer = nock(url).get('/');

    server = http.createServer();

    server.on('request', (req, res) => {
      const requestStream = request(url);

      requestHeadersFilter.saveHeaders(requestStream, res, ['content-type', 'cookie']);

      req.pipe(requestStream).pipe(res);
    });
  });

  after(() => {
    nock.cleanAll();
  });

  it('should remove all unrequired headers from response', (done) => {
    const expected = {
      'cookie': 'a=1; b=2',
      'content-type': 'text/plain; charset=utf-8'
    };

    const unexpected = {
      'other-header': 'something'
    };

    nockServer.reply(200, 'content', {
      ...expected,
      ...unexpected
    });

    chai.request(server).get('/').end((err, res) => {
      expect(res.headers).to.contain(expected);
      expect(res.headers).to.not.contain(unexpected);

      done();
    });
  });
});
