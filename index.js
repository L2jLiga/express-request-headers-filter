/**
 * @license
 * Copyright Andrey Chalkin <L2jLiga>. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/request-headers-filter/LICENSE
 */

/**
 * Truncate unrequired headers from request
 * @param {module:http.IncomingMessage} incomingMessage
 * @param {Array<string|RegExp>} headersList
 * @param {boolean?} save
 * @return {void}
 */
function filterHeaders(incomingMessage, headersList, save = false) {
  const headers = incomingMessage.headers;

  regexps = headersList.map(headerName => new RegExp(headerName));

  Object.keys(headers).map(header => {
    regexps.some(regexp => regexp.test(header)) ^ save
      ? delete headers[header]
      : void 0;
  });
}

/**
 * Save all or only required headers from request to response
 * Usefull for cases when you use transform stream
 * @param {module:http.IncomingMessage} incomingMessage
 * @param {module:http.ServerResponse} serverResponse
 * @param {string[]?} headersToSave
 * @return {void}
 */
function saveHeaders(incomingMessage, serverResponse, headersToSave) {
  incomingMessage.on('response', (response) => {
    // Back-up all required headers
    const savedHeaders = headersToSave
      ? headersToSave.map(rawHeader => {
        const header = rawHeader.toLowerCase();

        return [header, response.headers[header]];
      }) : Object.entries(response.headers);

    // Clean-up response headers
    for (let k in response.headers) delete response.headers[k];

    // Apply saved headers to response
    savedHeaders.map(header => {
      serverResponse.setHeader(header[0], header[1]);
    });
  });
}

module.exports = {
  filterHeaders,
  saveHeaders
};
