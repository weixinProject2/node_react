export const restTime = (givenDate)=>{
  //声明返回的字符串
  let returnString;
  //获得当前时间
  const curDate = new Date();
  //当前时间的时间戳
  const curDateToStamp = +curDate;
  //将传入时间转化为同一标准格式
  const givenDateToStandard = new Date(givenDate);
  //传入时间的时间戳
  const givenDateToStamp = +givenDateToStandard;
  //相差多少秒
  const diffToSecond = (curDateToStamp - givenDateToStamp)/1000;
  /*现在时间小于给出的时间，应该显示还剩多久*/
  if(diffToSecond<0){
    //化为正数
    const diffToSecondToUse = Math.abs(diffToSecond);
    //化为秒
    if(diffToSecondToUse<60){
      returnString = diffToSecondToUse + "秒后";
    }else{
      //化为分钟
      const diffToMinute = diffToSecondToUse/60;
      if(diffToMinute<60){
        returnString =  Math.floor(diffToMinute) + "分钟后";
      }else{
        //化为小时
        const diffToHour =  diffToMinute/60;
        if(diffToHour<24){
          returnString = Math.floor(diffToHour) + "小时后";
        }else{
          //化为天
          const diffToDay = diffToHour/24;
          if(diffToDay<366){
            returnString = Math.floor(diffToDay) + "天后";
          }else{
            returnString = givenDate.getFullYear() - curDate.getFullYear() + "年后"
          }
        }
      }
    }

  }else{
    /*现在时间大于给出的时间，应该显示多久前*/
    //化为正数
    const diffToSecondToUse = diffToSecond;
    //化为秒
    if(diffToSecondToUse<60){
      returnString = diffToSecondToUse + "秒前";
    }else{
      //化为分钟
      const diffToMinute = diffToSecondToUse/60;
      if(diffToMinute<60){
        returnString = Math.round(diffToMinute) + "分钟前";
      }else{
        //化为小时
        const diffToHour =  diffToMinute/60;
        if(diffToHour<24){
          returnString = Math.round(diffToHour) + "小时前";
        }else{
          //化为天
          const diffToDay = diffToHour/24;
          if(diffToDay<31){
            returnString = Math.floor(diffToDay) + "天前";
          }else{
            //化为月
            const diffMonth = diffToDay/30;
            if(diffMonth<12){
              returnString = curDate.getMonth()-givenDateToStandard.getMonth() + "个月前";
            }else{
              //化为年
              returnString = curDate.getFullYear()-givenDateToStandard.getFullYear() + "年前";
            }
          }
        }
      }
    }
  }
  return returnString;
}


