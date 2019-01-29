<style scoped>
page {
  background: #fff;
}

.container {
  height: 100vh;
}

.title_wrap{
  padding: 30rpx 20rpx;
  font-size: 24rpx;
}
.title{
  font-size: 40rpx;
}
.sub_title{
  margin: 10rpx 0 0;
}

.date_wrap{
  display: flex;
  justify-content: space-around;
}
.left, .right{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70rpx;
  height: 114rpx;
}
.left_arrow, .right_arrow{
  width: 12rpx;
  height: 22rpx;
  /* background: gray; */
}

.date_item{
  position: relative;
  flex-grow: 1;
  padding: 30rpx 0 0;
  font-size: 24rpx;
  text-align: center;
}
.date_select{
  position: absolute;
  left: calc(50% - 22rpx);
  bottom: -34rpx;
  border: 25rpx solid transparent;
  border-top: 25rpx solid #10325f;
}

.time_list{
  padding: 36rpx 16rpx 16rpx 36rpx;
}
.time_row{
  margin-bottom: 24rpx;
}
.time_item{
  position: relative;
  width: 210rpx;
  height: 76rpx;
  line-height: 76rpx;
  margin-right: 20rpx;
  border: 2rpx solid #868b8f;
  border-radius: 10rpx;
  font-size: 28rpx;
  text-align: center;
}
.time_no{
  border: 2rpx solid #e9e9e9;  
}
.time_select_img{
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50rpx;
  height: 50rpx; 
}
.i_time_check{
  position: absolute;
  right: 2rpx;
  bottom: 4rpx;
  width: 20rpx;
  height: 16rpx;
}

.stylist_item{
  padding: 10rpx 20rpx;
  border-top: 2rpx solid #eee;
}
.stylist_img_wrap{
  position: relative;
}
.stylist_img{
  width: 148rpx;
  height: 148rpx;
  margin-right: 10rpx;
  border-radius: 18rpx;
  background: gray;
}
.stylist_status{
  position: absolute;
  left: calc(50% - 52rpx);
  bottom: 0;
  width: 104rpx;
  height: 28rpx;
  line-height: 28rpx;
  border-radius: 14rpx;
  font-size: 20rpx;
  text-align: center;
}

.bottom_bar{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  font-size: 32rpx;
  text-align: center;
}
.bottom_desc{
  flex-grow: 1;
  line-height: 98rpx;
}
.submit_btn{
  width: 320rpx;
  height: 98rpx;
  line-height: 98rpx;
}


.clear{
  line-height: 1;
  border: none;
}



.flex {
  display: flex;
  align-items: center;
}

.arrow {
  width: 16rpx;
  height: 26rpx;
}


