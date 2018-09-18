/**
 * @license
 * Copyright Andrey Chalkin <L2jLiga>. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/request-headers-filter/LICENSE
 */

/// <reference types="node" />
import { IncomingHttpHeaders, IncomingMessage, OutgoingMessage } from 'http';

/**
 * Truncate unrequired headers from request
 */
export declare function filterHeaders(incomingMessage: IncomingHttpHeaders, headersList: string[], save?: boolean): void;

/**
 * Save all or only required headers from request to response
 */
export declare function saveHeaders(incomingMessage: IncomingMessage, serverResponse: OutgoingMessage, headersToSave: string[]): void;
