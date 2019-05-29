/**
 * @license
 * Copyright Andrey Chalkin <L2jLiga>. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/request-headers-filter/LICENSE
 */

/// <reference types="node" />

import { IncomingMessage, OutgoingMessage } from 'http';

/**
 * Truncate non-required headers from request
 */
export declare function filterHeaders(incomingMessage: IncomingMessage | OutgoingMessage, headersList: Array<RegExp|string>, save?: boolean): void;

/**
 * Save all or only required headers from request to response
 */
export declare function saveHeaders(incomingMessage: IncomingMessage | OutgoingMessage, serverResponse: OutgoingMessage, headersToSave: string[]): void;
