'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $Promise = function () {
  function $Promise(task) {
    _classCallCheck(this, $Promise);

    if (typeof task != 'function' && task !== undefined) {
      throw new TypeError();
    }

    this.tasks = [];
    this._error = null;
    this.finishCount = 0; //完成任务的数量
    if (typeof task == 'function') {
      //类型检测
      this.tasks.push(task);
    }
  }

  _createClass($Promise, [{
    key: 'then',
    value: function then(task) {
      if (typeof task != 'function') {
        throw new TypeError();
      }

      this.tasks.push(task); //加入新的任务
      return this;
    }
  }, {
    key: 'error',
    value: function error(callback) {
      if (typeof callback != 'function') {
        throw new TypeError();
      }

      this._error = callback;
      return this;
      this.tasks.push(task);
      return this;
    }
  }, {
    key: 'error',
    value: function error(callback) {
      if (typeof callback != 'function') {
        throw new TypeError();
      }

      this._error = callback; //添加错误回调函数
      return this;
    }
  }, {
    key: 'resolve',
    value: function resolve() {
      this.finishCount++; //完成任务数量+1
      var arr = [];
      var i = 0;
      var length = arguments.length;


      for (; i < length; i++) {
        arr.push(arguments[i]);
      }

      this.tasks[this.finishCount].apply(null, arr);
    }
  }, {
    key: 'reject',
    value: function reject(msg) {
      if (typeof this._error == 'function') {
        this._error(msg);
      } else {
        console.error(msg);
      }
    }
  }, {
    key: 'start',
    value: function start() {
      var arr = [];
      var i = 0;
      var length = arguments.length;
      var self = this;


      for (; i < length; ++i) {
        arr.push(arguments[i]);
      }

      //执行任务
      window.setTimeout(function () {
        return self.tasks[0].apply(null, arr);
      }, 0);
      return this;
    }
  }]);

  return $Promise;
}();
