// 公共的功能
// 进度条d 进度环隐藏
NProgress.configure({ showSpinner: false });

$(document).ajaxStart(function () {
  //console.log("ajaxStart在开始一个ajax请求时触发");
  // 开启进度条
  NProgress.start();
});
$(document).ajaxStop(function () {
  //console.log("ajaxStop在结束一个ajax请求时触发");
  // 结束进度条
  NProgress.done();
});




// 主页公共类
// 侧边栏的显示隐藏
$(".icon-list").on("click",function(){
  $(".lt-aside").toggleClass("now");
  $(".lt-info").toggleClass("now");
})

// 一级，二级菜单的显示与隐藏
$(".list").prev().on("click",function(){
  $(".list").slideToggle();
})

// 退出登录
$(".icon-logout").on("click",function(){
  // alert("heh")
  // 模态框显示
  $("#logoutModal").modal("show");

  $(".btn-logout").off().on("click",function(){
    // 发送ajax请求
    $.ajax({
      type:"get",
      url: "/employee/employeeLogout",
      success: function(info){
        console.log(info);
        // 若退出成功，跳转登录页面
        if (info.success) {
          location.href = "login.html";
        }
      }
    })
  })


 
})