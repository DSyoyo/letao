$(function () {
  var page = 1;
  var pageSize = 5;

  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        //console.log(info);
        var html = template("tpl", info);
        $("tbody").html(html);

        // 添加分页功能
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          size: "small",
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        })
      }
    })
  }

  // 添加分类模态框
  $(".addCategory").on("click", function () {
    $("#secondModal").modal("show");
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        //console.log(info);
        var html = template("tpl2", info);
        $(".dropdown-menu").html(html);
      }
    })
  })

  //   - 需要给动态创建的a标签注册点击事件（委托事件）
  // - 获取到a标签的文本内容，设置给button内的drowdown-text
  // 获取到点击的a的id，赋值给一个隐藏的文本框，点击添加的时候，需要把这个id传递到后台
  $(".dropdown-menu").on("click", "a", function () {
    var txt = $(this).text();
    $(".dropdown-text").text(txt);

    var id = $(this).data("id");
   // console.log(id);
    $("[name='categoryId']").val(id);
    // 手动校验通过
    $("form").data("bootstrapValidator").updateStatus("categoryId", "VALID");


  })


  // 初始化上传图片
  $("#fileupload").fileupload({
    dataType: 'json',
    //e :事件对象
    //data: 上传后的结果
    done: function (e, data) {
      //console.log(e);
     // console.log(data.result.picAddr);
      //修改img_box下的img的src
      $(".img_box img").attr("src", data.result.picAddr);
      //给brandLogo赋值
      $("[name='brandLogo']").val(data.result.picAddr);
      $("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  })

  // 表单校验
  $("form").bootstrapValidator({
    // 指定不校验的内容，默认disabled,hidden,not(:visible)不做校验
    excluded: [],
    // 小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类的名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  })

  // 表单校验成功
  $("form").on("success.form.bv",function(e){
    e.preventDefault;
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $("form").serialize(),
      success: function(info){
        //console.log(info);
        $("#secondModal").modal("hide");
        page = 1;
        render();
        // 重置表单
        $("form").data("bootstrapValidator").resetForm(true);
        $(".dropdown-text").text("请选择一级分类");
        $("[name='categoryId']").val("");
        $(".img_box img").attr("src","images/none.png");
        $("[name='brandLogo']").val("");
      }
    })
  })

})