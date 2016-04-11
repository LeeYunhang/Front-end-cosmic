class $Promise {
  constructor(task) {
    if (typeof task != 'function' && task !== undefined) {
      throw new TypeError()
    }

    this.tasks = []
    this._error = null
    this.finishCount = 0             //完成任务的数量
    if(typeof task == 'function') {  //类型检测
      this.tasks.push(task)
    }
  }

  then(task) {
    if (typeof task != 'function') {
      throw new TypeError()
    }

    this.tasks.push(task)           //加入新的任务
    return this;
  }

  error(callback) {
    if (typeof callback != 'function') {
      throw new TypeError()
    }

    this._error = callback
    return this;
    this.tasks.push(task)
    return this;
  }

  error(callback) {
    if (typeof callback != 'function') {
      throw new TypeError()
    }

    this._error = callback          //添加错误回调函数
    return this;
  }

  resolve() {
    this.finishCount++   //完成任务数量+1
    var [arr, i, length] = [[], 0, arguments.length]

    for(; i < length; i++) {
      arr.push(arguments[i])
    }

    this.tasks[this.finishCount].apply(null, arr)
  }

  reject(msg) {
    if (typeof this._error == 'function') {
      this._error(msg)
    } else {
      console.error(msg)
    }
  }

  start() {
    var [arr, i, length, self] = [[], 0, arguments.length, this]

    for(; i < length; ++i) {
      arr.push(arguments[i])
    }


    //执行任务
    window.setTimeout(()=>self.tasks[0].apply(null, arr), 0)
    return this;
  }
}
