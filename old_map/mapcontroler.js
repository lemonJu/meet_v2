/*sData = {
    	name:["alpha", "beta", "gamma", "delta", "Epsilon"],
        id:[1, 2, 3, 4, 5],
        lng:[106.593301, 106.617447, 106.631802, 106.613423, 106.634695],
        lat:[29.516449, 29.514882, 29.517454, 29.449349, 29.495325],
        iconResourse:[1, 1, 1, 1, 1];
};*/
//106.611486,29.537052
sData = [{
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
    }, ]
    //遍历json数组
function iconfactory(sData, map) {
    for (var i = 0; i < sData.length; i++) {
        var mk = iconfactoryDo(sData[i].name, sData[i].id, sData[i].lng, sData[i].lat, sData[i].iconResourse)
            //console.log(this);
        map.addOverlay(mk);
    }


}


function iconfactoryDo(name, id, lng, lat, resourse) {
    var point = new BMap.Point(lng, lat);
    var myIcon = new BMap.Icon("./" + resourse + ".png", new BMap.Size(100, 100));
    var label = new BMap.Label(name, {
        offset: new BMap.Size(5, -20)
    });
    var marker2 = new BMap.Marker(point, {
        icon: myIcon
    });
    // 创建标注
    marker2.setAnimation(BMAP_ANIMATION_BOUNCE);
    marker2.setLabel(label);



    marker2.addEventListener("click", function() {
        console.log(id);
    });
    return marker2;
}

function selflocation(myself, map) {
        var point = new BMap.Point(myself.lng, myself.lat);
        var myIcon = new BMap.Icon("./" + myself.iconResourse + ".png", new BMap.Size(50, 50));
        //myIcon.setImageOffset(new BMap().Size(20,20));
        var label = new BMap.Label(myself.name, {
            offset: new BMap.Size(5, -20)
        });
        var mk2 = new BMap.Marker(point, {
            icon: myIcon
        });
        // 创建标注
        mk2.setAnimation(BMAP_ANIMATION_BOUNCE);
        mk2.setLabel(label);
        mk2.addEventListener("click", function() {
            console.log(myself.id);
        });
        map.addOverlay(mk2);
    }
    //为了控制图片的大小，改用自定义覆盖物
function ComplexCustomOverlay(name, id, lng, lat, resourse) {
    this._name = name;
    this._id = id;
    this._lng = lng;
    this._lat = lat;
    this._resourse = resourse
}
ComplexCustomOverlay.prototype = new BMap.Overlay();
ComplexCustomOverlay.prototype.initialize = function(map) {
    this._map = map;
    var div = this._div = document.createElement("div");
    div.style.position = "absolute";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.style.width = "100px";
    div.style.height = "120px";
    div.style.MozUserSelect = "none";

    var span = this._span = document.createElement("span");
    div.appendChild(span);
    span.appendChild(document.createTextNode(this._name));
    var that = this;

    var arrow = document.createElement("img");
   		arrow.width=100;
    	arrow.height=100;

    div.appendChild(arrow);



    map.getPanes().labelPane.appendChild(div);

    return div;
}
ComplexCustomOverlay.prototype.draw = function(){
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
      this._div.style.top  = pixel.y - 30 + "px";
    }
