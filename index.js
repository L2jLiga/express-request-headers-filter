'use strict';

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

function filterHeaders(incomingMessage, headersList, save) {
  save = save || false;

  var headers = incomingMessage.headers;
  var regexps = headersList.map(function (headerName) {
    return new RegExp(headerName);
  });

  Object.keys(headers).map(function (header) {
    regexps.some(function (regexp) {
      return regexp.test(header);
    }) ^ save ? delete headers[header] : void 0;
  });
}

exports.filterHeaders = filterHeaders;

/**
 * Save all or only required headers from request to response
 * Usefull for cases when you use transform stream
 * @param {module:http.IncomingMessage} incomingMessage
 * @param {module:http.ServerResponse} serverResponse
 * @param {string[]?} headersToSave
 * @return {void}
 */
function saveHeaders(incomingMessage, serverResponse, headersToSave) {
  incomingMessage.on('response', function (response) {
    // Back-up all required headers
    var savedHeaders = headersToSave
      ? headersToSave.map(function (rawHeader) {
        var header = rawHeader.toLowerCase();
        return [header, response.headers[header]];
      }).filter(function (header) {
        return header[1] !== void 0;
      })
      : Object.keys(response.headers).map(function (header) {
        return [header, response.headers[header]];
      });

    // Clean-up response headers
    for (var k in response.headers) {
      delete response.headers[k];
    }

    // Apply saved headers to response
    savedHeaders.map(function (header) {
      serverResponse.setHeader(header[0], header[1]);
    });
  });
}

exports.saveHeaders = saveHeaders;
