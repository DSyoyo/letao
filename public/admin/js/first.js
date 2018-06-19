$(function () {
  var page = 1;
  var pageSize = 5;

  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        var html = template("tpl", info);
        $("tbody").html(html);

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          size: "small",
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, p) {
            page = p
            render();
          }
        })
      }
    })
  }


  // 点击添加按钮，添加分类模态框显示
  $(".addCategory").on("click", function () {
    $("#addModal").modal("show");

  })

  // 表单校验功能

  $("form").bootstrapValidator({
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "请输入一级分类的名称"
          }
        }
      }
    }

  })

  // 注册校验成功事件
  $("form").on("success.form.bv",function(e){
    e.preventDefault;
    
      $.ajax({
        type: "post",
        url: "/category/addTopCategory",
        data: $("form").serialize(),
        success: function (info) {
          //console.log(info);
          if (info.success) {
            // 模态框隐藏，重新渲染第一页
            $("#addModal").modal("hide");
            page = 1;
            render();
  
            // 重置表单
           $("form").data("bootstrapValidator").reset();
          }
        }
      })
    
  })



  
})