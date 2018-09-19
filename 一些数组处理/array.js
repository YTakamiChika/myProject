/**
 * 多级JSON数组解析，赋值某一项数据
 * @param  [Array] arr  必传，需要解析的数组
 * @param  [String] field1   必传，内层数组位于的字段
 * @param  [String] field2   必传，需要赋值的字段
 * @param  [Value] value   必传，赋值内容，类型不限
 **/
function ArrayResolve(arr,field1,field2,value){
    for(var i in arr){
       arr[i][field2] = value;
       if(arr[i][field1] instanceof Array){
          ArrayResolve(arr[i][field1],field1,field2,value)
       }
    }
}

//多级数组条件赋值
function setValueInArray(arr,value,power){
   if(arr instanceof Array){
      for(var i in arr){
         if(arr[i].id == value){
            arr[i].isselecton = true;
            arr[i].type = power;
            break;
         }
         if(arr[i].sondept instanceof Array){
            setValueInArray(arr[i].sondept,value,power);
         }
      }
   }else if(arr instanceof Object){
      if(arr.id == value){
         arr.isselecton = true;
         arr.type = power;
      }else{
         setValueInArray(arr.sondept,value,power);
      }
   }
}

//从JSON多级数组中获取提出数组
function fnGetArray(object,field,field2){
   if(object instanceof Array){
      for(var i in object){
         if(object[i][field] && object[i][field] instanceof Array){
           result_data = result_data.concat(object[i][field]);
         }
         if(object[i][field2] && object[i][field2] instanceof Array){
           fnGetArray(object[i][field2],field,field2)
         }
      }
   }else if(object instanceof Object){
     result_data = object[field];
     fnGetArray(object[field2],field,field2)
   }
}

//深拷贝数组
function objDeepCopy(source){
    var sourceCopy = source instanceof Array ? [] : {};
    for (var item in source) sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
    return sourceCopy;
}

/*
 * @description    根据某个字段实现对json数组的排序
 * @param   array  要排序的json数组对象
 * @param   field  排序字段（此参数必须为字符串）
 * @param   reverse 是否倒序（默认为false）
 * @return  array  返回排序后的json数组
 */
function jsonSort(array, field, reverse) {
    // console.log(JSON.stringify(array))
    //数组长度小于2 或 没有指定排序字段 或 不是json格式数据
    if (array.length < 2 || !field || typeof array[0] !== "object") return array;
    //数字类型排序
    if (typeof array[0][field] === "number") {
        array.sort(function(x, y) {
            return x[field] - y[field]
        });
    }
    //字符串类型排序
    if (typeof array[0][field] === "string") {
        array.sort(function(x, y) {
              if(x[field]){
                return x[field].localeCompare(y[field])
              }
        });
    }
    //倒序
    if (reverse) {
        array.reverse();
    }
    return array;
}
