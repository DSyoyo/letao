
$(function () {

  // 左边一级标题栏
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    success: function (info) {
     // console.log(info);
      $(".first-left ul").html(template("tpl1", info));
       //渲染二级分类，默认渲染i==0的那个
      renderSecond(info.rows[0].id);
    }
  })



  // 二级分类通过一级id来获取
  function renderSecond(id) {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      data: {
        id: id
      },
      success: function (info) {
        //console.log(info);
        $(".second-right ul").html(template("tpl2",info));

      }
    })
  }


  // 点击一级分类，显示对应的二级分类，动态的,要用代理事件

  $(".first-left .mui-scroll").on("click","li",function(){
    //alert("hehhe");
    
    $(this).addClass("now").siblings().removeClass("now");

    var id = $(this).data("id");
    renderSecond(id);

    // 快速回滚到该区域顶部，
    mui('.second-right .mui-scroll-wrapper').scroll().scrollTo(0,0,100)

  })



})