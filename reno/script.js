
$('#info_modal').modal();

var geoJsonLayerNetwork;
var geoJsonLayerNetworkSelected;
var geoJsonLayerNetworkElectrified;

var network_array_leaflet_id = new Array();
var network_array_network_id = new Array();

var network_array_leaflet_id_selected = new Array();
var network_array_network_id_selected = new Array();

var my_network_index=1;

var my_network_index_selected=1;

var electrified_edges;
var selected_edges;

var selected_edges_array= new Array();// for storing selected edges
var selected_edges_demand_array= new Array();// for storing selected edges

var message='...';

var number_of_dots_to_show=0;
var dot_counter=0;
var stat;

var hover=true;
var hover_color='yellow';

var choose_options = {
    s1: '6.660014e+165',
    s2: '> 5.326534e+306',
    s3: '> 5.326534e+306',
    k60: '6.660014e+165',
    k230: '> 5.326534e+306',
    k390: '> 5.326534e+306',
    k100: '7.437701e+254',
    k200: '> 5.326534e+306',
    k500: '> 5.326534e+306'
};

geoJsonLayerNetwork= L.geoJson(nt_data, {
    // Executes on each feature in the dataset
    onEachFeature: function (featureData, featureLayer)
    {
        featureLayer.setStyle({
            'color': 'grey',
            'weight': 1,//return_line_weight(featureData.properties.trans_work_tn_km),
            'opacity': 1
        });
    }
});


geoJsonLayerNetworkSelected= L.geoJson(nt_data, {

    // Executes on each feature in the dataset
    onEachFeature: function (featureData, featureLayer) {

        network_array_leaflet_id_selected[my_network_index_selected]=featureLayer._leaflet_id;
        network_array_network_id_selected[my_network_index_selected]=featureData.properties.network_id;
        my_network_index_selected++;

        featureLayer.setStyle({
            'color': 'red',
            'weight': 4,
            'opacity': 1
        });

    },
    filter: function (featureData) {
        if(typeof selected_edges_array === 'undefined')
        {
            return true;
        }
        return (selected_edges_array.indexOf(featureData.properties.network_id) !== -1 ? true : false);
    }
});

geoJsonLayerNetworkElectrified= L.geoJson(nt_data, {

    // Executes on each feature in the dataset
    onEachFeature: function (featureData, featureLayer)
    {

         network_array_leaflet_id[my_network_index]=featureLayer._leaflet_id;
         network_array_network_id[my_network_index]=featureData.properties.network_id;
         my_network_index++;


        featureLayer.setStyle({
            'color': return_line_color(featureData.properties.fraction),//'#7DF9FF',
            'weight': return_line_weight(featureData.properties.work),
            'opacity': 0
        });


        featureLayer.on('mouseover', highlightFeature);
        featureLayer.on('mouseout', resetHighlight);


    },
    filter: function (featureData) {
        if(typeof selected_edges_array === 'undefined')
        {
            return true;
        }
        return true;
    }
});

function factorial(x){
    // validating the input
    x = parseInt(x, 10);
    if (isNaN(x)) return 1;

    // if x below 0, return 1
    if (x <= 0) return 1;
    // if x above 170, return infinity
    //if (x > 170) return Infinity;
    // calculating the factorial
    var y = 1;
    for (var i = x; i>0; i--){
        y *= i;
    }
    return y;
}



function choose(n, k){
    // validating the input
    n = parseInt(n, 10);
    if (isNaN(n)) n = 0;
    if (n < 0) n = 0;

    k = parseInt(k, 10);
    if (isNaN(k)) k = 0;
    if (k < 0) k = 0;
    if (k > n) k = n;

    return (factorial(n)) / (factorial(k) * factorial(n - k));
}



function highlightFeature(e)
{
    if (hover) {

        var layer = e.target;

        $("#hover_info").css('color', '#000000');
        var electrified_segment_message='';
        if(!(selected_edges_array.indexOf(e.target.feature.properties.network_id)==-1))
            electrified_segment_message=' Electrified edge energy demand: <b>'+ selected_edges_demand_array[e.target.feature.properties.network_id].toFixed(2)+' kwh<b>';
        $("#hover_info").html('Percent electrified : <b>'+(e.target.feature.properties.fraction*100).toFixed(2) +" %</b> Electrified transport work : <b>"+(e.target.feature.properties.work/1000000).toFixed(0)+' Mtkm</b>'+electrified_segment_message);


        layer.setStyle(
            {
                //'weight': 3,
                'color': hover_color,
                'opacity': 1
                //,'dashArray': '5, 10'
            });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }

}

