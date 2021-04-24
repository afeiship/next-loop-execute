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
    var timer = null;
    if (!options.callback) nx.error('options.callback required!');

    if (options.timeout) {
      setTimeout(function () {
        clearInterval(timer);
        Promise.reject('Timeout: loop-execute');
      }, options.timeout);
    }

    return new Promise(function (resolve, reject) {
      timer = setInterval(function () {
        count++;
        options
          .callback({ count: count })
          .then(function (data) {
            var result = { count: count, data: data };
            if (options.done(result)) {
              clearInterval(timer);
              resolve(result);
            }
          })
          .catch(reject);
      }, options.interval);
    });
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.loopExecute;
  }
})();
