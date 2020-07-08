/*!
 * name: @feizheng/next-loop-execute
 * description: Loop execute for next.
 * homepage: https://github.com/afeiship/next-loop-execute
 * version: 1.0.4
 * date: 2020-07-08T12:10:40.968Z
 * license: MIT
 */

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
        options.callback({ count: count }).then(function (data) {
          var countRes = { count: count, data: data };
          if (!options.done(countRes)) {
            looper(onResolved, onRejected);
          } else {
            onResolved(countRes);
          }
        }).catch(onRejected);
      }, options.interval);
    };

    return new Promise(looper);
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.loopExecute;
  }
})();
