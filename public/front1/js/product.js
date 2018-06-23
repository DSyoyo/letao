$(function(){
  //1. 获取地址栏中的productId的值
  //2. 发送ajax请求，获取商品的数据
  //3. 结合模版渲染
  var productId = getSearch().productId;
  $.ajax({
    type: 'get',
    url:'/product/queryProductDetail',
    data: {
      id: productId
    },
    success: function(info) {
      /* 
      var temp = info.size.split("-");//30 50
      var tempArray = [];
      for(var i = +temp[0]; i <= temp[1]; i++) {
        tempArray.push(i);
      }
      info.sizeArray = tempArray;
       */
      console.log(info);
      $(".mui-scroll").html( template("tpl", info) );


      //重新初始化轮播图的结构
      mui(".mui-slider").slider({
        interval: 3000
      });

      //支持尺码的选择功能
      $(".proSize span").on("click", function() {
        $(this).addClass("now").siblings().removeClass("now");
      });

      //初始化numbox
      mui(".mui-numbox").numbox()

    }
  })
});