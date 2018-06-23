mui('.mui-scroll-wrapper').scroll({
  indicators: false  //是否显示滚动条，false不显示，
});
// 设置每隔5秒图片自动轮播
mui('.mui-slider').slider({
  interval: 2000
})


function getSearch() {
  // 获取到地址栏中的key 的值，给input框
  var search = decodeURI(location.search);
  // 去除？
  search = search.slice(1);
  // 切分为数组
  var arr = search.split("&");
  var obj = {};
  arr.forEach(function (e) {
    var key = e.split("=")[0];
    var v = e.split("=")[1];
    obj[key] = v;
  })
  // console.log(obj);
  return obj;
}
