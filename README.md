# next-loop-execute
> Loop execute for next.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-loop-execute
```

## usage
```js
import '@jswork/next-loop-execute';

const fetchApi = function ({ count }) {
  return fetch('https://api.github.com/users/afeiship').then(res=>res.json());
}

// loop 3 times:
nx.loopExecute({
  interval: 200,
  timeout: 10 * 1000,
  interrupt: (res)=>{
    return false;
  },
  callback: (data) => {
    console.log(data);
    return fetch('https://api.github.com/users/afeiship').then((res) => res.json());
  },
  done: (res) => {
    return res.data.status === 'FINISHED';
  }
}).then((res) => {
  console.log('DONE:', res);
})
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-loop-execute/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-loop-execute
[version-url]: https://npmjs.org/package/@jswork/next-loop-execute

[license-image]: https://img.shields.io/npm/l/@jswork/next-loop-execute
[license-url]: https://github.com/afeiship/next-loop-execute/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-loop-execute
[size-url]: https://github.com/afeiship/next-loop-execute/blob/master/dist/next-loop-execute.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-loop-execute
[download-url]: https://www.npmjs.com/package/@jswork/next-loop-execute
