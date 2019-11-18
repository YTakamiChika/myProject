//时间校正函数，主要用于js计时器出现的时间误差情况（倒计时或者正计时）
/*
  版本更新 v1.0.1 日期：2019.11.20
  更新日志 修复了开启关闭时候的bug
          给传入的时间增加了一个默认值
 */
function TimeCorrect() {
    this.start = false; //开关
}

/**
 * 校正后的计时函数
 * @param  [Function]fn     传入需要执行的方法
 * @param  [Number]delay    延迟时间
 **/
TimeCorrect.prototype.setInterval = function (fn,delay) {
    //延迟必须为数字类型
    if(isNaN(delay)){
      delay = 1000;
    }
    var context = this;
    context.start = true;
    context.fn = fn;
    context.delay = delay;
    let real_time = delay; //矫正后的执行时间
    function timerNext(){
        const oldtime = new Date().getTime();
        context.timer = setTimeout(() => {
            fn.call(context);
            const newtime = new Date().getTime();
            const dtime = newtime - oldtime;
            real_time = delay + (real_time - dtime);
            if(context.start){
                timerNext();
            }else{
                clearTimeout(context.timer);
            }
        },real_time)
    }
    timerNext();
}

//启动
TimeCorrect.prototype.begin = function () {
    if(this.start) return;
    this.setInterval(this.fn,this.delay);
}


//停止
TimeCorrect.prototype.stop = function () {
    this.start = false;
    clearTimeout(this.timer);
}
