/*!
 * name: @jswork/next-loop-execute
 * description: Loop execute for next.
 * homepage: https://github.com/afeiship/next-loop-execute
 * version: 1.0.0
 * date: 2020-11-20 18:45:45
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
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
      count++;
      setTimeout(function () {
        options
          .callback({ count: count })
          .then(function (data) {
            var countRes = { count: count, data: data };
            if (!options.done(countRes)) {
              looper(onResolved, onRejected);
            } else {
              onResolved(countRes);
            }
          })
          .catch(onRejected);
      }, options.interval);
    };

    return new Promise(looper);
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.loopExecute;
  }
})();
