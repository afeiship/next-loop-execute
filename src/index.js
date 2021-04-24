(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
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
    var timeout = false;

    if (options.timeout) {
      setTimeout(function () {
        timeout = true;
      }, options.timeout);
    }

    var looper = function (resolve, reject) {
      count++;
      setTimeout(function () {
        options
          .callback({ count: count })
          .then(function (data) {
            var result = { count: count, timeout: timeout, data: data };
            if (options.done(result) || timeout) {
              resolve(result);
            } else {
              looper(resolve, reject);
            }
          })
          .catch(reject);
      }, options.interval);
    };

    return new Promise(looper);
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.loopExecute;
  }
})();
