const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const nock = require('nock');
const request = require('request');
const expressRequestHeaders = require('../index');
const Transform = require('stream').Transform;

chai.use(chaiHttp);
const expect = chai.expect;

describe('Example of usage to save headers with Transform stream', () => {
  let app;
  let nockServer;

  const url = 'https://mock-server';

  /**
   * Demo middleware with transform stream
   * By the Idea when we transform streams
   * then request's headers will be lost
   * @return {module:stream.internal.Transform}
   */
  function transformStreamMiddleware() {
    const ts = new Transform();

    ts._transform = function _transform(chunk, encoding, callback) {
      callback(null, chunk);
    };

    return ts;
  }

  before(() => {
    nockServer = nock(url).get('/');

    app = express();
    app.get('/', (req, res) => {
      const requestStream = request(url);

      // Remove me and you will see failed test
      expressRequestHeaders(requestStream, res);

      req.pipe(requestStream).pipe(transformStreamMiddleware()).pipe(res);
    });
  });

  after(() => {
    nock.cleanAll();
  });

  it('should save all required headers from response', (done) => {
    const headers = {
      'cookie': 'a=1; b=2',
      'content-type': 'text/plain; charset=utf-8',
      'other-header': 'something'
    };

    nockServer.reply(200, 'content', headers);

    chai.request(app).get('/').end((err, res) => {
      expect(res.text).to.equal('content', 'Response shouldn\'t be affected:');
      expect(res.headers).to.contain(headers);

      done();
    });
  });
});
