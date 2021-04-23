(function () {
  require('../src');

  const fetch = require('node-fetch');
  jest.setTimeout(30000);

  describe('api.basic test', () => {
    test('nx.loopExecute', function (done) {
      nx.loopExecute({
        timeout: 2000,
        callback: (data) => {
          console.log(data);
          return fetch('https://api.github.com/users/afeiship').then((res) => res.json());
        },
        done: (res) => {
          return res.count === 20;
        }
      })
        .then((res) => {
          console.log('DONE:', res);
          done();
        })
        .catch((err) => {
          console.log('err', err);
          done();
        });
    });
  });
})();
