## Request headers filter
Filter headers from request which will be passed to new request and/or response

[![npm version](https://badge.fury.io/js/request-headers-filter.svg?colorB=brightgreen)](https://www.npmjs.com/package/request-headers-filter)
[![npm](https://img.shields.io/npm/dm/request-headers-filter.svg?colorB=brightgreen)](https://www.npmjs.com/package/request-headers-filter)
[![Dependency Status](https://img.shields.io/david/L2jLiga/request-headers-filter.svg)](https://david-dm.org/L2jLiga/request-headers-filter)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)
[![Travis-CI](https://travis-ci.com/L2jLiga/request-headers-filter.svg?branch=master)](https://travis-ci.com/L2jLiga/request-headers-filter)
[![codecov](https://codecov.io/gh/L2jLiga/request-headers-filter/branch/master/graph/badge.svg)](https://codecov.io/gh/L2jLiga/request-headers-filter)

### Installation

via npm
```
   npm install --save request-headers-filter
```
or Yarn
```
   yarn add request-headers-filter
```

### Example

```javascript
const express = require('express');
const request = require('request');
const requestHeadersFilter = require('request-headers-filter');

const app = express();

app.get('/', (req, res) => {
  const requestStream = request('https://github.com/L2jLiga/request-headers-filter');

  requestHeadersFilter.saveHeaders(requestStream, res, ['content-type', 'cookie']);

  req.pipe(requestStream).pipe(res);
});
```

### Usefull cases

1. When you [want to save several headers](test/filter-specify-headers-from-response.js)
1. When you [use Transform stream to change response](test/save-headers-with-transform-stream.spec.js)
