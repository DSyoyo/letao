$(function(){
  $(".btn-login").on("click",function() {
    var username = $("[type='text']").val();
    if (!username) {
      mui.toast("请输入用户名");
      return;
    }
    var password = $("[type='password']").val();
    if (!password) {
      mui.toast("请输入密码");
    }

    $.ajax({
      type: "post",
      url: "/user/login",
      data: {
        username: username,
        password: password
      },
      success: function (info) {
        console.log(info);
        if (info.error) {
          mui.toast(info.message);
        }
        if (info.success) {
           //如果是直接访问的登录页面，跳转到会员中心
          //如果是购物车页面或者商品详情页面跳转到登录页的，成功之后，需要回跳
          if (location.search.indexOf("?retUrl") > -1) {
            location.href = location.search.replace("?retUrl=","");
          } else {
            location.href = "member.html";
          }
        }
      }
    })

  })


  $(".mui-btn-link").on("click",function(){
    location.href = "register.html";
  })


})