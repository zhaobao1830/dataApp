
(function(e) {
    //计算font-size
    function countFontSize() {
        //getBoundingClientRect()计算元素的宽度(IE9以下无width)
        var docWidth = domDocu.getBoundingClientRect().width;
        //判断实际比例如果大于750，则按750宽度计算--因为是按缩放比例0.5计算
        //docWidth / t > 540 && (docWidth = 540 * t),
        //windows添加属性rem---为rem和px换算比例
        //除以16是为了好计算，如果写为32在320宽的屏幕下，rem会小于12px会被强制射为12px
        e.rem = docWidth / 10,
        domDocu.style.fontSize = e.rem + "px";
    }
    var t,
        magnify,
        r,
        domDocu = document.documentElement,
        viewportDom = document.querySelector('meta[name="viewport"]');//获取viewport的meta
    //如果有viewport则
    if (viewportDom) {
        //取缩放比例(initial-scale=1为无缩放)
        var initialNum = viewportDom.getAttribute("content").match(/initial\-scale=(["']?)([\d\.]+)\1?/);
        //如果存在缩放设置则，获取缩放比例
        initialNum && (magnify = parseFloat(initialNum[2]),
        //如果为缩小尺寸则取比例否则取0
        t = parseInt(1 / magnify));
    }
    else viewportDom = document.createElement("meta"),
         viewportDom.setAttribute("name", "viewport"),
         viewportDom.setAttribute("content", "width=device-width, initial-scale=0.5, user-scalable=no, minimal-ui"),
         domDocu.firstElementChild.appendChild(viewportDom);

    //屏幕改变宽度时
    e.addEventListener("resize", function() {
        clearTimeout(r),
        setTimeout(countFontSize, 300)
        //r = setTimeout(initialNum, 300)
    }, !1),
    //用户浏览页面触发
    e.addEventListener("pageshow", function(e) {
        e.persisted && (clearTimeout(r),
        r = setTimeout(countFontSize, 300))
    }, !1),
    //
    "complete" === document.readyState ? document.body.style.fontSize = 12 * t + "px" : document.addEventListener("DOMContentLoaded", function() {
        document.body.style.fontSize = 12 * t + "px"
    }, !1),
    countFontSize();
})(window);
