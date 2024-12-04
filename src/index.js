import nx from '@jswork/next';

const TIMEOUT_MESSAGE = { type: 'timeout', message: 'Timeout from `next-loop-execute`' };
const INTERRUPT_MESSAGE = { type: 'interrupt', message: 'Interrupt from `next-loop-execute`' };
const DEFAULT_OPTIONS = {
  interval: 200,
  timeout: 30 * 1000,
  interrupt: nx.stubFalse,
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
          var result = { count: count, data: data };
          if (timeout) return reject(TIMEOUT_MESSAGE);
          if (options.interrupt(result)) return reject(INTERRUPT_MESSAGE);
          if (options.done(result)) return resolve(result);
          looper(resolve, reject);
        })
        .catch(reject);
    }, options.interval);
  };

  return new Promise(looper);
};

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = nx.loopExecute;
}

export default nx.loopExecute;
