(function () {
  require('../src');

  const fetch = require('node-fetch');
  jest.setTimeout(30000);

  describe('00-api.basic test', () => {
    test('01 - nx.loopExecute should get data', function (done) {
      nx.loopExecute({
        interval: 1000,
        timeout: 10 * 1000,
        callback: (data) => {
          console.log(data);
          return fetch('https://api.github.com/users/afeiship').then((res) => res.json());
        },
        done: (res) => {
          return res.count === 3;
        }
      })
        .then((res) => {
          expect(typeof res.data).toBe('object');
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          done();
        });
    });
  });

  test('02-nx.loopExecute will caught err when timeout', () => {
    var timeoutErr = () => {
      nx.loopExecute({
        interval: 1000,
        timeout: 2 * 1000,
        callback: (data) => {
          console.log(data);
          return fetch('https://api.github.com/users/afeiship').then((res) => res.json());
        },
        done: (res) => {
          return res.count === 10;
        }
      }).finally(() => {
        expect(timeoutErr).toThrow();
        done();
      });
    };
  });
})();
