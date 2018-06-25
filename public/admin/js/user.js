require(["jquery","artTemplate","bootstrapPaginator","common"],function($){
  $(function(){
    var page = 1;
    var pageSize = 8;
  
    render();
    function render(){
      $.ajax({
        type: "get",
        url: "/user/queryUser",
        data: {
          page: page,
          pageSize: pageSize
        },
        success: function (info) {
          console.log(info);
          var html = template("tpl",info);
          $("tbody").html(html);
  
          $("#paginator").bootstrapPaginator({
            bootstrapMajorVersion: 3,
            size: "small",
            currentPage: page,
            totalPages: Math.ceil(info.total/info.size),
            onPageClicked: function(a,b,c,p){
              page = p
              render();           
            }
          })
        }
      })
  
    }
   
     
    // 点击禁用，启用按钮，模态框显示
    // 委托事件
    $("tbody").on("click",".btn",function(){
      $("#userModal").modal("show");
      // 获取id
      var id =$(this).parent().data("id");
      //console.log(id);
      var isDelete = $(this).hasClass("btn-success") ? 1:0;
  
      $(".btn-confirm").off().on("click",function(){
        $.ajax({
          type: "post",
          url: "/user/updateUser",
          data: {
            id: id,
            isDelete: isDelete
          },
          success: function(info) {
            //console.log(info);
            if (info.success) {
              $("#userModal").modal("hide");
              render();
            }
  
          }
        })
      })
    })
  })
})