function resetHighlight(e)
{
        //geoJsonLayerSeg.resetStyle(e.target);
        $("#hover_info").css('color', '#808080');
        $("#hover_info").html('Hover over the map for statistics');

        if(e.target.feature.properties.fraction)
        {
            if(e.target.feature.properties.work)
            {
                e.target.setStyle(
                    {
                        'color': return_line_color(e.target.feature.properties.fraction),//'#7DF9FF',
                        'weight': return_line_weight(e.target.feature.properties.work),
                        'opacity': 1//featureData.properties.fraction
                    });
            }
            else
            {
                e.target.setStyle({
                    'color': 'grey',
                    'weight': 1,//return_line_weight(featureData.properties.trans_work_tn_km),
                    'opacity': 1
                });
            }
        }
        else
        {
            if(e.target.feature.properties.work)
            {
                e.target.setStyle(
                    {
                        'color': 'grey',//'#7DF9FF',
                        'weight': return_line_weight(e.target.feature.properties.work),
                        'opacity': 1//featureData.properties.fraction
                    });
            }
            else
            {
                e.target.setStyle({
                    'color': 'grey',
                    'weight': 1,//return_line_weight(featureData.properties.trans_work_tn_km),
                    'opacity': 1
                });
            }

        }

//    console.log(e.target.feature.properties.network_id);
//    console.log(selected_edges_array.indexOf(e.target.feature.properties.network_id));
    if(selected_edges_array.indexOf(e.target.feature.properties.network_id)==-1)
    {
        console.log('No');
    }
    else
    {
        console.log('Yes');
        /*

        //var ni=edge_network_mapping[electrified_edge_json.ids[key]][0];
        var ci=network_array_network_id_selected.indexOf(e.target.feature.properties.network_id);
        var li=network_array_leaflet_id_selected[ci];

        var feature_to_select=geoJsonLayerNetworkSelected.getLayer(li);


        feature_to_select.setStyle({
            'color': 'red',
            'weight': 1.5,
            'opacity': 1
        });

        */
        geoJsonLayerNetworkSelected.bringToFront();

    }

}



