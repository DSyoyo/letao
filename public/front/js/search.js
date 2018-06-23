
$(function () {

  // 1.搜索记录的列表功能
  // 获取localStorage的历史记录
  function getHistory() {
    var history = localStorage.getItem("lt-history") || "[]";
    var arr = JSON.parse(history);
    return arr;
  };
  // 历史记录与模板结合
  function render() {
    var arr = getHistory();
    //console.log(arr);
    $(".lt-history").html(template("tpl", { rows: arr }));
  };

  render();

  // 清空历史记录注册委托事件
  $(".lt-history").on("click", ".btn-empty", function () {

    var history = getHistory();
    localStorage.removeItem(history);
  })

  // 3.删除单条历史记录的功能
  $(".lt-history").on("click", ".btn-delete", function () {
    // alert("11")
    var that = this;
    mui.confirm("你确定要删除吗？", "温馨提示", ["否", "是"], function (e) {
      //console.log(e);
      // 等于1说明要删除，等于0说明不删除
      if (e.index == 1) {
        var index = $(that).data("index");
        var history = getHistory();
        // 删除对应下标的历史记录的信息
        history.splice(index, 1);

        // 重新设置到localStorage
        localStorage.setItem("lt-history", JSON.stringify(history));
        // 重新渲染
        render();
      }

    })


  })

  //4.添加搜索功能

  $(".btn-search").on("click", function () {
    // alert("hhe")
    //  获取到输入文本框的内容
    var txt = $(".lt-search input").val();
    // 若输入的内容为空，提示，并返回
    if (txt == "") {
      mui.toast("请输入搜索关键字");
      return;
    }
    // 清空
    $(".lt-search input").val("");
    // 获取历史记录数组
    var arr = getHistory();
    var index = arr.indexOf(txt); // 第一次出现的下标
    // 判断如果存在删除，把最新的添加到数组第一个
    if (index != -1) {
      arr.splice(index, 1);
    }
    // 如果数组的长度大于等于10，删除最后一个，并把txt添加到数组第一个
    if (arr.length >= 10) {
      arr.pop();
    }
    // 输入的添加到数组的第一个
    arr.unshift(txt);
    // 存储到本地
    localStorage.setItem("lt-history", JSON.stringify(arr));
    // 重新渲染
    render();

    // 跳转页面
    location.href = "searchList.html?key="+txt;
  })

})