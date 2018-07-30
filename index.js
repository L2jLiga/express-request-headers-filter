/**
 * @license
 * Copyright Andrey Chalkin <L2jLiga>. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/request-headers-filter/LICENSE
 */

/**
 * Truncate unrequired headers from response and apply it to express response
 * @param {module.http.IncomingMessage} req
 * @param {module:http.ServerResponse} res
 * @param {string[]?} headersToSave
 * @return {void}
 */
function requestHeadersFilter(req, res, headersToSave) {
  req.on('response', (reply) => {
    // Back-up all required headers
    const savedHeaders = headersToSave
      ? headersToSave.map(rawHeader => {
        const header = rawHeader.toLowerCase();

        return [header, reply.headers[header]]
      }) : Object.entries(reply.headers);

    // Clean-up reply headers
    for (let k in reply.headers) delete reply.headers[k];

    // Apply saved headers to response
    savedHeaders.map(header => {
      res.setHeader(header[0], header[1]);
    });
  });
}

module.exports = requestHeadersFilter;
