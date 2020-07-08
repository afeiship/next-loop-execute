# next-loop-execute
> Loop execute for next.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @feizheng/next-loop-execute
```

## usage
```js
import '@feizheng/next-loop-execute';

const fetchApi = function ({ count }) {
  return fetch('https://api.github.com/users/afeiship').then(res=>res.json());
}

// loop 3 times:
nx.loopExecute({
  callback: fetchApi,
  done: function (res) {
    return res.count === 3;
  }
}).then(res=>{
  console.log('DONE!', res);
});
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-loop-execute/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@feizheng/next-loop-execute
[version-url]: https://npmjs.org/package/@feizheng/next-loop-execute

[license-image]: https://img.shields.io/npm/l/@feizheng/next-loop-execute
[license-url]: https://github.com/afeiship/next-loop-execute/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@feizheng/next-loop-execute
[size-url]: https://github.com/afeiship/next-loop-execute/blob/master/dist/next-loop-execute.min.js

[download-image]: https://img.shields.io/npm/dm/@feizheng/next-loop-execute
[download-url]: https://www.npmjs.com/package/@feizheng/next-loop-execute
