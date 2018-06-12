import wepy from 'wepy';


const getdate = (time) => {
  let d1 = time
  if (typeof (time) === 'string') {
    d1 = new Date(time);
  } else {
    d1 = time;
  }
  let year = d1.getFullYear();
  let month = d1.getMonth() + 1;
  let day = d1.getDate();
  if (month < 10) {
    month = "0" + month
  }
  if (day < 10) {
    day = "0" + day
  }
  return year + "-" + month + "-" + day
}

const getweek = (times) => {
  let week = "";
  let day = "";
  let date = "";
  if (typeof times === 'string' || typeof date === "number") {
    date = new Date(times);
  } else {
    date = times;
  }
  if ( date.getDate()  == new Date().getDate()) {
    day = 7;
  } else {
    day = new Date(date).getDay();
  }
  switch (day) {
    case 7:
      week = "今天";
      break;
    case 0:
      week = "周日";
      break;
    case 1:
      week = "周一";
      break;
    case 2:
      week = "周二";
      break;
    case 3:
      week = "周三";
      break;
    case 4:
      week = "周四";
      break;
    case 5:
      week = "周五";
      break;
    case 6:
      week = "周六";
      break;
      default: break;  
  }
  return week;
}
export {
  getdate,
  getweek
};