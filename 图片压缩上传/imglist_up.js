//多张图片上传封装
(function(window){
  var u = {};
  // var imageFilter;
  var _mindex = 0;
  //定义上传成功的图片数
  var _upscu_number = 0;

  /**
   * 上传图片数组
   * @param  [Array]imglist   上传的图片数组
   * @param  [Number]_height     压缩基准
   * @param  [Function] callback   图片全部上传完的回调
   * @param  [boolean] progress  是否需要进度条，默认不需要
   **/
  u.Up = function(imglist,_height,callback,progress){
      // console.warn(JSON.stringify(imglist))
     //先进行图片压缩
     getImgSizeByUrl(imglist[_mindex].path,function(pwidth,pheight){
         var _scale;
        //  console.warn(pwidth+'   '+pheight)
         // var _index = index;
         if(pwidth > _height){
           _scale = (_height / pwidth).toFixed(1)
         }else{
           _scale = 1;
         }
         var _url = imglist[_mindex].path;
         var _name = 'img_highset'+_mindex;
         imgCompress(_url,_name,_scale,function(ret){
              var _path = api.fsDir + '/compress/img_highset'+_mindex+'.png';
              //闭包封装
              (function(_mindex){
                  //上传非缩略图需要显示进度条，此时在ajax中需要将report参数置为ture
                  Service.POSTFiles('files/upload',_path,function(ret,err){
                    // console.log(JSON.stringify(ret))
                   if(ret && ret.status == 0){
                       if(progress){
                          //这里做了图片上传进度条的一种样式，需要结合页面HTML
                          var hide = $api.domAll('.hide')[_mindex];
                          var hide_number = $api.domAll('.hide_number')[_mindex];
                          $api.removeCls(hide, 'not');
                          $api.removeCls(hide_number, 'not');
                          hide.style.height = parseInt(ret.progress) + '%';
                          hide_number.innerHTML = parseInt(ret.progress) + '%';
                       }
                   }else if(ret && ret.status == 1){
                       var _url = ret.body.url;
                       // 上传缩略图
                       Service.POSTFiles('files/upload',imglist[_mindex].thumbPath,function(ret){
                          _upscu_number++;
                          api.hideProgress();
                          if(ret){
                              imglist[_mindex] = {
                                 'url': _url,
                                 'destPath': ret.url,
                                 'type': 2
                              };

                              if(_upscu_number >= imglist.length){
                                  loading.end();
                                  //发布朋友圈
                                  callback(imglist);
                              }
                           }
                       },false,1,1)
                    }else{
                       _upscu_number++;
                    }
                  },false,1,1,true)
              })(_mindex);
              _mindex++;
              //递归执行
              if(_mindex <= imglist.length -1){
                 u.Up(imglist,_height,callback,progress);
              }
         })
     })
  }


  //根据URL获取图片的宽高
  function getImgSizeByUrl(url,callback){
    // 创建对象
    var img = new Image();
    // 改变图片的src
    img.src = url;
     // 定时执行获取宽高
     var check = function(){
        // 只要任何一方大于0
        // 表示已经服务器已经返回宽高
        if(img.width>0 || img.height>0){
            clearInterval(set);
            callback(img.width,img.height)
        }
     };
     var set = setInterval(check,40);
  }

  /**
   * 压缩图片
   * @param  [String]url   压缩的图片地址
   * @param  [String]name     压缩图片的名称
   * @param  [Number]scale    压缩比例
   * @param  [Function]callback   回调函数
   **/
  function imgCompress(url,name,scale,callback){
      var imageFilter = api.require('imageFilter')
      //压缩图片
      imageFilter.compress({
           img: url,
           quality: 1,
           scale: scale,
           save: {
             imgPath: 'fs://compress',
             imgName: name+'.png'
           }
      },function(ret){
         if(ret.status){
            callback(ret)
         }
      })
  }

  window.upImgList = u;

})(window)
