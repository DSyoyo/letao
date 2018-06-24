

$(function () {
  var productId = getSearch().productId;
  $.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    data: {
      id: productId
    },
    success: function (info) {
      console.log(info);
      $(".mui-scroll").html(template("tpl", info));

      // 动态创建的需要手动初始化轮播图
      mui(".mui-slider").slider({
        interval: 1000
      });

      // 选择尺码

      $(".proSize span").on("click", function () {

        $(this).addClass("now").siblings().removeClass("now");
      })
      // 动态创建需要手动初始化
      mui(".mui-numbox").numbox();

    }
  })


  $(".add-cart").on("click", function () {
    //alert("hhe")
    var size = $(".proSize span.now").text();
    if (!size) {
      mui.toast("请选择尺码");
      return false;
    }
    var num = $(".proName input").val();

    $.ajax({
      type: "post",
      url: "/cart/addCart",
      data: {
        productId: productId,
        size: size,
        num: num
      },
      success: function (info) {
        console.log(info);
        if (info.error) {
          //说明没登录,跳转到登录页面, 把当前页的地址传递到了登录页面。
          location.href = "login.html?retUrl=" + location.href;
        }
        if (info.success) {
          mui.confirm("添加成功", "温馨提示", ["去购物车", "继续浏览"], function (e) {
            if (e.index == 0) {
              location.href = cart.html;
            }
          })

        }
      }
    })



  })



})