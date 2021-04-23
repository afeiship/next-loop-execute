(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var TIMEOUT_ERR = new Error('timeout: loop-execute');
  var DEFAULT_OPTIONS = {
    interval: 200,
    timeout: 30 * 1000,
    done: function (response) {
      return response.ok;
    }
  };

  nx.loopExecute = function (inOptions) {
    var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
    var count = 0;
    if (!options.callback) nx.error('options.callback required!');

    var looper = function (resolve, reject) {
      count++;
      setTimeout(function () {
        options
          .callback({ count: count })
          .then(function (data) {
            var countRes = { count: count, data: data };
            if (!options.done(countRes)) {
              looper(resolve, reject);
            } else {
              resolve(countRes);
            }
          })
          .catch(reject);
      }, options.interval);
    };

    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject(TIMEOUT_ERR);
      }, options.timeout);
      looper(resolve, reject);
    });
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.loopExecute;
  }
})();
