
$(function () {
  page = 1;
  pageSize = 2;

  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        var html = template("tpl", info);
        $("tbody").html(html);

        // 分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          size: "small",
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          // 可以对每个操作按钮内容进行显示控制。
          itemTexts: function (type, page, current) {
            //console.log(type,page,current);
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "page":
                return page;
              case "next":
                return "下一页";
              case "last":
                return "尾页";
            }
          },
          // 控制每个操作按钮的显示文字
          tooltipTitles: function (type, page, current) {
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "page":
                return page;
              case "next":
                return "下一页";
              case "last":
                return "尾页";
            }
          },
          useBootstrapTooltip: true,
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        })
      }
    })
  }

  // 点击添加按钮显示模态框 发送ajax请求，把数据渲染到下拉框

  $(".btn-add").on("click", function () {
    $("#productModal").modal("show");
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        //console.log(info);
        $(".dropdown-menu").html(template("tpl2", info));
      }
    })

  })
  // 给动态的a注册点击事件，获取文本，id
  $(".dropdown-menu").on("click", "a", function () {
    var txt = $(this).text();
    $(".dropdown-text").text(txt);

    var id = $(this).data("id");
    $("[name='brandId']").val(id);

    // 手动通过校验
    $("form").data("bootstrapValidator").updateStatus("brandId", "VALID");

  })

  // 定义一个空数组，存放上传的三张图片的名字和地址
  var imgs = [];
  // 初始化上传图片
  $("#fileupload").fileupload({
    dataType: "json",
    done: function (e, data) {
      //console.log(data.result);

      if (imgs.length >= 3) {
        return;
      }
      // 得到图片地址设置给img_box
      $(".img_box").append('<img src="' + data.result.picAddr + '" width="100" height="100" alt="">');

      imgs.push(data.result);
      // 需要先校验brandLogo，才能手动设置校验通过或不通过
      if (imgs.length === 3) {
        $("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
      } else {
        $("form").data("bootstrapValidator").updateStatus("brandLogo", "INVALID");
      }
    }


  })

  // 表单校验
  $("form").bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品的库存"
          },
          regexp: {
            regexp: /^\d{1,5}$/,
            message: "最大库存不能超过99999"
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: "请输入合法的尺码，例如: 34-42"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品的价格"
          }
        }
      },
      // 图片上传要校验
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }
  })

  // 注册表单校验成功事件

  $("form").on("success.form.bv", function (e) {
    e.preventDefault();
    var param = $("form").serialize();
    param += "&picName1=" + imgs[0].picName + "&picAddr1=" + imgs[0].picAddr;
    param += "&picName2=" + imgs[1].picName + "&picAddr2=" + imgs[1].picAddr;
    param += "&picName3=" + imgs[2].picName + "&picAddr3=" + imgs[2].picAddr;
    // & picName1="1.jpg" & picAddr1="images/1.jpg"
    //   & picName2="2.jpg" & picAddr2="images/2.jpg"
    //     & picName3="3.jpg" & picAddr3="images/3.jpg"
    

    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: param,
      success: function (info) {
        //console.log(info);

        // 隐藏模态框
        $("productModal").modal("hide");
        page = 1;
        render();

        // 重置表单信息
        $("form").data("bootstrapValidator").resetForm(true);

        $(".dropdown-text").text("");
        $("[name='brandId']").val("");

        $(".img_box img").remove();
        imgs = [];
      }
    })
  })

})