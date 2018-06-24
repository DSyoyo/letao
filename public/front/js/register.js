

$(function () {
  $(".get-code").on("tap", function () {
    //alert("hhe")
    var mobile = $(".mobile").val();
    if (!mobile) {
      mui.toast("手机号不能为空");
      return;
    }
    if (!/^1\d{10}$/.test(mobile)) {
      mui.toast("手机号格式不正确");
      return;
    }
    $(this).text("发送中...").prop("disabled", true).addClass("disabled");

    $.ajax({
      type: "get",
      url: "/user/vCode",
      success: function (info) {
        console.log(info);
        var count = 5;

        var timeId = setInterval(function () {
          count--;
          $(".get-code").text(count + "秒后再次发送");
          if (count <= 0) {
            clearInterval(timeId);
            $(".get-code").text("点击再次发送").prop("disabled", false).removeClass("disabled");
          }
        }, 1000);



      }
    })
  });


  $(".btn-register").on("tap", function () {
    //alert("呵呵");
    var username = $("[name='username']").val();
    if (!username) {
      mui.toast("用户名不能为空");
      return;
    }
    var password = $("[name='password']").val();
    if (!password) {
      mui.toast("密码不能为空");
      return;
    }
    var repass = $("#repass").val();
    if (repass != password) {
      mui.toast("输入密码与确认密码不一致");
      return;
    }
    var mobile = $("[name='mobile']").val();
    if (!mobile) {
      mui.toast("手机号不能为空");
      return;
    }
    if (!/^1\d{10}$/.test(mobile)) {
      mui.toast("手机号格式不正确");
      return;
    }
    var vCode = $("[name='vCode']").val();
    if (!/\d{6}/.test(vCode)) {
      mui.toast("验证码格式不正确");
      return;
    }

    $.ajax({
      type: "post",
      url: "/user/register",
      data: {
        username: username,
        password: password,
        mobile: mobile,
        vCode: vCode
      },
      success: function (info) {
        //console.log(info);
        if (info.error) {
          mui.toast(info.message);
        }
        if (info.success) {
          mui.toast("恭喜你，注册成功，3秒后跳转到登录页面");
          setTimeout(function(){
            location.href = "login.html";
          },3000)
        }
      }
    })
  })

  // 点击立即登录，页面跳转
  $(".register").on("tap",function(){
    location.href = "login.html";
  })




})