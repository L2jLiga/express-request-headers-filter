/**
 * @license
 * Copyright Andrey Chalkin <L2jLiga>. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/request-headers-filter/LICENSE
 */

'use strict';

exports.filterHeaders = filterHeaders;
exports.saveHeaders = saveHeaders;

/**
 * Truncate unrequired headers from request
 * @param {module:http.IncomingMessage} incomingMessage
 * @param {Array<string|RegExp>} headersList
 * @param {boolean?} save
 * @return {void}
 */
function filterHeaders(incomingMessage, headersList, save) {
  save = Boolean(save);

  var headers = incomingMessage.headers;
  var regexps = headersList.map(toRegExp);

  Object.keys(headers).map(function (header) {
    regexps.some(function (regexp) {
      return regexp.test(header);
    }) ^ save ? delete headers[header] : void 0;
  });
}

/**
 * @param {string|RegExp} value
 * @return {RegExp}
 */
function toRegExp(value) {
  return new RegExp(value);
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
  incomingMessage.on('response', function (response) {
    var headers = response.headers;
    response.headers = {};

    (headersToSave || Object.keys(headers)).forEach(function (header) {
      header = header.toLocaleLowerCase();
      var value = headers[header];

      if (value !== void 0) serverResponse.setHeader(header, value);
    });
  });
}
