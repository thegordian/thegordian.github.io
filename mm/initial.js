/**
 *   FMM web application
 *   Author: Can Yang
 *   Updated by: Ehsan Saqib
 */
var center = [59.33458385, 18.05913005];
var zoom_level = 14;
var map_bounds = [[59.32053537555344, 17.993717193603516],[59.34859560952518, 18.124523162841797]];
function onload(e) {

    map = new L.Map('map', {
        center: new L.LatLng(center[0], center[1]),
        maxBoundsViscocity: 1.0,
        minZoom: zoom_level,
        zoom: zoom_level,
        maxBounds: map_bounds
    });
    map.on('drag', function() {
        map.panInsideBounds(map_bounds, { animate: false });
    });
    var tiles_carto_dark= L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {'attribution': 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'}).addTo(map);
    var tiles_osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    
    var baseMaps = {
        "Dark": tiles_carto_dark,
        "Light": tiles_osm,
    };
    
    // var exteriorStyle = {
    //     "color": "#66CC66",
    //     "fill":false,
    //     "opacity":1.0,
    //     "weight":5
    // };
    
    // var boundary_layer = L.geoJson(boundary, {style: exteriorStyle});
    // boundary_layer.addTo(map);
    
    //map.panTo(boundary_layer.getBounds().getCenter());
    
    // var optional_layers = {
    //     "Network boundary": boundary_layer
    // };
    //
    // var optional_layers = {
    //     "Network boundary": boundary_layer
    // };
    
    //L.control.layers(baseMaps,optional_layers).addTo(map);
    
    // L.control.layers(optional_layers).addTo(map);
    
    
    var matched_result_layer;
    var current_drawing_data;
    
    editableLayers = new L.FeatureGroup();
    map.addLayer(editableLayers);
    
    var options = {
        position: 'topleft',
        draw: {
            polyline: false,
            polygon: false,
            circle: false, // Turns off this drawing tool
            rectangle: false,
            marker: false,
        },
        edit: false,
    };
    var drawControl = new L.Control.Draw(options);
    map.addControl(drawControl);
    polyline = new L.Draw.Polyline(map, {
        shapeOptions: {
            color: '#9A9A9A', //f357a1
            weight: 4
            //fillColor: '#66CC66',
            //stroke: "True",

        },
        repeatMode: false,
        // Increase the icon size
        icon: new L.DivIcon({
            iconSize: new L.Point(20, 20),
            className: 'leaflet-div-icon leaflet-editing-icon my-own-icon'
        }),
    });
    polyline.enable();
    
    map.on(L.Draw.Event.CREATED, function(e) {
        var type = e.layerType,
            layer = e.layer;
        editableLayers.addLayer(layer);
       // editableLayers.getLayers()[0].setStyle({'color': 'green','opacity': 1})
        var html = "<div class='d-flex justify-content-center align-items-center'>";
        html += "<button class='custom-btn-style m-0' onclick='clear_layers(event)'><i class='fa fa-trash fa-2x'></i></button>";
       var popupOptions = {
           maxWidth: 200,
           closeButton: false
        };
        layer.bindPopup(html, popupOptions).openPopup();
    
        // Run map matching
        var traj = e.layer.toGeoJSON();
        var wkt = Terraformer.WKT.convert(traj.geometry);
        // console.log(wkt)
        match_wkt(wkt);
    });
    
    var match_wkt = function(wkt) {
    
        $.ajax({
            url: 'https://spatialstack.com/wrapper/mm_wrapper.php',//http://hermes.infra.kth.se:8082/match_wkt
            //url: 'test.php',//
            type: "GET",
            data: {
                "wkt": wkt
            },
            success: function(dat) {
                // console.log("Result fetched");
                // console.log(data);
                // console.log(data);
                data=JSON.parse(dat);
                if (data.state==1){
                    var geojson = Terraformer.WKT.parse(data.wkt);
                    var geojson_layer = L.geoJson(
                        geojson,
                        {
                            style: function(feature) {
                                return {
                                    color: '#FF6600'
                                    ,opacity:1
                                };
                            }
                        }
                    );
                    editableLayers.addLayer(geojson_layer);
                } else {
                    alert("Cannot match the trajectory, try another one")
                }
            },
            error: function (response) {
                console.log("error " + response);
                return;
            }
        });
    };
    
    map.on(L.Draw.Event.DRAWSTART, function(e) {
        editableLayers.clearLayers();
    });
    
    map.on(L.Draw.Event.DRAWVERTEX, function (e) {
        $("#info-box").addClass("d-none");
    });
    
    // L.Control.RemoveAll = L.Control.extend({
    //     options: {
    //         position: 'topleft',
    //     },
    //     onAdd: function(map) {
    //         var controlDiv = L.DomUtil.create('div', 'leaflet-control leaflet-bar leaflet-draw-toolbar');
    //         var controlUI = L.DomUtil.create('a', 'leaflet-draw-edit-remove', controlDiv);
    //         // var icon = L.DomUtil.create('span', 'fa fa-trash', controlDiv);
    //         // icon.setAttribute('aria-hidden',true);
    //         controlUI.title = 'Clean map';
    //         controlUI.setAttribute('href', '#');
    //         L.DomEvent
    //             .addListener(controlUI, 'click', L.DomEvent.stopPropagation)
    //             .addListener(controlUI, 'click', L.DomEvent.preventDefault)
    //             .addListener(controlUI, 'click', function() {
    //                 if (editableLayers.getLayers().length == 0) {
    //                     alert("No features drawn");
    //                 } else {
    //                     editableLayers.clearLayers();
    //                     $("#uv-div").empty();
    //                     //chart.destroy();
    //                 }
    //             });
    //         return controlDiv;
    //     }
    // });
    // removeAllControl = new L.Control.RemoveAll();
    // map.addControl(removeAllControl);
    
    var add_listeners = function() {
        $('#zoom_center').click(function() {
            map.setView(center, zoom_level);
        });
        $('#clean_map').click(function() {
            editableLayers.clearLayers();
        });
    };
    add_listeners();
    
    var wkt2geojson = function(data) {
        // Generate a MultiLineString
        var multilinestring_json = Terraformer.WKT.parse(data);
        var coordinates = multilinestring_json.coordinates;
        var result = {
            "type": "FeatureCollection",
            "features": []
        };
        var arrayLength = coordinates.length;
        for (var i = 0; i < arrayLength; i++) {
            result.features.push({
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": coordinates[i],
                }
            });
        }
        return result;
    };
}


function clear_layers(e) {
    editableLayers.clearLayers();
    polyline.enable();
}