.between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.s-fc-1{ color: #fff; }
.s-fc-2{ color: #222; }
.s-fc-3{ color: #8e939a; }
.s-fc-4{ color: #10325f; }
.s-fc-5{ color: #949494; }

.s-bg-1{ background: #fff; }
.s-bg-2{ background: #f4f4f4; }
.s-bg-3{ background: #999; }
.s-bg-4{ background: #10325f; }
</style>

<template>
  <view class="container s-bg-2">

    <view class='title_wrap s-bg-1 s-fc-3'>
      <view class='title s-fc-2'>{{title}}</view>
      <view class='sub_title'>{{subTitle}}</view>
    </view>

    <view class='date_wrap s-bg-2'>
      <view class='left'>
        <image class='left_arrow' src='{{leftArrowURL}}' mode='aspectFill' />
      </view>

      <repeat for='{{dateList}}' wx:key='index'>
        <view class="date_item {{time.dateIndex === index ? 's-fc-1 s-bg-4' : 's-fc-5 s-bg-2'}}" @tap='selectDate({{index}})'>
          <view>{{item.date}}</view>
          <view>{{item.fullDay}}</view>
          <view class='date_select' wx:if='{{time.dateIndex === index}}'></view>
        </view>
      </repeat>

      <view class='right'>
        <image class='right_arrow' src='{{rightArrowURL}}' mode='aspectFill' />
      </view>
    </view>

    <!-- Time -->
    <view class='time_list s-bg-1'>
      <repeat for='{{timeList}}' item='row' index='i' wx:key='index'>
        <view class='time_row flex'>

          <repeat for='{{row}}' wx:key='index'>

            <view class="time_item {{ item.canSelect ? time.dateSelectIndex === time.dateIndex && time.timeIndex[0] === i && time.timeIndex[1] === index ? 'time_select' : 's-fc-2 s-bg-1' : 'time_no s-fc-3 s-bg-2'}}" @tap='selectTime({{i}}, {{index}})'>
              <view>{{item.time}}</view>
              <view wx:if='{{time.dateSelectIndex === time.dateIndex && time.timeIndex[0] === i && time.timeIndex[1] === index}}'>
                <image class='time_select_img' src='../../images/select/time_sel.png' mode='aspectFill' />
                <image class='i_time_check' src='{{checkURL}}' mode='aspectFill' />
              </view>
            </view>
            
          </repeat>

        </view>
      </repeat>
    </view>

    <!-- footer -->
    <view class='bottom_bar'>
      <view class='bottom_desc s-fc-4 s-bg-1'>{{selectText}}</view>
      <view class='submit_btn s-fc-1 s-bg-4' @tap='goSubmit'>{{submitText}}</view>
    </view>

  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";

export default class Mine extends wepy.page {
  config = {
    navigationBarTitleText: "预约时间"
  };
  data = {
    title: '服务时间',
    subTitle: '请选择服务时间，以便我们更好地为您服务',
    submitText: '确认下单',
    leftArrowURL: '../../images/select/left_arrow.png',
    rightArrowURL: '../../images/select/right_arrow.png',
    checkURL: '../../images/select/check.png',
    store_id: null, // param
    storegc_id: null,
    param: {},
    //
    time: {
      dateIndex : null,
      date: null,
      dateSelectIndex: null,
      dateSelect: null,
      timeIndex: [],
      time: null
    },
    dateList: [],
    currentPage: 1,
    limit: 10,
    list: [],
    total: 0,
    dayList: [
      { id: 1, value: '周一' }, 
      { id: 2, value: '周二' }, 
      { id: 3, value: '周三' },
      { id: 4, value: '周四' },
      { id: 5, value: '周五' },
      { id: 6, value: '周六' },
      { id: 7, value: '周日' },
    ],
  };

  computed = {
    selectText(){
      let t = this.time,
          text = '您已选择:';

      if(t && t.dateSelectIndex != null){
        // console.error(t.dateSelect, t.time);
        text = `${text} ${t.dateSelect.date} ${t.time.time}`;
      }

      return text;
      
    },
    timeList(){ 
      return this.time.dateIndex != null ? this.format(this.dateList[this.time.dateIndex]) : []; 
    }
  }

  components = {};

  onLoad(options) {
    this.param = JSON.parse(decodeURIComponent(options.stylist));
    console.error(options, this.param);

    if(options.referer){
      this.referer = options.referer;
      this.time = JSON.parse(options.time);
    }

    this.initDate();
  }

  onShow() {
    
  }

  methods = {
    selectDate(index){
      this.time.dateIndex = index;
      this.time.date = this.dateList[index];
    },
    selectTime(i, index){
      let time = this.time;

      if(!this.timeList[i][index].canSelect) return ;

      time.dateSelectIndex = time.dateIndex;
      time.dateSelect = time.date;
      time.timeIndex = [i, index];
      time.time = this.timeList[i][index];
    },
    goSubmit(){
      if(!this.time.time) return wx.showModal({ content: '请选择预约时间', showCancel: false });
      // console.error(this.time);

      if(this.referer){
        wx.setStorageSync('time', this.time);
        return wx.navigateBack({ detail: 1 });
      }

      let param = JSON.stringify(this.time);
      wx.navigateTo({ url: `/pages/order/submit?stylist=${encodeURIComponent(JSON.stringify(this.param))}&time=${param}` });
    }

  };

  // async getList(){
  //     let res = {
  //       data: [
  //         { date: '1-11', day: '5' },
  //       ]
  //     }; // await api.getList();

  //     if(res && res.data){

  //       res.data.forEach(v => {
  //       });

  //       this.dateList = res.data;
  //       // this.total = res.pagination && res.pagination.total || this.list.length;
  //     }
      
  //     this.$apply();
  // }

  initDate(){
    let date = new Date(),
        list = this.param.appointment_status,
        dateList = [];
      
    // for(let i = 0; i < 5; i++){
      
    //   dateList.push({ 
    //     fullDate: `${date.getFullYear()}-${date.getMonth() < 9 ? '0' : ''}${date.getMonth() + 1}-${date.getDate()}`,
    //     date: `${date.getMonth() < 9 ? '0' : ''}${date.getMonth() + 1}-${date.getDate()}`,
    //     day: date.getDay(), 
    //     timeList: null 
    //   });

    //   date.setTime(date.getTime() + 1000 * 60 * 60 * 24);
    // }
    dateList = list.map(v => {
      return { 
        fullDate: v.date, 
        date: v.date.replace(/\d{4}-/g, ''), 
        day: parseInt(v.datew), 
        fullDay: this.dayList.filter(day => day.id == v.datew)[0].value,
        // timeList: v.appointment.map(v => { return { time: v } }),
        timeList: v.work ? this.param.appointment_frame.map(v => { return { time: v }; }) : [],
      };
    });

    // from submit
    if(this.referer !== 'submit'){
      this.time.date = dateList[0];
      this.time.dateIndex = 0;
    }

    this.dateList = dateList;
  }
  
  format(date){
    let new_arr = [];

    date.timeList.forEach((v, i) => {
      v.canSelect = new Date(`${date.fullDate.replace(/-/g, '/')} ${v.time}`).getTime() > Date.now();

      i % 3 === 0 ? new_arr.push([v]) : new_arr[new_arr.length - 1].push(v); 
    });

    return new_arr; 
  }

}
</script>