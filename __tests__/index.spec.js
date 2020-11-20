(function () {
  require('../src');

  const fetch = require('node-fetch');
  jest.setTimeout(30000);

  describe('api.basic test', () => {
    test('nx.loopExecute', function (done) {
      var fetchApi = function ({ count }) {
        console.log('count:', count);
        return fetch('https://api.github.com/users/afeiship').then((res) => res.json());
      };

      nx.loopExecute({
        callback: fetchApi,
        done: function (res) {
          return res.count === 3;
        }
      }).then((res) => {
        console.log('DONE:', res);
        done();
      });
    });
  });
})();
