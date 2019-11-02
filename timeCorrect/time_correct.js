//时间校正函数，主要用于js计时器出现的时间误差情况（倒计时或者正计时）
function TimeCorrect() {
    this.start = true; //开关
}

/**
 * 校正后的计时函数
 * @param  [Function]fn     传入需要执行的方法
 * @param  [Number]delay    延迟时间
 **/
TimeCorrect.prototype.setInterval = function (fn,delay) {
    //延迟必须为数字类型
    if(isNaN(delay))  return;
    var context = this;

    let real_time = delay; //矫正后的执行时间
    function timerNext(){
        fn.call(context);
        const oldtime = new Date().getTime();
        let timer = setTimeout(() => {
            const newtime = new Date().getTime();
            const dtime = newtime - oldtime;
            real_time = delay + (real_time - dtime);
            if(context.start){
                timerNext();
            }else{
                clearTimeout(timer);
            }
        },real_time)
    }
    timerNext();
}

//启动
TimeCorrect.prototype.begin = function (fn,delay) {
    if(this.start) return;
    this.start = true;
    this.setInterval(fn,delay);
}


//停止
TimeCorrect.prototype.stop = function () {
    this.start = false;
}


