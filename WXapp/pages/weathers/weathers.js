//weathers.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
      loadingHidden:false,
      currentTemperature:'',
      nightAirTemperature:'',
      dayAirTemperature:'',
      weather:'',
      aqi:'',
      quality:'',
      windPower:'',
      windDirection:'',
      list:[],
      height:'',
      time:'',

  },
  onLoad : function (){
      console.log('onLoad')
      var that = this

      wx.getSystemInfo({
      success: function (res) {
        // that.data.height = res.windowHeight;
        that.data.time = util.formatTime2(new Date());
        
      }
    })

      wx.getLocation({
        type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function(res){
          // success
          wx.request({
            url: 'https://route.showapi.com/9-5',
            data: {
                showapi_appid: '11697',
                showapi_sign: '6c0c15c5ec61454dac5288cea2d32881',
                from:'5',
                lng:res.longitude,
                lat:res.latitude,
                needMoreDay:'1',
                needIndex:'1'
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res){
              // success
              console.log(res)
              console.log(res.data.showapi_res_body.now.api)
              that.setData({
                  loadingHidden:true,
                  //  h:res.windowHeight,
                  time:util.formatTime2(new Date()),  
                  currentTemperature:res.data.showapi_res_body.now.temperature,     
                  nightAirTemperature:res.data.showapi_res_body.f1.night_air_temperature,   
                  dayAirTemperature:res.data.showapi_res_body.f1.day_air_temperature,
                  weather: res.data.showapi_res_body.now.weather,
                  aqi: res.data.showapi_res_body.now.aqi,
                  quality: res.data.showapi_res_body.now.aqiDetail.quality,
                  windPower: res.data.showapi_res_body.now.wind_power,
                  windDirection: res.data.showapi_res_body.now.wind_direction,
                  list: [
                    {
                      'day_weather_pic': res.data.showapi_res_body.f1.day_weather_pic,
                      'weekday': res.data.showapi_res_body.f1.weekday,
                      'day_air_temperature': res.data.showapi_res_body.f1.day_air_temperature,
                      'night_air_temperature': res.data.showapi_res_body.f1.night_air_temperature
                    },
                    {
                      'day_weather_pic': res.data.showapi_res_body.f2.day_weather_pic,
                      'weekday': res.data.showapi_res_body.f2.weekday,
                      'day_air_temperature': res.data.showapi_res_body.f2.day_air_temperature,
                      'night_air_temperature': res.data.showapi_res_body.f2.night_air_temperature
                    },
                    {
                      'day_weather_pic': res.data.showapi_res_body.f3.day_weather_pic,
                      'weekday': res.data.showapi_res_body.f3.weekday,
                      'day_air_temperature': res.data.showapi_res_body.f3.day_air_temperature,
                      'night_air_temperature': res.data.showapi_res_body.f3.night_air_temperature
                    },
                    {
                      'day_weather_pic': res.data.showapi_res_body.f4.day_weather_pic,
                      'weekday': res.data.showapi_res_body.f4.weekday,
                      'day_air_temperature': res.data.showapi_res_body.f4.day_air_temperature,
                      'night_air_temperature': res.data.showapi_res_body.f4.night_air_temperature
                    },
                    {
                      'day_weather_pic': res.data.showapi_res_body.f5.day_weather_pic,
                      'weekday': res.data.showapi_res_body.f5.weekday,
                      'day_air_temperature': res.data.showapi_res_body.f5.day_air_temperature,
                      'night_air_temperature': res.data.showapi_res_body.f5.night_air_temperature
                    },
                    {
                      'day_weather_pic': res.data.showapi_res_body.f6.day_weather_pic,
                      'weekday': res.data.showapi_res_body.f6.weekday,
                      'day_air_temperature': res.data.showapi_res_body.f6.day_air_temperature,
                      'night_air_temperature': res.data.showapi_res_body.f6.night_air_temperature
                    },
                    {
                      'day_weather_pic': res.data.showapi_res_body.f7.day_weather_pic,
                      'weekday': res.data.showapi_res_body.f7.weekday,
                      'day_air_temperature': res.data.showapi_res_body.f7.day_air_temperature,
                      'night_air_temperature': res.data.showapi_res_body.f7.night_air_temperature
                    }
              ]
              })
            }
          })
        }
      })
  }
})
