//----------------------------------------
//测试数据
//
/*sData = [{
    "name": 'alpha',
    "id": 1,
    "lng": 106.611586,
    "lat": 29.538052,
    "iconResourse": 2
}, {
    "name": 'beta',
    "id": 2,
    "lng": 106.613486,
    "lat": 29.530052,
    "iconResourse": 3
}, {
    "name": 'gamma',
    "id": 3,
    "lng": 106.617486,
    "lat": 29.532052,
    "iconResourse": 2
}, {
    "name": 'delta',
    "id": 4,
    "lng": 106.617486,
    "lat": 29.539052,
    "iconResourse": 3
}, {
    "name": 'xpc',
    "id": 5,
    "lng": 106.612486,
    "lat": 29.534052,
    "iconResourse": 3
}, ]*/

var mp = maps;
console.log("mapcontrol.js enter");
mp.enableScrollWheelZoom();
// 复杂的自定义覆盖物
function ComplexCustomOverlay(point, name, id, resourse) {
    this._point = point;
    this._name = name;
    this._id = id;
    this._resourse = resourse;
}
ComplexCustomOverlay.prototype = new BMap.Overlay();
ComplexCustomOverlay.prototype.initialize = function(map) {
    this._map = map;
    var div = this._div = document.createElement("div");
    div.style.position = "absolute";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    
    div.style.height = "70px";
    div.style.width = "75px";
    



    div.style.MozUserSelect = "none";
      div.style.textAlign="center";
    var span = this._span = document.createElement("span");
    div.appendChild(span);
    span.appendChild(document.createTextNode(this._name));
    var that = this;

    var arrow = this._arrow = document.createElement("img");
    //arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
    arrow.style.position = "absolute";
    console.log(this._resourse);
    arrow.src = "./" + this._resourse + ".png"; //this.resourse
    arrow.width = 50;
    arrow.height = 50;
    arrow.style.bottom = "0px";
    arrow.style.left = "12.5px";
    arrow.style.borderRadius="50%";
    div.appendChild(arrow);
    var   _nid=this._id;
    div.addEventListener("click", function() {
        console.log("this ="+_nid);
        
    });
    mp.getPanes().labelPane.appendChild(div);

    return div;
}
ComplexCustomOverlay.prototype.draw = function() {
        var map = this._map;
        var pixel = map.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
        this._div.style.top = pixel.y - 30 + "px";
    }
    /*var txt = "岸城",
    mouseoverTxt = txt + " " + parseInt(Math.random() * 1000, 10) + "套";*/

/*var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(106.61169, 29.536999), "alpha","2","icon");

mp.addOverlay(myCompOverlay);*/
//创建对象
function iconfactory(sData) {
    var myCompOverlay = null;
   // console.log("进入调试iconfactory");
   console.log("hdemo1");
    for (var i = 0; i < sData.length; i++) {
    	sData.iconResourse=3;
		console.log("sData = "+sData.user);
        myCompOverlay = new ComplexCustomOverlay(new BMap.Point(sData[i].lng, sData[i].lat), sData[i].user, sData[i].id, sData[i].iconResourse);
        mp.addOverlay(myCompOverlay);
    }

}
