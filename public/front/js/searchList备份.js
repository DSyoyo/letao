
$(function () {

  var page = 1;
  var pageSize = 10;

  function getSearch() {
    // 获取到地址栏中的key 的值，给input框
    var search = decodeURI(location.search);
    // 去除？
    search = search.slice(1);
    // 切分为数组
    var arr = search.split("&");
    var obj = {};
    arr.forEach(function (e) {
      var key = e.split("=")[0];
      var v = e.split("=")[1];
      obj[key] = v;
    })
    // console.log(obj);
    return obj;
  }

  var key = getSearch().key;
  //console.log(key);
  $(".lt-search input").val(key);
  //渲染
  render();

    // 发送ajax，获取搜索的商品数据
    //price	使用价格排序（1升序，2降序）
    //num	产品库存排序（1升序，2降序）
   function render() {
    var obj = {
      proName: key,
      page: page,
      pageSize: pageSize
    }
    var $select = $(".lt-sort li.now");
    if ($select.length >0) {
      console.log("需要排序");
      var type = $select.data("type");
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
       // console.log(info);
      
       setTimeout(function(){
        $(".lt-product").html(template("tpl", info))
       },1000);
      }
    })
   }
  //  2.点击搜索，获取到内容，重新渲染
   $(".lt-search .btn-search").on("click",function(){
    //  重置排序样式，重置span箭头，重置now的类
    $(".lt-sort li").removeClass("now");
    $(".lt-sort li").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
    
     key = $(".lt-search input").val();
     render();
   })

  //  3.点击lt-sort下的自定义属性Li,切换now的类 切换小图标
  $(".lt-sort li[data-type]").on("click",function(){
    if($(this).hasClass("now")){
      $(this).find("span").toggleClass("fa-angle-up").toggleClass("fa-angle-down");
    } else {
      $(this).addClass("now").siblings().removeClass("now");
      $(".lt-sort li span").addClass("fa-angle-down").removeClass("fa-angle-up");
    }
   
    render();



  })





})