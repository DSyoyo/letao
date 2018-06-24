

$(function(){
  $.ajax({
    type: "get",
    url: "/user/queryUserMessage",
    success: function(info) {
      console.log(info);
      if (info.error) {
        location.href = "login.html";
      }
      
      // 不用判断成功
      $(".userinfo").html(template("tpl",info));
    }
  })




  $(".btn-logout").on("click",function() {
    $.ajax({
      type: "get",
      url: "/user/logout",
      success: function(info) {
        console.log(info);
        if (info.success) {
          location.href = "login.html";
        }
      }
    })
  })
})