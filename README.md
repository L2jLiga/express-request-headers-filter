## Express request headers filter
Filter headers from request which will be passed to response

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
