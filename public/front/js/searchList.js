
$(function () {
  var page = 1;
  var pageSize = 2;

  var key = getSearch().key;
  // console.log(key);
  $(".lt-search input").val(key);


  mui.init({
    pullRefresh: {
      //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      container: ".mui-scroll-wrapper",
      down: {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        callback: function () {
          page = 1;
          render(function (info) {
            $(".lt-product").html(template("tpl", info));
            mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
            //重置上拉加载，保证上拉加载可以继续使用
            mui(".mui-scroll-wrapper").pullRefresh().refresh(true);

          });
        }
      },
      up: {
        auto: true,
        callback: function () {
          page++;
          render(function (info) {
            $(".lt-product").append(template("tpl", info));
            // 没有数据的时候提示，并结束加载事件
            mui(".mui-scroll-wrapper").pullRefresh().endPullupToRefresh(info.data.length == 0);
          });
        }
      }
    }
  });

 
  function render(callback) {
    var obj = {
      proName: key,
      page: page,
      pageSize: pageSize
    };

    //判断是否需要添加price或者是num参数
    var $select = $(".lt-sort li.now");
    if ($select.length > 0) {
      var type = $select.data("type");
      // 使用价格排序（1升序，2降序）
      //	产品库存排序（1升序，2降序）
      var val = $select.find("span").hasClass("fa-angle-down")?2:1;
      obj[type] = val;
    } else {
      console.log("不需要排序");
    }


    $.ajax({
      type: "get",
      url: "/product/queryProduct",
      data: obj,
      success: function (info) {
        //console.log(info);
        setTimeout(function () {
          callback(info);
        }, 1000);
      }
    });

  }

  // 点击搜索按钮，重新刷新

  $(".btn-search").on("click", function () {
    // 需要重置样式
    $(".lt-sort li").removeClass("now");
    $(".lt-sort li").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");

    var key = $(".lt-search input").val();
    mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
  });


  // 点击排序,只能注册tap事件，mui阻止了click

  $(".lt-sort li[data-type]").on("tap",function(){
    // 若有now这个类，只修改span的箭头方向
    if ($(this).hasClass("now")) {
      $(this).find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    } else {
      $(this).addClass("now").siblings().removeClass("now");
      $(this).find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-down");
    }
    // 重置下拉刷新
    mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();

  })


  



})
