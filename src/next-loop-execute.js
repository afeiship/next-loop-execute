(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var DEFAULT_OPTIONS = {
    interval: 200,
    done: function (response) {
      return response.ok;
    }
  };

  nx.loopExecute = function (inOptions) {
    var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
    var count = 0;
    if (!options.callback) nx.error('options.callback required!');

    var looper = function (onResolved, onRejected) {
      count++
      setTimeout(function () {
        options.callback({ count: count }).then(function (res) {
          var countRes = nx.mix({ count: count }, res);
          if (!options.done(countRes)) {
            looper(onResolved, onRejected);
          } else {
            onResolved(countRes);
          }
        }).catch(function (err) {
          onRejected(err);
        });
      }, options.interval);
    };

    return new Promise(function (resolve, reject) {
      looper(resolve, reject)
    });
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.loopExecute;
  }
})();
