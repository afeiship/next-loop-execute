const nx = require('@feizheng/next-js-core2');
const fetch = require('node-fetch');
require('../src/next-loop-execute');

jest.setTimeout(30000);

describe('api.basic test', () => {
  test('nx.loopExecute', function (done) {
    var fetchApi = function ({ count }) {
      console.log('count:', count);
      return fetch('https://api.github.com/users/afeiship').then(res=>res.json());
    }


    nx.loopExecute({
      callback: fetchApi,
      done: function (res) {
        console.log('res:', res);
        return res.count === 3;
      }
    }).then(res=>{
      console.log('DONE:', res);
      done();
    });
  });
});
