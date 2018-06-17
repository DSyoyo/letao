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