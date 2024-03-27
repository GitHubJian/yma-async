# YMA Async

并发控制

## Install

```sh
npm install yma-async
```

## Usage

```js
const aLimit = require('yma-async');
const alimit = aLimit(3); // alimit(promise)
const res = Prmise.all([
    alimit(() => {}),
    alimit(() => {}),
    alimit(() => {}),
    alimit(() => {}),
    alimit(() => {}),
]);
```
