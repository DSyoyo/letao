var myLib = {
  valid: function () {
    $("form").bootstrapValidator({
      //2. 指定校验时的图标显示，默认是bootstrap风格
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      //3. 指定校验字段
      fields: {
        username: {
          validators: {
            notEmpty: {
              message: "用户名不能为空"
            },
            stringLength: {
              min: 3,
              max: 9,
              message: "用户名长度3-9位"
            },
            callback: {
              message: "用户名不存在"
            }
          }
        },
        password: {
          validators: {
            notEmpty: {
              message: "用户密码不能为空"
            },
            stringLength: {
              min: 6,
              max: 12,
              message: "用户密码长度为6-12位"
            },
            callback: {
              message: "密码错误"
            }
          }
        }
      }
    })
  },
  validSuccess: function () {
    $("form").on("success.form.bv", function (e) {
      e.preventDefault();
      //使用ajax提交逻辑
      $.ajax({
        type: "post",
        url: "/employee/employeeLogin",
        data: $("form").serialize(),
        success: function (info) {
          console.log(info);
          if (info.success) {
            location.href = "index.html";
          }
          if (info.error === 1000) {
            //alert("用户名不存在");
            $("form").data('bootstrapValidator').updateStatus("username", "INVALID", "callback");
          }
          if (info.error === 1001) {
            //alert("密码错误");
            $("form").data('bootstrapValidator').updateStatus("password", "INVALID", "callback");
          }
        }
      })
    });
  },
  reset: function() {
    $("[type='reset']").on("click",function(){
      $("form").data('bootstrapValidator').resetForm();
    })
  }
}

$(function () {
  // 表单校验插件
 myLib.valid();
 myLib.validSuccess();
 myLib.reset();
})




