const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const nock = require('nock');
const request = require('request');
const expressRequestHeaders = require('../index');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Example of usage to filter headers', () => {
  let app;
  let nockServer;

  const url = 'https://mock-server';

  before(() => {
    nockServer = nock(url).get('/');

    app = express();
    app.get('/', (req, res) => {
      const requestStream = request(url);

      expressRequestHeaders(requestStream, res, ['content-type', 'cookie']);

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

    chai.request(app).get('/').end((err, res) => {
      expect(res.headers).to.contain(expected);
      expect(res.headers).to.not.contain(unexpected);

      done();
    });
  });
});
