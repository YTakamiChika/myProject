# 功能描述

  该模块主要提供了一个校验计时器的功能，js的计时器会存在时间不准的问题，因此这里做了校验。

# 依赖的模块

  无，纯js模块。

# 快速使用

  使用流程：直接引入 time_correct.js。 
  
  初始化模块
  var time_correct = new TimeCorrect();

  方法：

  setInterval(fn,delay) //执行计时器

  参数： 

      fn:
        描述：需要执行的方法逻辑
        类型：函数
        默认值：无（必传）

      delay:
        描述：定时器设置的延迟
        类型：数字(毫秒)
        默认值：无（必传）

  示例代码：
  
       var time_correct = new TimeCorrect();
       time_correct.setInterval(function(){
                
       },1000);
  
  begin: //启动计时器
  
  参数：无
  
  示例代码：
  
       var time_correct = new TimeCorrect();
       time_correct.begin();
  
  
  stop:  //停止计时器
  参数：无
    
  示例代码：
  
       var time_correct = new TimeCorrect();
       time_correct.stop();
  

# 特别说明

	本模块为纯js模块，直接引用即可
