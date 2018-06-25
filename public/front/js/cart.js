
$(function () {
  //1. 下拉刷新，上拉加载
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，
      down: {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        callback: function () {
          $.ajax({
            type: "get",
            url: "/cart/queryCart",
            success: function (info) {
              console.log(info);
              // 若失败，说明没登录，把当前地址传到登录页
              setTimeout(function () {
                if (info.error == 400) {
                  location.href = "login.html?retUrl=" + location.href;
                }
                // 数据与模板结合由于是数组，需要用对象包裹
                var html = template("tpl", { rows: info })
                $(".mui-table-view").html(html);

                // 结束刷新
                mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();

              }, 1000)

            }
          })
        }
      }
    }
  });


  // 2.点击删除按钮删除

  $(".mui-table-view").on("tap", ".btn-delete", function () {
    //alert("hhe");
    var id = $(this).data("id");

    mui.confirm("你确定要删除这件商品吗？", "温馨提示", ["否", "是"], function (e) {
      //console.log(e.index);
      if (e.index == 1) {
        $.ajax({
          type: "get",
          url: "/cart/deleteCart",
          data: {
            id: id
          },
          success: function (info) {
            //console.log(info);
            if (info.success) {
              // 重新刷新
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        })
      }
    })
  })

  //3.点击选中的，计算总金额
  $("body").on("change", ".ck", function () {

    var total = 0;
    $(":checked").each(function () {
      var num = $(this).data("num");
      var price = $(this).data("price");
      total += num * price;
    })

    total = total.toFixed(2);
    $(".lt-total span").text(total);

  })

  //4.修改购物车功能

  $(".mui-table-view").on("tap", ".btn-edit", function () {
    var data = this.dataset;
   // console.log(data);
    var html = template("tpl2", data);
    // 去掉所有的换行
    html = html.replace(/\n/g, "");

    mui.confirm(html, "编辑商品", ["确定", "取消"], function (e) {
      if (e.index == 0) {
        var id = data.id;
        var size = $(".proSize span.now").text();
        var num = $(".mui-numbox-input").val();

        $.ajax({
          type: "post",
          url: "/cart/updateCart",
          data: {
            id: id,
            size: size,
            num: num
          },
          success: function (info) {
            console.log(info);
            if(info.success) {
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        });
      }

    })
    // 给尺码注册点击事件
    $(".proSize span").on("tap", function(){
      
      $(this).addClass("now").siblings().removeClass("now");
    })

    //numbox也需要重新初始化
    mui(".mui-numbox").numbox();
  })





})