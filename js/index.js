//下面是header区域的JS文件
var dom = new Tool();
var explain = document.getElementById("explain");
var headerList = dom.getElementsByClassName(explain, "header-list");
for (var i = 0; i < headerList.length; i++) {
  headerList[i].onmouseover = function (e) {
    e = e || window.event;
    goodE(e);
    var tooltip = document.createElement("div");
    tooltip.id = "tooltip";
    var oImg = document.createElement("img");
    oImg.src = this.href;
    tooltip.appendChild(oImg);
    tooltip.style.left = e.clientX + 10 + "px";
    tooltip.style.top = e.clientY + 20 + "px";
    document.body.appendChild(tooltip); //在全局里面加的，
    tooltip.style.display = "block";
  };
  headerList[i].onmousemove = function (e) {
    e = e || window.event;
    goodE(e);
    var tooltip = document.getElementById("tooltip");
    if (tooltip) {
      tooltip.style.left = e.clientX + 10 + "px";
      tooltip.style.top = e.clientY + 20 + "px";
    }
  };
  headerList[i].onmouseout = function (e) {
    e = e || window.event;
    goodE(e);
    document.body.removeChild(tooltip);
  };
}
//处理IE事件的
function goodE(e) {
  e = e || window.event;
  if (!e.target) {
    e.target = e.srcElement;
    e.pageX =
      (document.documentElement.scrollLeft || document.body.scrollLeft) +
      e.clientX;
    e.pageY =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      e.clientY;
    e.stopPropagation = function () {
      e.cancelBubble = true;
    }; //阻止事件传播;
    e.preventDefault = function () {
      e.returnValue = false;
    }; //阻止事件默认行为;
  }
  return e;
}
//header区域结束

//导航条区域开始
var navNav = document.getElementById("nav-div2");
var nav = document.getElementById("nav");
var contactInformation = document.getElementById("contactInformation");
var contact = document.getElementById("contact");
document.onmouseover = function (e) {
  e = e || window.event; //处理事件兼容性；
  var tar = e.target || e.srcElement; //事件源；
  var ch = dom.setCss(navNav, "height");
  var broszhu = tar.getAttribute("broszhu"); //监听的对象；
  if (broszhu === "true") {
    //以属性来判断；
    if (ch <= 200) {
      tabMove.call(navNav, 200);
      navNav.style.display = "block";
    }
  } else {
    if (ch > 0) {
      tabMove.call(navNav, 0);
    }
  }
};

function tabMove(target) {
  var that = this;
  _move();
  function _move() {
    var start = dom.setCss(that, "height"); //要在内部，不能写在外面
    clearTimeout(that.timer);
    that.timer = setTimeout(_move, 10);
    if (start >= target) {
      dom.setCss(that, "height", start - 10);
      if (start - 10 <= target) {
        dom.setCss(that, "height", target);
        navNav.style.display = "none";
        clearTimeout(that.timer);
        return;
      }
    } else if (start < target) {
      dom.setCss(that, "height", start + 10);
      if (start + 10 >= target) {
        dom.setCss(that, "height", target);
        clearTimeout(that.timer);
        return;
      }
    } else {
      return;
    }
  }
}
//下面是导航条上的联系方式
contact.onmouseover = function () {
  contactInformation.style.display = "block";
};
contact.onmouseout = function () {
  contactInformation.style.display = "none";
};
//导航条区域结束

//商品介绍区域开始
//      下面是选项卡
var displayHeader = document.getElementById("displayHeader");
var displayBody = document.getElementById("displayBody");
var displayHeaderLi = displayHeader.getElementsByTagName("li");
var displayBodyDiv = displayBody.getElementsByTagName("li");
for (var i = 0, len = displayHeaderLi.length; i < len; i++) {
  displayHeaderLi[i].index = i;
  displayHeaderLi[i].onmouseover = function () {
    tabChange(this.index);
  };
}
function tabChange(index) {
  for (var i = 0; i < displayHeaderLi.length; i++) {
    displayHeaderLi[i].className = "";
    displayBodyDiv[i].className = "";
  }
  displayHeaderLi[index].className = "select";
  displayBodyDiv[index].className = "select";
}

//下面的函数可以算出元素的距离浏览器顶部的绝对位置,
function offset() {
  var left = this.offsetLeft,
    top = this.offsetTop,
    par = this.offsetParent;
  while (par) {
    left += par.offsetLeft;
    top += par.offsetTop;
    if (window.navigator.userAgent.indexOf("MSIE 8.0") <= -1) {
      left += par.clientLeft;
      top += par.clientTop;
    }
    par = par.offsetParent;
  }
  return {
    left: left,
    top: top,
  };
}
//获取元素的属性clientHeight+scrollTop
function getWin(attr) {
  return document.documentElement[attr] || document.body[attr];
}
//省市区三级
addressInit("province", "city", "area", "广东", "广州", "天河区");
//鼠标悬停提示
var rent = document.getElementById("rent");
var distributionTime = document.getElementById("distributionTime");
var xiaoxi1 = document.getElementById("xiaoxi1");
var xiaoxi2 = document.getElementById("xiaoxi2");
rent.onmouseover = function () {
  show(xiaoxi1);
};
rent.onmouseout = function () {
  none(xiaoxi1);
};
distributionTime.onmouseover = function () {
  show(xiaoxi2);
};
distributionTime.onmouseout = function () {
  none(xiaoxi2);
};
function show(ele) {
  ele.style.display = "block";
}
function none(ele) {
  ele.style.display = "none";
}
//商品数量增加
var mallNum = document.getElementById("mallNum");
var flag = document.getElementById("flag");
var reduce = dom.getElementsByClassName(mallNum, "reduce")[0];
var plus = dom.getElementsByClassName(mallNum, "plus")[0];
var content = dom.getElementsByClassName(mallNum, "content")[0];
reduce.onclick = function () {
  if (content.innerText < 2) return;
  content.innerText--;
  if (content.innerText == 1) {
    flag.className = "right-right";
  }
};
plus.onclick = function () {
  content.innerText++;
  flag.className = "right-right flag";
};
//商品介绍区域结束

//拖拽的效果开始
//这里单开了一个JS文件夹，在drag里面
//拖拽的效果结束

//DEMO演示的页面
var DEMO = document.getElementById("DEMO");
var DEMOLis = DEMO.getElementsByTagName("li");
for (var i = 0, len = DEMOLis.length; i < len; i++) {
  DEMOLis[i].index = dom.getElementsByClassName(DEMOLis[i], "hot_info")[0];
  DEMOLis[i].onmouseover = function () {
    this.index.style.display = "block";
  };
  DEMOLis[i].onmouseout = function () {
    this.index.style.display = "none";
  };
}