function get_data(path) {

    console.log(path);
    var url = path; //+ data.name;
/*
    $.getJSON(url, function(response)
    {
        if (response.error == 'cookie out') {
            return;
        }

        var res = response;


        map.addLayer(geoJsonLayerNetworkElectrified);
        map.addLayer(geoJsonLayerNetworkSelected);

        map.removeLayer(geoJsonLayerNetwork);


        $('#info_modal_2').modal();
        //$('#info_modal_2').display=none;

        var possible_solution=(res.stat.solutions).toExponential(1);
        message='';
        message+='Searching for optimized solution among '+possible_solution+' possible solutions';
        $("#message_text").html(message);
        number_of_dots_to_show=res.stat.running_time/60;
        dot_counter=0;

        // here I have to add / adjust

        selected_edges=res.electrified_edges;
        stat=res.stat;
        //we will come to electrification later
        electrified_edges=res.network_edges;

        setTimeout(show_dots,1000);
    }).error( function() {
        alert("Results not found!");
        message='';
        $("#message_text").html(message);
        map.addLayer(geoJsonLayerNetwork);
        map.removeLayer(geoJsonLayerNetworkElectrified);
        map.removeLayer(geoJsonLayerNetworkSelected);
        return;
    });
*/

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        async: false,
        success: function (response) {
            if (response.error == 'cookie out') {
                return;
            }

            var res = response;


            map.addLayer(geoJsonLayerNetworkElectrified);
            map.addLayer(geoJsonLayerNetworkSelected);

            map.removeLayer(geoJsonLayerNetwork);


            $('#info_modal_2').modal();
            //$('#info_modal_2').display=none;

//            var oe=choose(13490,res.stat.k).toExponential(1);

//            var possible_solution=2;
            message='';
            choose_result=choose_options[$("#ib").val()];
            message+='<h4>Searching for optimized solution among '+choose_result+' possible solutions</h4>';
            $("#message_text").html(message);
            number_of_dots_to_show=res.stat.running_time/60;
            dot_counter=0;

            // here I have to add / adjust

            selected_edges=res.electrified_edges;
            stat=res.stat;
            //we will come to electrification later
            electrified_edges=res.network_edges;

            setTimeout(show_dots,1000);


        },
        error: function (response) {
            alert("Results not found!");
            message='';
            $("#message_text").html(message);
            map.addLayer(geoJsonLayerNetwork);
            map.removeLayer(geoJsonLayerNetworkElectrified);
            map.removeLayer(geoJsonLayerNetworkSelected);
            return;
        }
    });


}
var choose_result='--';
function show_dots()
{
    message=message+'.';
    $("#message_text").html(message);
    dot_counter++;
    if(dot_counter<number_of_dots_to_show)
    {
        setTimeout(show_dots,1000);
    }
    else
    {
        fill_selected_edges_layer(selected_edges);
        fill_electrified_edges_layer(electrified_edges);
        message+='<h3>See statistics below and explore results on the map.</h3>';

        ib=stat.k;
        if(ib==0)
        {
            switch($("#ib").val()) {
                case 's1':
                    ib=60;
                    break;
                case 's2':
                    ib=230;
                    break;
                default:
                ib=390;
            }
        }

        pcs=stat.k*stat.t;
        if(pcs==0)
        {
            switch($("#ib").val())
            {
                case 's1':
                    pcs=60;
                    break;
                case 's2':
                    pcs=230;
                    break;
                default:
                    pcs=390;
            }
        }

        message+='<h3>Parameter settings</h3>' +
            'Battery size: '+$("#bs").val()+' kWh<br>' +
            'Charging power: '+$("#cp").val()+' kW<br>' +
            'Infrastructure budget (# of 5km long electrified segments): '+ib;
//        message=message+"<br>"+'Results Displayed on the map - here are the statistics:';

        message+='<h4>Optimization problem difficulty</h4>' +
            'Number of 5km long network segments: 13490<br>' +
            'Number of trajectories: '+'10,557,088'+'<br>' +
            'Average network length of trajectories:'+' 64 segments'+'<br>'+
            'Number of possible placements: '+choose_result+'<br>';

        message+='<h4>Computational performance of optimization</h4>' +
            'Data compression rate: '+'29.49'+'<br>' +
            'Number of evaluated partial candidate solutions: '+pcs.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')+'<br>' +
            'Processing time: '+stat.running_time+' seconds';

        message+='<h4>Overall transport electrification results</h4>' +
            'Total transport work electrified: '+Math.round(stat.electric_work/1000000000,2)+' Gtkm<br>' +
            'Percent of transport work electrified: '+((stat.fraction)*100).toFixed(2)+' %<br>'

/*
        message=message+"<br>"+'<b>Trajectories : </b>'+stat.trajectories+'<br><b>Total work : </b>'+stat.total_work
            +'<br><b>Electric work : </b>'+stat.electric_work+'<br><b>Fraction : </b>'+stat.fraction;
*/
        $("#message_text").html(message);

        //setTimeout(hide_message,5000);
    }
    return;
}


