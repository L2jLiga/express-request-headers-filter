## Express request headers filter
Filter headers from request which will be passed to response

[![npm version](https://badge.fury.io/js/express-request-headers-filter.svg?colorB=brightgreen)](https://www.npmjs.com/package/express-request-headers-filter)
[![npm](https://img.shields.io/npm/dm/express-request-headers-filter.svg?colorB=brightgreen)](https://www.npmjs.com/package/express-request-headers-filter)
[![Dependency Status](https://img.shields.io/david/L2jLiga/express-request-headers-filter.svg)](https://david-dm.org/L2jLiga/express-request-headers-filter)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)
[![Travis-CI](https://travis-ci.com/L2jLiga/express-request-headers-filter.svg?branch=master)](https://travis-ci.com/L2jLiga/express-request-headers-filter)
[![codecov](https://codecov.io/gh/L2jLiga/express-request-headers-filter/branch/master/graph/badge.svg)](https://codecov.io/gh/L2jLiga/express-request-headers-filter)

### Installation

via npm
```
   npm install --save express-request-headers-filter
```
or Yarn
```
   yarn add express-request-headers-filter
```

### Example

```javascript
const express = require('express');
const request = require('request');
const expressRequestHeaders = require('../index');

const app = express();

app.get('/', (req, res) => {
  const requestStream = request('https://github.com/L2jLiga/express-request-headers-filter');

  expressRequestHeaders(requestStream, res, ['content-type', 'cookie']);

  req.pipe(requestStream).pipe(res);
});
```

### Usefull cases

1. When you [want to save several headers](test/filter-headers.spec.js)
1. When you [use Transform stream to change response](test/transform-stream.spec.js)
