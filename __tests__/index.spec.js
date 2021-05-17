(function () {
  require('../src');

  const fetch = require('node-fetch');
  jest.setTimeout(300000);

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

    test('02-nx.loopExecute will caught err when timeout', (done) => {
      nx.loopExecute({
        interval: 2000,
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

    test.only('03-if interrupt exist will cautht interrupt-err message', (done) => {
      var interruptFlag = false;

      setTimeout(() => {
        interruptFlag = true;
      }, 3000);

      nx.loopExecute({
        interval: 1000,
        timeout: 0,
        interrupt: () => {
          return interruptFlag;
        },
        callback: (data) => {
          console.log(data);
          return fetch('https://api.github.com/users/afeiship').then((res) => res.json());
        },
        done: (res) => {
          return res.count === 10;
        }
      })
        .catch((err) => {
          console.log('after some seconds');
          expect(err.type).toBe('interrupt');
          done();
        })
        .finally(() => {
          done();
        });
    });
  });
})();