function hide_message()
{
    $('#info_modal_2').modal('hide');
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function fill_selected_edges_layer(selected_json)
{
    selected_edges_array=[];
    selected_edges_demand_array=[];

    for (var key in selected_json.ids)
    {
        var element_to_add=edge_network_mapping[selected_json.ids[key]][0];
        selected_edges_array.push(element_to_add);

        selected_edges_demand_array[element_to_add]=selected_json.demand[key];

        //var element_to_add_demand=selected_json.demand[key];
        //selected_edges_demand_array.push(element_to_add_demand);

        /*
        var ni=edge_network_mapping[selected_json.ids[key]][0];
        var ci=network_array_network_id_selected.indexOf(ni);
        var li=network_array_leaflet_id_selected[ci];
        var feature_to_update=geoJsonLayerNetworkSelected.getLayer(li);
        console.log(feature_to_update);
        */
    }

/*



*/



    var unique = selected_edges_array.filter(onlyUnique);

    //alert('O:'+selected_edges_array.length+'- U:'+unique.length);

    geoJsonLayerNetworkSelected.clearLayers();
    geoJsonLayerNetworkSelected.addData(nt_data);
}

function reset_values()
{

    for (var key in network_array_leaflet_id)
    {
        var feature_to_update=geoJsonLayerNetworkElectrified.getLayer(network_array_leaflet_id[key]).feature;
        feature_to_update.properties.fraction=null;
        feature_to_update.properties.work=null;
        geoJsonLayerNetworkElectrified.getLayer(network_array_leaflet_id[key]).setStyle(
        {
            'color': 'grey',
            'weight': 1,
            dashArray: '5, 10',
            'opacity': 1//featureData.properties.fraction
        });
    }
}

var n_c=0;
function fill_electrified_edges_layer(electrified_edge_json)
{
    reset_values();
    for (var key in electrified_edge_json.ids)
    {
        var ni=edge_network_mapping[electrified_edge_json.ids[key]][0];
        var ci=network_array_network_id.indexOf(ni);
        var li=network_array_leaflet_id[ci];

        var feature_to_update=geoJsonLayerNetworkElectrified.getLayer(li).feature;

        if(feature_to_update.properties.fraction==null)
        {
            feature_to_update.properties.fraction=electrified_edge_json.fraction[key];
        }
        else
        {
            var f1= feature_to_update.properties.work/(feature_to_update.properties.work+electrified_edge_json.work[key]);
            var f2= electrified_edge_json.work[key]/(feature_to_update.properties.work+electrified_edge_json.work[key]);
            feature_to_update.properties.fraction=((f1*feature_to_update.properties.fraction)+(f2*electrified_edge_json.fraction[key]));
        }

        if(feature_to_update.properties.work==null)
        {
            feature_to_update.properties.work=electrified_edge_json.work[key];
        }
        else
        {
            feature_to_update.properties.work=(feature_to_update.properties.work+electrified_edge_json.work[key]);
        }

      //  alert(feature_to_update);

            geoJsonLayerNetworkElectrified.getLayer(li).setStyle(
                {
                    'color': return_line_color(feature_to_update.properties.fraction),//'#7DF9FF',
                    'weight': return_line_weight(feature_to_update.properties.work), //dashArray: '5, 10',
                    dashArray: '0,0',
                    'opacity': 1//featureData.properties.fraction
                });




    }

}

function return_line_color(fr)
{
    var n_tr=fr;
    switch (true) {
        case (n_tr==0.00):
            return 'grey';
            break;
        case (n_tr<0.25):
            return '#58CCED';
            break;
        case (n_tr<0.50):
            return '#3895D3';
            break;
        case (n_tr<0.75):
            return '#1261A0';
            break;
        case (n_tr<1.00):
            return '#072F5F';
            break;
        default:
            return '#072F5F'
            break;
    }
}

function return_line_weight(tw)
{
    //return num_of_tr;
    var n_tr=parseInt(tw);
    if(map) {
        switch (true) {
            case (n_tr < 2000000.00):
                return (1 + (map.getZoom() - 5));
                break;
            case (n_tr < 8000000.00):
                return (3 + (map.getZoom() - 5));
                break;
            case (n_tr < 20000000.00):
                return (5 + (map.getZoom() - 5));
                break;
            case (n_tr < 56000000.00):
                return (7 + (map.getZoom() - 5));
                break;
            case (n_tr < 108000000.00):
                return (9 + (map.getZoom() - 5));
                break;
            default:
                return (9 + (map.getZoom() - 5))
                break;
        }
    }
    else
    {
        switch (true) {
            case (n_tr<2000000.00):
                return 1;
                break;
            case (n_tr<8000000.00):
                return 3;
                break;
            case (n_tr<20000000.00):
                return 5;
                break;
            case (n_tr<56000000.00):
                return 7;
                break;
            case (n_tr<108000000.00):
                return 9;
                break;
            default:
                return 9
                break;
        }
    }
}



//$("#message_text").html(message);
$('#filter_modal_toggle_btn').on('click', function()
{


    selected_edges_array= new Array();// for storing selected edges
    message='...';

    number_of_dots_to_show=0;
    dot_counter=0;

    //restoring all data before applying results
    geoJsonLayerNetworkSelected.clearLayers();
    geoJsonLayerNetworkSelected.addData(nt_data);

    geoJsonLayerNetworkElectrified.eachLayer(function(layer) {
        layer.setStyle({
            'opacity': 0//featureData.properties.fraction
                          });
    });

    //var file='b'+$("#bs").val()+'c'+$("#cp").val()+'k'+$("#ib").val()+'.json';

    var file=$("#ib").val()+'c'+$("#cp").val()+'p'+$("#bs").val()+'.json';

    //alert('data/result_10_2/'+file);
    if(b_full)
    {
        get_data('data/result/full/'+file);
    }
    else
    {
        get_data('data/result/'+file);
    }

});

var tiles_carto_dark= L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {'attribution': 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'});
var tiles=L.tileLayer('https://cartocdn_{s}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png', {'attribution': 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'});

var map = L.map('map', {
    'center': [62.065128, 15.429454],//59.313932, 18.061776
    'zoom': 5,
    'minZoom':5,
    'layers': [

        tiles_carto_dark,
        geoJsonLayerNetwork
    ]
});


map.on('zoomend', function() {

    if(map.hasLayer(geoJsonLayerNetworkElectrified))
    {
        //console.log(map.getZoom());
        for (var key in network_array_leaflet_id)
        {
            feature_to_update=geoJsonLayerNetworkElectrified.getLayer(network_array_leaflet_id[key]).feature;

            if(feature_to_update.properties.fraction==null || feature_to_update.properties.work==null)
            {

            }
            else
            {
                geoJsonLayerNetworkElectrified.getLayer(network_array_leaflet_id[key]).setStyle(
                    {
                        'color': return_line_color(feature_to_update.properties.fraction),//'#7DF9FF',
                        'weight': return_line_weight(feature_to_update.properties.work), //dashArray: '5, 10',
                        dashArray: '0,0',
                        'opacity': 1//featureData.properties.fraction
                    });

            }
        }
    }
});

var overlayMaps = {
    "Network edges": geoJsonLayerNetwork,
    "Network edges after electrification": geoJsonLayerNetworkElectrified,
    "Electrified edges": geoJsonLayerNetworkSelected
};
var baseMaps = {
    "Dark": tiles_carto_dark,
    "Light": tiles,
};

L.control.layers(baseMaps,overlayMaps).addTo(map);

//setTimeout(hide_message_intro,3000);
function hide_message_intro()
{
    $('#info_modal').modal('hide');
}




$(document).on('click', '#click-info-2', function(){
    $('#info_modal_2').modal();
});

$(document).on('click', '#click-info', function(){
    $('#info_modal-1').modal();
});
var b_full= false;
$(document).on('click', '#b_full', function(){
//    b_full=$('#b_full').value;
    b_full=document.getElementById('b_full').checked;
    console.log(b_full);
});


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval

  //  for (var i = 0; i < grades.length; i++) {
        div.innerHTML +='<div><b>Percent of transport work </br>(i.e., tkm) electrified</div>';
       // div.innerHTML +='<div><i style="background:grey;height: 1px;margin-top: 10px"></i>' +'No transport' + '</div>';
        div.innerHTML +='<div><i style="margin-top: 10px;height:1px;background:repeating-linear-gradient(to right,grey 0,grey 3px,transparent 3px,transparent 7px)"></i>' +'No transport' + '</div>';
        div.innerHTML +='<div><i style="background:#58CCED;height: 6px;margin-top: 6px"></i> ' +'00 - 25%' + '</div>';
        div.innerHTML +='<div><i style="background:#3895D3;height: 6px;margin-top: 6px"></i> ' +'25 - 50%' + '</div>';
        div.innerHTML +='<div><i style="background:#1261A0;height: 6px;margin-top: 6px"></i> ' +'50 - 75%' + '</div>';
        div.innerHTML +='<div><i style="background:#072F5F;height: 6px;margin-top: 6px"></i> ' +'75 - 100%' + '</div>';
        div.innerHTML +='<div><b>Electrified edges</b></div>';
        div.innerHTML +='<div><i style="background:red;height: 6px;margin-top: 6px"></i></div>';
        div.innerHTML +='<br><div><b>Total transport work (Mtkm)</div>';
        div.innerHTML +='<div><i style="margin-top: 10px;height:1px;background:repeating-linear-gradient(to right,grey 0,grey 3px,transparent 3px,transparent 7px)"></i>' +'No transport' + '</div>';
        div.innerHTML +='<div><i style="background:grey;height: 1px;margin-top: 10px"></i> ' +'0 - 1' + '</div>';
        div.innerHTML +='<div><i style="background:grey;height: 2px;margin-top: 9px"></i> ' +'1 - 4' + '</div>';
        div.innerHTML +='<div><i style="background:grey;height: 3px;margin-top: 8px"></i> ' +'4 - 10' + '</div>';
        div.innerHTML +='<div><i style="background:grey;height: 4px;margin-top: 8px"></i> ' +'10 - 28' + '</div>';
        div.innerHTML +='<div><i style="background:grey;height: 5px;margin-top: 7px"></i> ' +'28 - 54' + '</div>';


    return div;
};
legend.addTo(map);

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
