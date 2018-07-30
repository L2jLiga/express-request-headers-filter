/**
 * @license
 * Copyright Andrey Chalkin <L2jLiga>. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/request-headers-filter/LICENSE
 */

import * as http from 'http';

export function filterHeaders(incomingMessage: http.IncomingMessage, headersToFilter?: Array<string|RegExp>, save?: boolean): void;
export function saveHeaders(incomingMessage: http.IncomingMessage, serverResponse: http.ServerResponse, headersToSave?: string[]): void;
