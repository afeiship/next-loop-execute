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
          expect(res.data.login).toBe('afeiship');
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          done();
        });
    });
  });

  test.only('02-nx.loopExecute will caught err when timeout', (done) => {
    nx.loopExecute({
      interval: 500,
      timeout: 2 * 1000,
      callback: (data) => {
        console.log(data);
        return fetch('https://api.github.com/users/afeiship').then((res) => res.json());
      },
      done: (res) => {
        return res.count === 10;
      }
    })
      .catch((err) => {
        expect(err.type).toBe('timeout');
      })
      .finally(() => {
        done();
      });
  });
})();
