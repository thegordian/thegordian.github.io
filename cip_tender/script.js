//$('#info_modal').modal();

var geoJsonLayerNetwork;
//var geoJsonLayerNetworkGC;
//var geoJsonLayerNetworkTW;
var geoJsonLayerNetworkSelected;
var geoJsonLayerNetworkElectrified;

var geoJsonLayerNetworkAffected;

var network_array_leaflet_id = new Array();
var network_array_network_id = new Array();

var network_array_leaflet_id_selected = new Array();
var network_array_network_id_selected = new Array();


var network_array_leaflet_id_selected_node = new Array();
var network_array_network_id_selected_node = new Array();

var my_network_index = 1;

var my_network_index_selected = 1;

var my_network_index_selected_node = 1;

var electrified_edges;
var selected_edges;

var selected_edges_node;

var i_load = true;
var i_html_results = true;

var r_load = false;

var selected_edges_array_all = new Array();// for storing selected edges unfilterred
var selected_edges_array = new Array();// for storing selected edges
var selected_edges_demand_array = new Array();// for storing selected edges

var selected_edges_array_node_all= new Array();// for storing selected nodes unfilterred
var selected_edges_array_node = new Array();// for storing selected edges
var selected_edges_demand_array_node = new Array();// for storing selected edges


var affected_edges_array = new Array();// for storing edges which changed


var cfv = {ni: new Array(), fraction: new Array()};// for storing fraction values current
var pfv = {ni: new Array(), fraction: new Array()};// for storing fraction values previous


var message = '...';

var number_of_dots_to_show = 0;
var dot_counter = 0;
var stat;

var hover = true;
var hover_color = 'yellow';


var k_list = new Array();
var k_list_double = new Array();

var choose_options = {
    s1: '6.660014e+165',
    s2: '1.446413E+504',
    s3: '2.533299E+765',
    k60: '6.660014e+165',
    k230: '1.446413E+504',
    k390: '2.533299E+765',
    k100: '7.437701e+254',
    k200: '2.895094E+450',
    k500: '7.126568E+926',
    gc_k60s00:'6.660014e+165',
    gc_k230s00:'1.446413E+504',
    gc_k390s00:'2.533299E+765',
    gc_k30s30:'2.165824272E+61',
    gc_k115s115:'2.053779125E+169',
    gc_k195s195:'3.415648842 E+240',
    gc_k00s60:'2.165824272E+61',
    gc_k00s230:'2.053779125E+169',
    gc_k00s390:'3.415648842 E+240'
};

var node_color = '#FF6600';

geoJsonLayerNetwork = L.geoJson(nt_data, {
    // Executes on each feature in the dataset
    onEachFeature: function (featureData, featureLayer) {
        featureLayer.setStyle({
            'color': return_line_color_cost(featureData.properties.cost),
            'weight': 3,
            'opacity': 1
        });

        featureLayer.on('mouseover', highlightFeature_gc);
        featureLayer.on('mouseout', resetHighlight_gc);
    }

});

var geoJsonLayerGrid_200_400 = L.geoJson(grid_200_400, {
    // Executes on each feature in the dataset
    onEachFeature: function (featureData, featureLayer) {
        featureLayer.setStyle({
            'color': '#00FFFF',//return_line_color_cost(featureData.properties.cost),
            'weight': 4,
            'opacity': 1
        });

       // featureLayer.on('mouseover', highlightFeature_gs);
       // featureLayer.on('mouseout', resetHighlight_gs);
    }

});

var geoJsonLayerGrid_25_200 = L.geoJson(grid_25_200, {
    // Executes on each feature in the dataset
    onEachFeature: function (featureData, featureLayer) {
        featureLayer.setStyle({
            'color': '#5F9EA0',//return_line_color_cost(featureData.properties.cost),
            'weight': 3,
            'opacity': 1
        });

        //featureLayer.on('mouseover', highlightFeature_gs);
        //featureLayer.on('mouseout', resetHighlight_gs);
    }

});

var MyIcon = L.icon({
    iconUrl: 'green_plus.png',
    iconSize:     [12, 12], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var MyIconRC = L.icon({
    iconUrl: 'charger_red.PNG',
    iconSize:     [20, 20], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var MyIconYC = L.icon({
    iconUrl: 'charger_yellow.PNG',
    iconSize:     [16, 16], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var MyIconGC = L.icon({
    iconUrl: 'charger_green.PNG',
    iconSize:     [12, 12], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var MyIconpd = L.icon({
    iconUrl: 'parking.png',
    iconSize:     [14, 14], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var MyIconTf = L.icon({
    iconUrl: 'transformer.PNG',
    iconSize:     [10, 10], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


var rpNdpd = -1;


var geoJsonTf = L.geoJson(transformers,
    {
        pointToLayer: function (feature, latlng) {
            //        if(feature.properties.node_id==2){alert('2')};
            //feature._leaflet_id = feature.properties.node_id;
            return L.marker(latlng,{icon: MyIconTf});       
            


        },
     
    
    // Executes on each feature in the dataset
    onEachFeature: function (featureData, featureLayer) {

        //featureLayer.on('mouseover', highlightFeature_pd);
        //featureLayer.on('mouseout', resetHighlight_pd);

        /*        featureLayer.setStyle({
            'color': return_line_color_cost(featureData.properties.cost),
            'weight': 3,
            'opacity': 1
        });
*/
}

});


var geoJsonPD = L.geoJson(pd,
    {
        pointToLayer: function (feature, latlng) {
            //        if(feature.properties.node_id==2){alert('2')};
            //feature._leaflet_id = feature.properties.node_id;
            return L.marker(latlng,{icon: MyIconpd});       
            


        },
     
    
    // Executes on each feature in the dataset
    onEachFeature: function (featureData, featureLayer) {

        featureLayer.on('mouseover', highlightFeature_pd);
        featureLayer.on('mouseout', resetHighlight_pd);

        /*        featureLayer.setStyle({
            'color': return_line_color_cost(featureData.properties.cost),
            'weight': 3,
            'opacity': 1
        });
*/
}

});


var rpNdCS = -1;
var geoJsonCS = L.geoJson(cs,
    {
        pointToLayer: function (feature, latlng) {
            //        if(feature.properties.node_id==2){alert('2')};
            //feature._leaflet_id = feature.properties.node_id;
            if(feature.properties.sum_of_power==250)
            {
                return L.marker(latlng,{icon: MyIconGC});      

            } else if(feature.properties.sum_of_power==300)
            {
                return L.marker(latlng,{icon: MyIconYC});      

            } else if(feature.properties.sum_of_power==350)
            {
                return L.marker(latlng,{icon: MyIconRC});                
            } 
            else 
            {
                return L.marker(latlng,{icon: MyIcon});       
            }


        },
     
    
    // Executes on each feature in the dataset
    onEachFeature: function (featureData, featureLayer) {

        featureLayer.on('mouseover', highlightFeature_cs);
        featureLayer.on('mouseout', resetHighlight_cs);

        /*        featureLayer.setStyle({
            'color': return_line_color_cost(featureData.properties.cost),
            'weight': 3,
            'opacity': 1
        });
*/
}

});


var rpNd = -1;

var geoJsonLayerNode = L.geoJson(nt_data_point,
    {
        // change circle to square
        pointToLayer: function (feature, latlng) {
            //        if(feature.properties.node_id==2){alert('2')};
            //feature._leaflet_id = feature.properties.node_id;
            rpNd++;
            return L.circleMarker(latlng, {
                radius: 6,//return_node_size //(return_node_size(feature.properties.tr_start_count))
                fillColor: node_color,
                color: "#000",
                weight: 3,
                opacity: 1,
                fillOpacity: 1,
                className: 'seg-circles-'+rpNd
            });

        },



        // Executes on each feature in the dataset
        onEachFeature: function (featureData, featureLayer) {

            featureLayer.on('mouseover', highlightFeature_node);
            featureLayer.on('mouseout', resetHighlight_node);

            network_array_leaflet_id_selected_node[my_network_index_selected_node] = featureLayer._leaflet_id;
            network_array_network_id_selected_node[my_network_index_selected_node] = featureData.properties.network_id;
            my_network_index_selected_node++;

            if($("input[name='cs_symbology_variable']:checked").val()=='energy_demand')
            {
                featureLayer.setStyle({
                    radius: return_node_size(selected_edges_demand_array_node[featureLayer.feature.properties.network_id].demand/(1000000),'energy_demand'),//return_node_size //(return_node_size(feature.properties.tr_start_count))
                    fillColor: node_color,
                    color: "#FFF",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 1
                    //className: 'seg-circles-'+rpNd
                });

            }
            else
            {
                featureLayer.setStyle({
                    radius: return_node_size(selected_edges_demand_array_node[featureLayer.feature.properties.network_id].cbratio/(1000000),'bcr'),//return_node_size //(return_node_size(feature.properties.tr_start_count))
                    fillColor: node_color,
                    color: "#FFF",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 1
                    //className: 'seg-circles-'+rpNd
                });

            }

            //featureLayer.feature.properties.network_id
            //selected_edges_demand_array_node[e.target.feature.properties.network_id].demand

        },
        filter: function (featureData) {
            if (typeof selected_edges_array_node === 'undefined') {
                return true;
            }
            return (selected_edges_array_node.indexOf(featureData.properties.network_id) !== -1 ? true : false);
        }

    }
);



geoJsonLayerNetworkAffected = L.geoJson(nt_data, {

    // Executes on each feature in the dataset
    onEachFeature: function (featureData, featureLayer) {

        /*
        network_array_leaflet_id_selected[my_network_index_selected]=featureLayer._leaflet_id;
        network_array_network_id_selected[my_network_index_selected]=featureData.properties.network_id;
        my_network_index_selected++;
        */
        featureLayer.setStyle({
            'color': 'white',
            'weight': 4,
            'opacity': 1
        });

    },
    filter: function (featureData) {
        if (typeof affected_edges_array === 'undefined') {
            return true;
        }
        return (affected_edges_array.indexOf(featureData.properties.network_id) !== -1 ? true : false);
    }
});


geoJsonLayerNetworkSelected = L.geoJson(nt_data, {

    // Executes on each feature in the dataset
    onEachFeature: function (featureData, featureLayer) {

        network_array_leaflet_id_selected[my_network_index_selected] = featureLayer._leaflet_id;
        network_array_network_id_selected[my_network_index_selected] = featureData.properties.network_id;
        my_network_index_selected++;

        featureLayer.setStyle({
            'color': '#FF6600',
            'weight': 6,
            'opacity': 1
        });

    },
    filter: function (featureData) {
        if (typeof selected_edges_array === 'undefined') {
            return true;
        }
        return (selected_edges_array.indexOf(featureData.properties.network_id) !== -1 ? true : false);
    }
});

geoJsonLayerNetworkElectrified = L.geoJson(nt_data, {

    // Executes on each feature in the dataset
    onEachFeature: function (featureData, featureLayer) {

        network_array_leaflet_id[my_network_index] = featureLayer._leaflet_id;
        network_array_network_id[my_network_index] = featureData.properties.network_id;
        my_network_index++;

        featureLayer.setStyle({
            'color': 'white',//return_line_color(featureData.properties.fraction),//'#7DF9FF',
            'weight': return_line_weight(featureData.properties.work),
            'opacity': 0
        });

        featureLayer.on('dblclick', function (e) {
            console.log('dbl_click');

            if ($("#ib").val() != 'u') {
                return;
            }
            //console.log(featureData.properties);
            // get edge id in both directions
            // add them to k list
            d1_index = k_list.indexOf(featureData.properties.d1_id);
            d2_index = k_list.indexOf(featureData.properties.d2_id);
            //array
            if (d1_index < 0 && d2_index < 0) {
                k_list.push(featureData.properties.d1_id);
                k_list.push(featureData.properties.d2_id)
            } else {
                k_list.splice(k_list.indexOf(featureData.properties.d1_id), 1);
                k_list.splice(k_list.indexOf(featureData.properties.d2_id), 1);
            }


            //$('#ib')[0].options[0].innerHTML=$('#ib')[0].options[0].innerHTML='User plan ('+k_list.length+')';
            //console.log(k_list);

            ids = k_list.toString();

            $.ajax({
                url: 'https://spatialstack.com/reno_admin/eval.php/eval.php?ids=' + ids + '&capacity=' + $("#bs_c").val() + '&power=' + $("#cp_p").val(),
                type: "GET",
                dataType: 'json',
                async: true,
                success: function (response) {
                    if (response.error == 'cookie out') {
                        return;
                    }
                    $('.sideinfo').addClass('open');
                    var res = JSON.parse(response);
                    process_result_data(res);

                },
                error: function (response) {
                    $('.sideinfo').removeClass('open');
                    alert("Results not found!");
                    message = '';
                    $("#message_text").html(message);
                    //map.addLayer(geoJsonLayerNetwork);
                    map.removeLayer(geoJsonLayerNetworkElectrified);
                    map.removeLayer(geoJsonLayerNetworkSelected);
                    return;
                }
            });


            //get_show_data(k_list);
            // send the list to server and show result
        });

        /*
        featureLayer.on('dblclick', function (e)
        {
            console.log('dbl_click');
            console.log(featureData.properties);
            // get edge id in both directions
            // add them to k list
            k_list.push(featureData.properties.d1_id);
            k_list.push(featureData.properties.d2_id)
            console.log(k_list);
            //get_show_data(k_list);
            // send the list to server and show result
        });
        */


        featureLayer.on('click', highlightFeature);
        featureLayer.on('mouseover', highlightFeature);
        featureLayer.on('mouseout', resetHighlight);


    },
    filter: function (featureData) {
        if (typeof selected_edges_array === 'undefined') {
            return true;
        }
        return true;
    }
});

function factorial(x) {
    // validating the input
    x = parseInt(x, 10);
    if (isNaN(x)) return 1;

    // if x below 0, return 1
    if (x <= 0) return 1;
    // if x above 170, return infinity
    //if (x > 170) return Infinity;
    // calculating the factorial
    var y = 1;
    for (var i = x; i > 0; i--) {
        y *= i;
    }
    return y;
}


function choose(n, k) {
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


function resetHighlight_gc(e) {
    //geoJsonLayerSeg.resetStyle(e.target);
    $("#hover_info-div").css('bottom', -200);
    $("#hover_info").html('');
}
function highlightFeature_gc(e)
{
        var layer = e.target;

        $("#hover_info-div").css('bottom', 10);
        var electrified_segment_message = '';
        electrified_segment_message = 'Grid Cost: <b>' + e.target.feature.properties.cost + ' MSEK</b>';
        $("#hover_info").html(electrified_segment_message);

        // console.log(e.target.feature.properties);

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }    
}

function resetHighlight_gs(e) {
    //geoJsonLayerSeg.resetStyle(e.target);
    $("#hover_info-div").css('bottom', -200);
    $("#hover_info").html('');
}
function highlightFeature_gs(e)
{
        var layer = e.target;

        $("#hover_info-div").css('bottom', 10);
        var electrified_segment_message = '';
        electrified_segment_message = 'Power: <b>' + e.target.feature.properties.XYFEL + ' kV</b>';
        $("#hover_info").html(electrified_segment_message);
        // console.log(e.target.feature.properties);
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }    
}

function resetHighlight_cs(e) {
    //geoJsonLayerSeg.resetStyle(e.target);
    $("#hover_info-div").css('bottom', -200);
    $("#hover_info").html('');
}
function highlightFeature_cs(e)
{


        var layer = e.target;

        $("#hover_info-div").css('bottom', 10);
        var electrified_segment_message = '';
        var power='NA';
        if(e.target.feature.properties.sum_of_power!=null)
        {
            power=e.target.feature.properties.sum_of_power;
        }
        electrified_segment_message = ' Power: <b>' + power + '</b>' + ' Operator : <b>' + e.target.feature.properties.operator + "</b> Outlets : <b>" + e.target.feature.properties.outlets + '</b>';
        $("#hover_info").html(electrified_segment_message);

        // console.log(e.target.feature.properties);

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    

}


function resetHighlight_pd(e) {
    //geoJsonLayerSeg.resetStyle(e.target);
    $("#hover_info-div").css('bottom', -200);
    $("#hover_info").html('');
}

function highlightFeature_pd(e)
{
        var layer = e.target;

        $("#hover_info-div").css('bottom', 10);
        var electrified_segment_message = '';
        var power='NA';
        if(e.target.feature.properties.h0!=null)
        {
            power=e.target.feature.properties.h0;
        }
        if(e.target.feature.properties.h1!=null)
        {
            power+=', '+e.target.feature.properties.h1;
        }
        if(e.target.feature.properties.h2!=null)
        {
            power+=', '+e.target.feature.properties.h2;
        }
        if(e.target.feature.properties.h3!=null)
        {
            power+=', '+e.target.feature.properties.h3;
        }
        if(e.target.feature.properties.h4!=null)
        {
            power+=', '+e.target.feature.properties.h4;
        }
        if(e.target.feature.properties.h5!=null)
        {
            power+=', '+e.target.feature.properties.h5;
        }
        if(e.target.feature.properties.h6!=null)
        {
            power+=', '+e.target.feature.properties.h6;
        }
        electrified_segment_message = ' Facilities: <b>' + power + '</b>';
        $("#hover_info").html(electrified_segment_message);

        // console.log(e.target.feature.properties);

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }    
}

function highlightFeature_node(e)
{
    if (lastHover_node !== undefined) {
        resetHighlight_node(lastHover_node)
    }
    lastHover_node = e;

    if (hover) {

        var layer = e.target;
//selected_edges_demand_array_node
        $("#hover_info-div").css('bottom', 10);
        var electrified_segment_message = '';
        if (!(selected_edges_array_node.indexOf(e.target.feature.properties.network_id) == -1))
            electrified_segment_message = ' Energy demand: <b>' + toFixed(((selected_edges_demand_array_node[e.target.feature.properties.network_id].demand) / 1000000),2) + ' GWh</b>' + ' Infrastructure Cost : <b>' + (selected_edges_demand_array_node[e.target.feature.properties.network_id].cost_result) + " MSEK</b> Benifit cost ratio : <b>" + toFixed((selected_edges_demand_array_node[e.target.feature.properties.network_id].cbratio/1000000),2) + ' GWh / MSEK</b>';
            electrified_segment_message = electrified_segment_message 
            + '</br> Number of transport routes starting: <b>' + ocs_related_data_array[e.target.feature.properties.network_id].s_count+ '</b>' 
            + '</br> Number of transport routes passing: <b>' + ocs_related_data_array[e.target.feature.properties.network_id].i_count + "</b>"
            //+ "</br></b> Estimated number of charging sessions: <b>" + ocs_related_data_array[e.target.feature.properties.network_id].charge_count + '</b>'
            + '</br>Average incoming battery SOC (kWh): <b>' + ocs_related_data_array[e.target.feature.properties.network_id].avg_in_bat 
            + "</b></br>Average outgoing battery SOC (kWh): <b>" + ocs_related_data_array[e.target.feature.properties.network_id].avg_out_bat + '</b>';
        $("#hover_info").html(electrified_segment_message);
        //s_count;i_count;charge_count
        //edge_network_mapping[e.target.feature.properties.network_id][0];
        //alert(e.target.feature.properties.network_id);
        //avg_in_bat;avg_out_bat
        
        /*
        alert(
            ocs_related_data_array[e.target.feature.properties.network_id].charge_count
            +'*'+
            ocs_related_data_array[e.target.feature.properties.network_id].grid_cost
            +'*'+
            ocs_related_data_array[e.target.feature.properties.network_id].ework
            );
        */

        // console.log(e.target.feature.properties);

        layer.setStyle(
            {
                //'weight': 3,
                fillColor: 'white',
                'color': hover_color,
                'opacity': 1
                //,'dashArray': '5, 10'
            });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }

}

function resetHighlight_node(e) {
    //geoJsonLayerSeg.resetStyle(e.target);
    $("#hover_info-div").css('bottom', -200);
    $("#hover_info").html('');


    if (e.target.feature.properties.fraction)
    {
        if (e.target.feature.properties.work)
        {
            e.target.setStyle(
                {
                    'color':'#7DF9FF',// return_line_color(e.target.feature.properties.fraction),//'#7DF9FF',
                    'weight': 1,
                    'opacity': 1//featureData.properties.fraction
                });
        } else {
            e.target.setStyle({
                fillColor: node_color,
                'color': 'white',
                'weight': 1,//return_line_weight(featureData.properties.trans_work_tn_km),
                'opacity': 1
            });
        }
    } else {
        if (e.target.feature.properties.work) {
            e.target.setStyle(
                {
                    fillColor: node_color,
                    'color': 'white',//'#7DF9FF',
                    'weight': 1,
                    'opacity': 1//featureData.properties.fraction
                });
        } else {
            e.target.setStyle({
                fillColor: node_color,
                'color': 'white',
                'weight': 1,//return_line_weight(featureData.properties.trans_work_tn_km),
                'opacity': 1
            });
        }
    }

//    console.log(e.target.feature.properties.network_id);
//    console.log(selected_edges_array.indexOf(e.target.feature.properties.network_id));
    if (selected_edges_array_node.indexOf(e.target.feature.properties.network_id) == -1) {
        //console.log('No');
    } else {

        geoJsonLayerNode.bringToFront();

    }

}

function highlightFeature(e) {
    if (lastHover !== undefined) {
        resetHighlight(lastHover)
    }
    lastHover = e;
    if (hover) {

        var layer = e.target;

        $("#hover_info-div").css('bottom', 10);
        var electrified_segment_message = '';
        if (!(selected_edges_array.indexOf(e.target.feature.properties.network_id) == -1))
            electrified_segment_message = '<br> Energy demand: <b>' + ((selected_edges_demand_array[e.target.feature.properties.network_id].demand) / 1000000).toFixed(2) + ' GWh</b>' + ' Infrastructure Cost : <b>' + (selected_edges_demand_array[e.target.feature.properties.network_id].cost_result) + " MSEK</b> Benifit cost ratio : <b>" + (selected_edges_demand_array[e.target.feature.properties.network_id].cbratio/1000000).toFixed(2) + ' GWh / MSEK</b>';
        $("#hover_info").html('Percent electrified : <b>' + (e.target.feature.properties.fraction * 100).toFixed(2) + " %</b> Electrified transport work : <b>" + (e.target.feature.properties.e_work / 1000000).toFixed(2) + ' Mtkm</b>' + '</b> Transport work : <b>' + (e.target.feature.properties.work / 1000000).toFixed(2) + ' Mtkm</b>'  + '</b> Grid Cost : <b>' + (e.target.feature.properties.cost) + ' MSEK</b>'  + electrified_segment_message);//+"</b> Transport work : <b>"+(e.target.feature.properties.work/1000000).toFixed(3)+' Mtkm</b>

        // console.log(e.target.feature.properties);

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

function resetHighlight(e) {
    //geoJsonLayerSeg.resetStyle(e.target);
    $("#hover_info-div").css('bottom', -200);
    $("#hover_info").html('');

    if (e.target.feature.properties.fraction) {
        if (e.target.feature.properties.work)
        {
            e.target.setStyle(
                {
                    'color': return_line_color(e.target.feature.properties.fraction),//'#7DF9FF',
                    'weight': return_line_weight(e.target.feature.properties.work),
                    'opacity': 1//featureData.properties.fraction
                });
        } else {
            e.target.setStyle({
                'color': 'white',
                'weight': 1,//return_line_weight(featureData.properties.trans_work_tn_km),
                'opacity': 1
            });
        }
    } else {

        if(!r_load)
        {
            if (e.target.feature.properties.work) {

                e.target.setStyle(
                    {
                        'color': return_line_color_cost(e.target.feature.properties.cost),//'#7DF9FF',
                        'weight': return_line_weight(e.target.feature.properties.work),
                        'opacity': 1//featureData.properties.fraction
                    });
            } else {
                e.target.setStyle({
                    'color': return_line_color_cost(e.target.feature.properties.cost),//'#7DF9FF',
                    'weight': 1,//return_line_weight(featureData.properties.trans_work_tn_km),
                    'opacity': 1
                });
            }


        }
        else
        {
            if (e.target.feature.properties.work) {
                e.target.setStyle(
                    {
                        'color': 'white',//'#7DF9FF',
                        'weight': return_line_weight(e.target.feature.properties.work),
                        'opacity': 1//featureData.properties.fraction
                    });
            } else {
                e.target.setStyle({
                    'color': 'white',//'#7DF9FF',
                    'weight': 1,//return_line_weight(featureData.properties.trans_work_tn_km),
                    'opacity': 1
                });
            }
        }


    }

//    console.log(e.target.feature.properties.network_id);
//    console.log(selected_edges_array.indexOf(e.target.feature.properties.network_id));
    if (selected_edges_array.indexOf(e.target.feature.properties.network_id) == -1) {
        //console.log('No');
    } else {
        // console.log('Yes');
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
    if (map.hasLayer(geoJsonLayerNode))
    {
        geoJsonLayerNode.bringToFront();
    }
    //

}


function get_data(path) {

    //console.log(path);
    var url = path; //+ data.name;

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        async: true,
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
            message = '';
            choose_result = choose_options[$("#ib").val()];

            number_of_dots_to_show = res.stat.running_time / 60;
            dot_counter = 0;

            // here I have to add / adjust

            selected_edges = res.electrified_edges;
            stat = res.stat;
            //we will come to electrification later
            electrified_edges = res.network_edges;

            show_dots();

            setup_slider(selected_edges.ids.length);

            //experiment_setting
            //if($("input[name='cs_symbology_variable']:checked").val()=='energy_demand')
            var option_user_plan = $("#ib")[0].options[$("#ib")[0].selectedIndex].text;
            var option_battery = $("#bs_c")[0].options[$("#bs_c")[0].selectedIndex].text;
            var option_charging_power = $("#cp_p")[0].options[$("#cp_p")[0].selectedIndex].text;

            html_exp_setting="<p style=\"color: rgb(255, 102, 0); font-family: Montserrat; font-size: 16px;\">Experiment setting &nbsp;-> Battery size : <strong>"+option_battery+" kWh</strong> Charging power : <strong>"+option_charging_power+" kW</strong> Infrastructure plan : <strong>"+option_user_plan+"</strong></p>"
            $("#experiment_setting").html(html_exp_setting);

        },
        error: function (response) {
            alert("Results not found!");
            message = '';
            $("#message_text").html(message);
            //map.addLayer(geoJsonLayerNetwork);
            map.removeLayer(geoJsonLayerNetworkElectrified);
            map.removeLayer(geoJsonLayerNetworkSelected);
            return;
        }
    });

}


function process_result_data_initial(res) {

}

function process_result_data(res) {

    //map.addLayer(geoJsonLayerNetworkElectrified);
    //map.addLayer(geoJsonLayerNetworkSelected);

    map.removeLayer(geoJsonLayerNetwork);


    //$('#info_modal_2').modal();
    //$('#info_modal_2').display=none;

//            var oe=choose(13490,res.stat.k).toExponential(1);

//            var possible_solution=2;
   
    message = '';

    //choose_result = choose_options[$("#ib").val()];
/*
    if ($("#ib").val() == 'u') {
        if (k_list.length < 101) {
            choose_result = choose(13490, k_list.length);
        } else
            choose_result = 'BB';
    }

    message += '<h4>Searching for optimized solution among ' + choose_result + ' possible solutions</h4>';
    $("#message_text").html(message);

    number_of_dots_to_show = res.stat.running_time / 60;
    dot_counter = 0;

    // here I have to add / adjust
*/
    selected_edges = res.electrified_edges;
    stat = res.stat;
    //we will come to electrification later
    electrified_edges = res.network_edges;

    console.log('Data processed at ' + new Date().getTime());
    //$('#info_modal_2').modal().hide();
    $('#info_modal_3').modal('hide');
    show_dots();
    if (getCookie('skip') !== 'yes') {
        //startIntro();
    }

    setTimeout(get_result_tender_setting,001);
}

var choose_result = '--';

var case_o = true;
var ib_str;
var slider_value=0;

//var selected_edges_array_temp= [];
//var selected_edges_array_node_temp= [];

function setup_slider(max_length) {

/*    $('#slider-2').slider( "option", "min", 1 );
    $('#slider-2').slider( "option", "max", max_length);
    $('#slider-2').slider( "option", "value", max_length);
*/

    //$('#slider-2').empty();

    $("#slider-2").empty();

    $("#slider-2").slider("destroy");



    $("#slider-2").slider({
        min: 1, // min value
        max: max_length, // max value
        step: 1,
        value: max_length, // default value of slider
        slide: function (event, ui) {

            console.log(ui.value);
            slider_value=ui.value;
            show_filtered_on_slider(slider_value);
            //$('#ros').HTML(ui.value); //= ;
            document.getElementById("ros").innerHTML = 'Infrastructure rollout sequence: top('+ui.value+')';
        }
    })

    document.getElementById("ros").innerHTML = 'Infrastructure rollout sequence: top(200)';

    // Get the number of possible values
    var vals = max_length;



    // Space out values
    for (var i = 0; i <= vals; i = i + (max_length/10)) {

        if(i==0)
        {
            var el = $('<label>' + parseInt(i+1) + '</label>').css('left', (i / vals * 100) + '%');
            $("#slider-2").append(el);
        }
        else
        {
            var el = $('<label>' + parseInt(i) + '</label>').css('left', (i / vals * 100) + '%');
            $("#slider-2").append(el);
        }
    }

    //document.getElementById("filter_slider").style.display = "block";


    


}

function show_filtered_on_slider(slider_value) 
{
    if($("input[name='cs_symbology_variable']:checked").val()=='energy_demand')
    {
        combined_selected_edges_node_list.sort((a,b) => a[1] - b[1] || a[2] - b[2] || a[0] - b[0]);// demand is on the first index
    }
    else if($("input[name='cs_symbology_variable']:checked").val()=='bcr')
    {
        combined_selected_edges_node_list.sort((a,b) => a[2] - b[2] || a[1] - b[1] || a[0] - b[0] );// cost benifit ratio is on the second index
    }
    else
    {

    }

    total_items=combined_selected_edges_node_list.length;
    var combined_selected_edges_node_list_filtered=combined_selected_edges_node_list.slice(total_items-slider_value);            

    //combined_selected_edges_node_list_filtered
    selected_edges_array_temp= [];
    selected_edges_array_node_temp= [];
    for (var key in combined_selected_edges_node_list_filtered) 
    {
        //console.log(combined_selected_edges_node_list_filtered[key]);
        if(combined_selected_edges_node_list_filtered[key][3]=='node')
        {
            selected_edges_array_node_temp.push(combined_selected_edges_node_list_filtered[key][0]);
        }
        else 
        {
            selected_edges_array_temp.push(combined_selected_edges_node_list_filtered[key][0]);
        }
    }

    /*
    var node_slice_index=Math.max((ui.value-switch_point),0);

    if((ui.value - switch_point)<0)
    {
        var edge_slice_index=selected_edges_array_all.length+(ui.value - switch_point );
    }
    else
    {
        if(switch_point==0)
        {
            var edge_slice_index=ui.value;
        }
        else
        {
            var edge_slice_index=selected_edges_array_all.length;
        }
    }

    selected_edges_array= selected_edges_array_all.slice(0,node_slice_index);
    selected_edges_array_node= selected_edges_array_node_all.slice(0,edge_slice_index);
    */
    selected_edges_array= selected_edges_array_temp;
    selected_edges_array_node= selected_edges_array_node_temp;

    geoJsonLayerNetworkSelected.clearLayers();
    geoJsonLayerNetworkSelected.addData(nt_data);

    geoJsonLayerNode.clearLayers();
    geoJsonLayerNode.addData(nt_data_point);

};


function show_dots() {
    //message=message+'.';
    dot_counter++;
    if (dot_counter < number_of_dots_to_show) {
        show_dots();
    } else {

        fill_selected_edges_layer(selected_edges);
        fill_electrified_edges_layer(electrified_edges);

        if(stat.k_ers)
        {
            ib = stat.k_ers;
        }
        else
        {
            ib = stat.k;
        }

        if (ib == 0) {
            switch ($("#ib").val()) {
                case 's1':
                    ib = 60;
                    break;
                case 's2':
                    ib = 230;
                    break;
                default:
                    ib = 390;
            }
        }


        if ($("#ib").val() == 'u') {
            ib = k_list.length;
        }

        if(stat.k_ers)
        {
            ib_str = (stat.k_ers).toString();
            pcs = stat.k_ers * 5000;
        }
        else
        {
            ib_str = $("#ib").val();
            pcs = stat.k * stat.t;
        }



        if (pcs == 0) {
            switch ($("#ib").val()) {
                case 's1':
                    pcs = 60;
                    break;
                case 's2':
                    pcs = 230;
                    break;
                case 's3':
                    pcs = 390;
                    break;
                default:
                    pcs = ib;
            }
        }




        case_o = true;
        if (ib_str == 's1' || ib_str == 's2' || ib_str == 's3') {
            case_o = false;
        }

        if (case_o) {
            message += 'Searching for optimized placement of ' + parseInt(ib_str.replace(/\D/g, "")) * 5 + ' km of electric roads among ' + choose_result + ' possible placements.<br>';
        } else {
            message += 'Evaluating ' + ib * 5 + ' km corridor placement.<br>';
        }

        $("#message_text").html(message);

      //  setTimeout(display_second_message, 2000);

//        message+='<h3>See statistics below and explore results on the map.</h3>';

        /*


        message+='<h3>Parameter settings</h3>' +
            'Battery size: '+$("#bs_c").val()+' kWh<br>' +
            'Charging power: '+$("#cp_p").val()+' kW<br>' +
            'Infrastructure budget (# of 5km long electrified segments): '+ib;


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
            'Total transport work electrified: '+(stat.electric_work/1000000000).toFixed(2)+' Gtkm<br>' +
            'Percent of transport work electrified: '+((stat.fraction)*100).toFixed(2)+' %<br>'

        $("#message_text").html(message);

    */

        var current_sel = 'Infrastructure budget (# of 5km long electrified segments) : </br><b>' + $('#ib')[0].options[$("#ib")[0].selectedIndex].innerHTML + '</b></br>';

        var basic_summary_text = current_sel + 'Electrified transport work :</br> <b>' + (stat.electric_work / 1000000000).toFixed(2) + ' Gtkm</b>  <b>(' + ((stat.fraction) * 100).toFixed(2) + '%)</b>';
        if (i_html_results) {
            basic_summary_text = 'Results summary will be displayed here';
            i_html_results = false;
        }
        $("#basic_summary").html(basic_summary_text);


        t1 = new Date().getTime();
        // console.log('t1:'+t1);
        var dt = t1 - t0;
        console.log(dt);
        //setTimeout(hide_message,5000);
    }
    return;
}

function display_second_message() {
    if (case_o) {
        //message+='Searching for optimized placement of '+parseInt(ib_str.replace(/\D/g, ""))*5+' km of electric roads among '+choose_result+' possible placements.';
        message += 'Evaluated ' + pcs.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' placements against 10 million transport routes.<br>';
        if(stat.k_ers)
        {
            message += 'Best ' + parseInt(ib_str.replace(/\D/g, "")) * 5 + ' km electric road placement found with best placed '+stat.k_station+' charging station(s) electrifies ' + (stat.electric_work / 1000000000).toFixed(2) + ' Gtkm (' + ((stat.fraction) * 100).toFixed(2) + '%) of the total transport work.';
        }
        else
        {
            message += 'Best ' + parseInt(ib_str.replace(/\D/g, "")) * 5 + ' km electric road placement found electrifies ' + (stat.electric_work / 1000000000).toFixed(2) + ' Gtkm (' + ((stat.fraction) * 100).toFixed(2) + '%) of the total transport work.';
        }


    } else {
        //   message+='Evaluating '+ib*5 +' km corridor placement.';
       // message += '' + ib * 5 + ' km corridor placement electrifies ' + (stat.electric_work / 1000000000).toFixed(2) + ' Gtkm (' + ((stat.fraction) * 100).toFixed(2) + '%) of the total transport work.';
    }
    $("#message_text").html(message);
    setTimeout(hide_message, 3000);

}

function hide_message() {
    $('#info_modal_2').modal('hide');
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

var switch_point=0;

var ocs_related_data_array = new Array();

function fill_other_data()
{
    for (var key in related_data)
    {
        var element_to_add = edge_network_mapping[parseInt(related_data[key].id)][0];
        ocs_related_data_array[element_to_add] = related_data[key];
        //ocs_related_data_array[parseInt(related_data[key].id)] = related_data[key];
    }
}
var demand_copy;
var cb_copy;
var max_demand_global;
var max_cb_global;
fill_other_data();

function fill_selected_edges_layer(selected_json) {

    switch_point=0;

    selected_edges_array_all = [];
    selected_edges_array = [];
    selected_edges_demand_array = [];

    selected_edges_array_node_all = [];
    selected_edges_array_node = [];
    selected_edges_demand_array_node = [];

    k_list_double = selected_json.ids;

    if(selected_json.type)
    {
        demand_copy = [];
        cb_copy = [];

        for (i = 0; i < selected_json.demand.length; i++) 
        {
            demand_copy[i] = parseFloat(selected_json.demand[i]);
            cb_copy[i] = parseFloat(selected_json.cbratio[i]);
        }
        max_demand_global=(demand_copy.sort(function(a, b){return b-a}))[0];
        max_cb_global=(cb_copy.sort(function(a, b){return b-a}))[0];
    }

    for (var key in selected_json.ids)
    {

        var element_to_add = edge_network_mapping[selected_json.ids[key]][0];
        //var ni = edge_network_mapping[electrified_edge_json.ids[key]][0];

        if(selected_json.type)
        {
            if(selected_json.type[key]==0)
            {
                switch_point++;

                selected_edges_array.push(element_to_add);
                var data_object =
                    {
                        demand:selected_json.demand[key]
                        , cost_result:selected_json.cost[key]
                        , type:selected_json.type[key]
                        , cbratio:selected_json.cbratio[key]
                        , id:selected_json.ids[key]
                        , d_cb:(selected_json.cbratio[key]/max_cb_global+selected_json.demand[key]/max_demand_global)/2
                    };
                selected_edges_demand_array[element_to_add] = data_object;
            }
            else
            {
                selected_edges_array_node.push(element_to_add);

                var data_object =
                    {
                        demand:selected_json.demand[key]
                        , cost_result:selected_json.cost[key]
                        , type:selected_json.type[key]
                        , cbratio:selected_json.cbratio[key]
                        , id:selected_json.ids[key]
                        , d_cb:(((selected_json.cbratio[key]/max_cb_global)+(selected_json.demand[key]/max_demand_global))/2)
                    };
                selected_edges_demand_array_node[element_to_add] = data_object;
                //console.log(selected_json.cbratio[key]/max_cb_global);
                //console.log(selected_json.demand[key]/max_demand_global);
                //console.log((((selected_json.cbratio[key]/max_cb_global)+(selected_json.demand[key]/max_demand_global))));
                //console.log((((selected_json.cbratio[key]/max_cb_global)+(selected_json.demand[key]/max_demand_global))/2));

            }
        }
        else
        {
            selected_edges_array.push(element_to_add);

            var data_object =
                {
                    demand:selected_json.demand[key]
                    //, cost_result:selected_json.cost[key]
                    //, type:selected_json.type[key]
                    //, cbratio:selected_json.cbratio[key]
                    //, id:selected_json.ids[key]
                };
            selected_edges_demand_array[element_to_add] = data_object;
        }

        fill_combined_selected_edges_node_list();

    }



    /*



    */

    var unique = selected_edges_array.filter(onlyUnique);
    var unique_node = selected_edges_array_node.filter(onlyUnique);

    selected_edges_array_all= selected_edges_array;
    selected_edges_array_node_all= selected_edges_array_node;

    geoJsonLayerNetworkSelected.clearLayers();
    geoJsonLayerNetworkSelected.addData(nt_data);

    geoJsonLayerNode.clearLayers();
    geoJsonLayerNode.addData(nt_data_point);

}


var combined_selected_edges_node_list = [];
    
function fill_combined_selected_edges_node_list()
{
    combined_selected_edges_node_list = [];
    if(selected_edges_array && selected_edges_demand_array)
    {
        for (var key in selected_edges_array) 
        {
            combined_selected_edges_node_list.push([selected_edges_array[key],selected_edges_demand_array[selected_edges_array[key]].demand,selected_edges_demand_array[selected_edges_array[key]].cbratio,'edge']);
        }
    }    

    if(selected_edges_array_node && selected_edges_demand_array_node)
    {
        for (var key in selected_edges_array_node) 
        {
            combined_selected_edges_node_list.push([selected_edges_array_node[key],selected_edges_demand_array_node[selected_edges_array_node[key]].demand,selected_edges_demand_array_node[selected_edges_array_node[key]].cbratio,'node']);
        }
    }       
}




function detect_affected_edges(result_data) {
    if (pfv.ni.length > 0) {
        affected_edges_array = [];

        /*
        for (var key in cfv.ni)
        {
            var feature_to_update=geoJsonLayerNetworkElectrified.getLayer(network_array_leaflet_id[key]).feature;
        }
        */

        for (var i = 0; i < cfv.ni.length; i++) {
            if (cfv.fraction[i] != pfv.fraction[i]) {
                affected_edges_array.push(cfv.ni[i])
            }
        }

        pfv.ni = cfv.ni.slice();
        pfv.fraction = cfv.fraction.slice();
    } else {
        pfv.ni = cfv.ni.slice();
        pfv.fraction = cfv.fraction.slice();
    }


    /*
    for (var key in network_array_leaflet_id)
    {
        var feature_to_update=geoJsonLayerNetworkElectrified.getLayer(network_array_leaflet_id[key]).feature;

    }
        var element_to_add=edge_network_mapping[selected_json.ids[key]][0];
    selected_edges_array.push(element_to_add);
    */

}

function fill_cfv() {
    cfv.ni = new Array();
    cfv.fraction = new Array();

    for (var key in network_array_leaflet_id) {
        var feature_to_update = geoJsonLayerNetworkElectrified.getLayer(network_array_leaflet_id[key]).feature;
        cfv.ni.push(feature_to_update.properties.network_id);
        cfv.fraction.push(feature_to_update.properties.fraction);
    }
}

function reset_values() {

    for (var key in network_array_leaflet_id) {
        var feature_to_update = geoJsonLayerNetworkElectrified.getLayer(network_array_leaflet_id[key]).feature;

        feature_to_update.properties.fraction = null;
        feature_to_update.properties.work = null;
        feature_to_update.properties.e_work = null;

        feature_to_update.properties.demand = null;
        feature_to_update.properties.cost_result = null;
        feature_to_update.properties.cbratio = null;

        if(i_load)
        {
            geoJsonLayerNetworkElectrified.getLayer(network_array_leaflet_id[key]).setStyle(
                {
                    'color': return_line_color_cost(feature_to_update.properties.cost),
                    'weight': 1,
                    dashArray: '5, 10',
                    'opacity': 1//featureData.properties.fraction
                });
        }
        else
        {
            geoJsonLayerNetworkElectrified.getLayer(network_array_leaflet_id[key]).setStyle(
                {
                    'color': 'white',
                    'weight': 1,
                    dashArray: '5, 10',
                    'opacity': 1//featureData.properties.fraction
                });

        }

        //
    }
}

var n_c = 0;


function fill_electrified_edges_layer(electrified_edge_json) {

    map.removeLayer(geoJsonLayerNetworkAffected);
    reset_values();

    for (var key in electrified_edge_json.ids) {

        var ni = edge_network_mapping[electrified_edge_json.ids[key]][0];
        var ci = network_array_network_id.indexOf(ni);
        var li = network_array_leaflet_id[ci];

        var feature_to_update = geoJsonLayerNetworkElectrified.getLayer(li).feature;

        if (feature_to_update.properties.work == null) {
            feature_to_update.properties.work = electrified_edge_json.work[key];
        } else {
            feature_to_update.properties.work = (feature_to_update.properties.work + electrified_edge_json.work[key]);
        }


        if (feature_to_update.properties.fraction == null) {
            //feature_to_update.properties.fraction=electrified_edge_json.fraction[key];
            feature_to_update.properties.e_work = electrified_edge_json.e_work[key];

            feature_to_update.properties.fraction = feature_to_update.properties.e_work / feature_to_update.properties.work;
        } else {
            //var f1= feature_to_update.properties.work/(feature_to_update.properties.work+electrified_edge_json.work[key]);
            //var f2= electrified_edge_json.work[key]/(feature_to_update.properties.work+electrified_edge_json.work[key]);
            /*
            if(feature_to_update.properties.fraction<electrified_edge_json.fraction[key])
            {
                feature_to_update.properties.fraction=electrified_edge_json.fraction[key];
            }*/

//            feature_to_update.properties.fraction=(feature_to_update.properties.fraction+electrified_edge_json.fraction[key])/2;
            feature_to_update.properties.e_work = (feature_to_update.properties.e_work + electrified_edge_json.e_work[key]);

            feature_to_update.properties.fraction = feature_to_update.properties.e_work / feature_to_update.properties.work;

        }


        //  alert(feature_to_update);

        if (i_load) {
            geoJsonLayerNetworkElectrified.getLayer(li).setStyle(
                {
                    'color': return_line_color_cost(feature_to_update.properties.cost),
                    'weight': return_line_weight(feature_to_update.properties.work), //dashArray: '5, 10',
                  //  dashArray: '0,0',
                    'opacity': 1//featureData.properties.fraction
                });
        } else {
            geoJsonLayerNetworkElectrified.getLayer(li).setStyle(
                {
                    'color': return_line_color(feature_to_update.properties.fraction),//'#7DF9FF',
                    'weight': return_line_weight(feature_to_update.properties.work), //dashArray: '5, 10',
                    dashArray: '0,0',
                    'opacity': 1//featureData.properties.fraction
                });

        }
    }

    //geoJsonLayerNetworkGC=L.geoJson(geoJsonLayerNetworkElectrified.toGeoJSON());

    //map.addLayer(geoJsonLayerNetworkGC);

    i_load = false;

    fill_cfv();
    detect_affected_edges();

    geoJsonLayerNetworkAffected.clearLayers();
    geoJsonLayerNetworkAffected.addData(nt_data);
    //map.addLayer(geoJsonLayerNetworkAffected);

//    map.addLayer(geoJsonLayerNetworkAffected);
//    setTimeout(flash,2000);

}


function flash() {
    //map.re
    map.removeLayer(geoJsonLayerNetworkAffected);

    //setTimeout(add_remove_layer(layer,false),1500);
    //setTimeout(add_remove_layer(layer,true),3000);
    //setTimeout(add_remove_layer(layer,false),10000);
}

function add_remove_layer(layer, to_add) {
    if (to_add) {
        map.addLayer(layer);
    } else {
        map.removeLayer(layer);
    }
}

function return_node_size(data,variable)
{
    if(variable=='energy_demand')
    {
        switch (true) {
            case (data < 5.00):
                return (4);
                break;
            case (data < 10.00):
                return (6);
                break;
            case (data < 15.00):
                return (8);
                break;
            case (data < 20.00):
                return (10);
                break;
            default:
                return (10)
                break;
        }
    }
    else if(variable=='bcr')
    {
        switch (true) {
            case (data < 0.160000):
                return (4);
                break;
            case (data < 0.170000):
                return (6);
                break;
            case (data < 0.180000):
                return (8);
                break;
            case (data < 0.190000):
                return (10);
                break;
            default:
                return (10)
                break;
        }

    }
}


function return_line_color_cost(fr) {
    var n_tr = fr;
    switch (true) {
        case (n_tr == 0.00):
            return 'white';
            break;
        case (n_tr <= 1):
            return '#C4BCF8';
            break;
        case (n_tr <= 2):
            return '#B1A5F7';
            break;
        case (n_tr <= 4):
            return '#8B77F5';
            break;
        case (n_tr <= 7):
            return '#6549F3';
            break;
        default:
            return '#3F1BF1'
            break;
    }
}






//


function return_line_color(fr) {
    var n_tr = fr;
    switch (true) {
        case (n_tr == 0.00):
            return 'white';
            break;
        case (n_tr < 0.25):
            return '#7CFC00';
            break;
        case (n_tr < 0.50):
            return '#32CD32';
            break;
        case (n_tr < 0.75):
            return '#228B22';
            break;
        case (n_tr < 1.00):
            return '#006400';
            break;
        default:
            return '#006400'
            break;
    }
}

function return_line_weight(tw) {
    //return num_of_tr;
    var n_tr = parseInt(tw);
    if (map) {
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
    } else {
        switch (true) {
            case (n_tr < 2000000.00):
                return 1;
                break;
            case (n_tr < 8000000.00):
                return 3;
                break;
            case (n_tr < 20000000.00):
                return 5;
                break;
            case (n_tr < 56000000.00):
                return 7;
                break;
            case (n_tr < 108000000.00):
                return 9;
                break;
            default:
                return 9
                break;
        }
    }
}


//$("#message_text").html(message);


$('#filter_modal_toggle_btn_reset').on('click', function () {
    //alert("aaho");
    r_load=false;

    for (var key in network_array_leaflet_id) {
        var feature_to_update = geoJsonLayerNetworkElectrified.getLayer(network_array_leaflet_id[key]).feature;

        feature_to_update.properties.fraction = null;

        feature_to_update.properties.demand = null;
        feature_to_update.properties.cost_result = null;
        feature_to_update.properties.cbratio = null;


            geoJsonLayerNetworkElectrified.getLayer(network_array_leaflet_id[key]).setStyle(
                {
                    'color': return_line_color_cost(feature_to_update.properties.cost),
                    'weight': return_line_weight(feature_to_update.properties.work),
                    dashArray: '5, 10',
                    'opacity': 1//featureData.properties.fraction
                });

        //
    }


});

$('#filter_modal_toggle_btn').on('click', function () {

//

    html_exp_setting="<p style=\"color: rgb(255, 102, 0); font-family: Montserrat; font-size: 16px;\">Experiment setting</p>"
    $("#experiment_setting").html(html_exp_setting);

    r_load=true;

    if ($("#ib").val() == 'u') {
        //  $("#filter_modal_clear_btn").show();
        load_initial();
        return;
    }

    //$("#filter_modal_clear_btn").hide();

    selected_edges_array = new Array();// for storing selected edges
    message = '...';

    selected_edges_array_node = new Array();// for storing selected edges

    number_of_dots_to_show = 0;
    dot_counter = 0;

    //restoring all data before applying results
    geoJsonLayerNetworkSelected.clearLayers();
    geoJsonLayerNetworkSelected.addData(nt_data);



    geoJsonLayerNode.clearLayers();
    geoJsonLayerNode.addData(nt_data);

    geoJsonLayerNetworkElectrified.eachLayer(function (layer) {
        layer.setStyle({
            'opacity': 0//featureData.properties.fraction
        });
    });


    if($("#ib").val().substring(0, 2)=='gc')
    {
        var file = $("#ib").val() + 'c' + $("#bs_c").val() + 'p' + $("#cp_p").val() + '.json';
        //gc_k30s30_c100p300.json
        get_data('data/result/ws/'+file);
    }
    else
    {
        var file = $("#ib").val() + 'c' + $("#bs_c").val() + 'p' + $("#cp_p").val() + '.json';

        if (b_full) {
            get_data('data/result/full/' + file);
        } else {
            get_data('data/result/' + file);
        }


    }



    /*-- to uncomment later


    */
    toggleSideBar();

});



function get_result_tender_setting() {

    //
    
        html_exp_setting="<p style=\"color: rgb(255, 102, 0); font-family: Montserrat; font-size: 16px;\">Experiment setting</p>"
        $("#experiment_setting").html(html_exp_setting);
    
        r_load=true;
    
        if ($("#ib").val() == 'u') {
            //  $("#filter_modal_clear_btn").show();
            load_initial();
            return;
        }
    
        //$("#filter_modal_clear_btn").hide();
    
        selected_edges_array = new Array();// for storing selected edges
        message = '...';
    
        selected_edges_array_node = new Array();// for storing selected edges
    
        number_of_dots_to_show = 0;
        dot_counter = 0;
    
        //restoring all data before applying results
        geoJsonLayerNetworkSelected.clearLayers();
        geoJsonLayerNetworkSelected.addData(nt_data);
    
    
    
        geoJsonLayerNode.clearLayers();
        geoJsonLayerNode.addData(nt_data);
        var id=0;
        geoJsonLayerNetworkElectrified.eachLayer(function (layer) {
            //console.log(id+'-'+layer.feature.properties.network_id);
            //id=id+1;
            layer.setStyle({
                'opacity': 0//featureData.properties.fraction
            });
        });
    
    /*-- to uncomment later
        if($("#ib").val().substring(0, 2)=='gc')
        {
            var file = $("#ib").val() + 'c' + $("#bs_c").val() + 'p' + $("#cp_p").val() + '.json';
            //gc_k30s30_c100p300.json
            get_data('data/result/ws/'+file);
        }
        else
        {
            var file = $("#ib").val() + 'c' + $("#bs_c").val() + 'p' + $("#cp_p").val() + '.json';
    
            if (b_full) {
                get_data('data/result/full/' + file);
            } else {
                get_data('data/result/' + file);
            }
    
    
        }
        */

       // toggleSideBar();

       var file = 'gc_k00s200c300p300.json';
       //gc_k30s30_c100p300.json
       path='data/result/ws/'+file;
//console.log(path);
var url = path; //+ data.name;

$.ajax({
    url: url,
    type: "GET",
    dataType: 'json',
    async: true,
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
        message = '';
        choose_result = '2.053779125E+169';//choose_options[$("#ib").val()];

        number_of_dots_to_show = res.stat.running_time / 60;
        dot_counter = 0;

        // here I have to add / adjust

        selected_edges = res.electrified_edges;
        stat = res.stat;
        //we will come to electrification later
        electrified_edges = res.network_edges;

        

        fill_selected_edges_layer(selected_edges);
        fill_electrified_edges_layer(electrified_edges);

        /*
        if(stat.k_ers)
        {
            ib = stat.k_ers;
        }
        else
        {
            ib = stat.k;
        }

        if (ib == 0) {
            switch ($("#ib").val()) {
                case 's1':
                    ib = 60;
                    break;
                case 's2':
                    ib = 230;
                    break;
                default:
                    ib = 390;
            }
        }


        if ($("#ib").val() == 'u') {
            ib = k_list.length;
        }

        if(stat.k_ers)
        {
            ib_str = (stat.k_ers).toString();
            pcs = stat.k_ers * 5000;
        }
        else
        {
            ib_str = $("#ib").val();
            pcs = stat.k * stat.t;
        }



        if (pcs == 0) {
            switch ($("#ib").val()) {
                case 's1':
                    pcs = 60;
                    break;
                case 's2':
                    pcs = 230;
                    break;
                case 's3':
                    pcs = 390;
                    break;
                default:
                    pcs = ib;
            }
        }




        case_o = true;
        if (ib_str == 's1' || ib_str == 's2' || ib_str == 's3') {
            case_o = false;
        }

        
        if (case_o) {
            message += 'Searching for optimized placement of ' + parseInt(ib_str.replace(/\D/g, "")) * 5 + ' km of electric roads among ' + choose_result + ' possible placements.<br>';
        } else {
            message += 'Evaluating ' + ib * 5 + ' km corridor placement.<br>';
        }
*/
        message += 'Searching for optimized placement of 200 stations among ' + choose_result + ' possible placements.<br>';        
        
        $("#message_text").html(message);

        message += 'Evaluated 200 placements against 10 million transport routes.<br>';
        message += 'Best placed 200 charging station(s) electrifies ' + (stat.electric_work / 1000000000).toFixed(2) + ' Gtkm (' + ((stat.fraction) * 100).toFixed(2) + '%) of the total transport work.';        
        
        
        
        $("#message_text").html(message);

        setTimeout(hide_message, 2000);

        //setTimeout(display_second_message, 2000);

//        message+='<h3>See statistics below and explore results on the map.</h3>';

        /*


        message+='<h3>Parameter settings</h3>' +
            'Battery size: '+$("#bs_c").val()+' kWh<br>' +
            'Charging power: '+$("#cp_p").val()+' kW<br>' +
            'Infrastructure budget (# of 5km long electrified segments): '+ib;


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
            'Total transport work electrified: '+(stat.electric_work/1000000000).toFixed(2)+' Gtkm<br>' +
            'Percent of transport work electrified: '+((stat.fraction)*100).toFixed(2)+' %<br>'

        $("#message_text").html(message);

    

        var current_sel = 'Infrastructure budget (# of 5km long electrified segments) : </br><b>' + $('#ib')[0].options[$("#ib")[0].selectedIndex].innerHTML + '</b></br>';

        var basic_summary_text = current_sel + 'Electrified transport work :</br> <b>' + (stat.electric_work / 1000000000).toFixed(2) + ' Gtkm</b>  <b>(' + ((stat.fraction) * 100).toFixed(2) + '%)</b>';
        if (i_html_results) {
            basic_summary_text = 'Results summary will be displayed here';
            i_html_results = false;
        }
        $("#basic_summary").html(basic_summary_text);


        t1 = new Date().getTime();
        // console.log('t1:'+t1);
        var dt = t1 - t0;
        console.log(dt);
*/




        setup_slider(selected_edges.ids.length);

        //experiment_setting
        //if($("input[name='cs_symbology_variable']:checked").val()=='energy_demand')
//        var option_user_plan = $("#ib")[0].options[$("#ib")[0].selectedIndex].text;
//        var option_battery = $("#bs_c")[0].options[$("#bs_c")[0].selectedIndex].text;
//        var option_charging_power = $("#cp_p")[0].options[$("#cp_p")[0].selectedIndex].text;

        html_exp_setting="<p style=\"color: rgb(255, 102, 0); font-family: Montserrat; font-size: 16px;\">Experiment setting &nbsp;-> Battery size : <strong>"+'300'+" kWh</strong> Charging power : <strong>"+'300'+" kW</strong> Infrastructure plan : <strong>"+'Optimized (200 Stations)'+"</strong></p>"
        $("#experiment_setting").html(html_exp_setting);

    },
    error: function (response) 
    {
        alert("Results not found!");
        message = '';
        $("#message_text").html(message);
        //map.addLayer(geoJsonLayerNetwork);
        map.removeLayer(geoJsonLayerNetworkElectrified);
        map.removeLayer(geoJsonLayerNetworkSelected);
        return;
    }
});

    };



var tiles_carto_dark = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {'attribution': 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'});
var tiles = L.tileLayer('https://cartocdn_{s}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png', {'attribution': 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'});
var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var map = L.map('map', {
    'center': [62.065128, 15.429454],//59.313932, 18.061776
    'zoom': 5,
    'minZoom': 5,
    'layers': [

        tiles_carto_dark,
        //geoJsonLayerNetwork,
        //geoJsonLayerNetworkSelected,        
        geoJsonLayerNode,
        geoJsonCS,
        geoJsonPD,
        geoJsonLayerGrid_200_400,
        geoJsonLayerGrid_25_200,
        geoJsonTf
    ]
});

L.control.custom({
    position: 'topleft',
    content: '<i class="fa fa-question-circle" aria-hidden="true"></i>',
    classes : 'btn btn-light btn-sm pl-2 pr-2 pt-1 pb-1',
    events:
        {
            click: function()
            {
                startIntro();
            }
        }
});//.addTo(map);

var sideInfo = L.control.custom({
    position: 'topleft',
    content: '<p class="m-0 p-2" id="basic_summary">Results summary will be displayed here</p>' +
        '<i class="fa fa-bars align-self-center" style="cursor: pointer;" onclick="toggleInfo()"></i>',
    classes: 'sideinfo d-flex justify-content-between',
});

// .addTo(map);
function toggleInfo() {
    $('.sideinfo').toggleClass('open');
}

var lastHover;
var lastHover_node;
map.on('click', function () {
    $("#hover_info-div").css('bottom', -200);
    $("#legendd").removeClass('show');
    $('.sideinfo').removeClass('open');
    if (lastHover !== undefined) {
        resetHighlight(lastHover)
    }
    console.log('inaside')
    document.getElementById('filter_slider').style.display = 'none';
});

map.on('zoomend', function () {

    if (map.hasLayer(geoJsonLayerNetworkElectrified)) {
        //console.log(map.getZoom());
        for (var key in network_array_leaflet_id) {
            feature_to_update = geoJsonLayerNetworkElectrified.getLayer(network_array_leaflet_id[key]).feature;

            if (feature_to_update.properties.fraction == null || feature_to_update.properties.work == null) {

            } else {
                geoJsonLayerNetworkElectrified.getLayer(network_array_leaflet_id[key]).setStyle(
                    {
                        // 'color': return_line_color(feature_to_update.properties.fraction),//'#7DF9FF',
                        'weight': return_line_weight(feature_to_update.properties.work), //dashArray: '5, 10',
                        dashArray: '0,0',
                        'opacity': 1//featureData.properties.fraction
                    });

            }
        }
    }
});

if (map.hasLayer(geoJsonCS)) map.removeLayer(geoJsonCS);
if (map.hasLayer(geoJsonPD)) map.removeLayer(geoJsonPD);
if (map.hasLayer(geoJsonLayerGrid_200_400)) map.removeLayer(geoJsonLayerGrid_200_400);
if (map.hasLayer(geoJsonLayerGrid_25_200)) map.removeLayer(geoJsonLayerGrid_25_200);
if (map.hasLayer(geoJsonLayerNetwork)) map.removeLayer(geoJsonLayerNetwork);
if (map.hasLayer(geoJsonTf)) map.removeLayer(geoJsonTf);




//geoJsonPD

var overlayMaps = {
    "Grid cost": geoJsonLayerNetwork,
    "Percent of transport work electrified": geoJsonLayerNetworkElectrified,
    "Optimized Charging Station": geoJsonLayerNode,
    "Existing Charging Station": geoJsonCS,
    "Parking spots":geoJsonPD,
    "Transformers":geoJsonTf,
    "Grid 200-400":geoJsonLayerGrid_200_400,
    "Grid 25-200":geoJsonLayerGrid_25_200
    //"Grid cost": geoJsonLayerNetworkGC,
};
var baseMaps = {
    "Dark": tiles_carto_dark,
    "Light": tiles,
    "Google Streets": googleStreets,
    "Google Hybrid": googleHybrid,
    "Google Sat": googleSat    
    
    
};

L.control.layers(baseMaps,overlayMaps).addTo(map);

//setTimeout(hide_message_intro,3000);
function hide_message_intro() {
    $('#info_modal').modal('hide');
}


$(document).on('click', '#click-info-2', function () {
    $('#info_modal_2').modal();
});


function check_kth_server_request() {
    e_data = {"ids": [51369, 4239, 51969], "capacity": 100, "power": 300};

    $.ajax({
        url: 'http://hermes.infra.kth.se:8081/eval',
        type: "GET",
        dataType: 'json',
        data: e_data,
        async: true,
        success: function (response) {
            if (response.error == 'cookie out') {
                return;
            }

            var res = response;


        },
        error: function (response) {
            alert("Results not found!");
            return;
        }
    });
}


$(document).on('click', '#filter_modal_clear_btn', function () {
    k_list = new Array();
    i_load = true;
    i_html_results = true;
    $('#ib')[0].options[0].innerHTML = 'User plan (' + k_list.length + ')';
    //check_kth_server_request();
    load_initial();
});




$(document).on('click', '#click-info', function () {
    $('#info_modal-1').modal();
});

$(document).on('change', '#ib', function () {
    if ($("#ib").val() == 'u') {
        $("#filter_modal_clear_btn").show();
    } else {
        $("#filter_modal_clear_btn").hide();
    }

});

$(document).on('click', '#start_from_here_btn', function () {
    $("#start_from_here_btn").hide();
    //k_list=selected_edges_array.slice();
    k_list = k_list_double.slice()//.filter(onlyUnique)
    $('#ib').val('u');
    $("#filter_modal_clear_btn").show();
    $('#ib')[0].options[0].innerHTML = 'User plan (' + k_list.length + ')';
    load_initial();
});

var b_full = false;
$(document).on('click', '#b_full', function () {
//    b_full=$('#b_full').value;
    b_full = document.getElementById('b_full').checked;
    //console.log(b_full);
});

//$('#ib')[0].options[0].innerHTML='User plan ('+k_list.length+')';
//document.getElementById('user_plan_option').html='nada';

function toggleSideBar() {
    $('#sidebar,#sidebar-content').toggleClass('open');
    document.getElementById("filter_slider").style.display = "none";
}

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval

    //  for (var i = 0; i < grades.length; i++) {
    var html = '<i style="font-size: 20px" class="fa fa-list-ul m-0 w-100" data-toggle="collapse" data-target="#legendd"></i>' +
        '<div id="legendd" class="collapse" style="max-height:500px;overflow-y:scroll; width:300px;">' +
        '<br><div><b>Grid Cost (MSEK)</b></div>' +
        // '<div><i style="margin-top: 10px;height:1px;background:repeating-linear-gradient(to right,white 0,white 3px,transparent 3px,transparent 7px)"></i>' + 'No cost calculated' + '</div>' +
        '<div><i style="background:#C4BCF8;height: 5px;margin-top: 10px"></i> ' + '0 - 1' + '</div>' +
        '<div><i style="background:#B1A5F7;height: 5px;margin-top: 9px"></i> ' + '1 - 2' + '</div>' +
        '<div><i style="background:#8B77F5;height: 5px;margin-top: 8px"></i> ' + '2 - 4' + '</div>' +
        '<div><i style="background:#6549F3;height: 5px;margin-top: 8px"></i> ' + '4 - 7' + '</div>' +
        '<div><i style="background:#3F1BF1;height: 5px;margin-top: 7px"></i> ' + '7 - 10' + '</div>' +
        '<div><b>Percent of transport work </br>(i.e., tkm) electrified</b></div>' +
        '<div><i style="margin-top: 10px;height:1px;background:repeating-linear-gradient(to right,white 0,white 3px,transparent 3px,transparent 7px)"></i>' + 'No transport' + '</div>' +
        '<div><i style="background:#7CFC00;height: 6px;margin-top: 6px"></i> ' + '00 - 25%' + '</div>' +
        '<div><i style="background:#32CD32;height: 6px;margin-top: 6px"></i> ' + '25 - 50%' + '</div>' +
        '<div><i style="background:#228B22;height: 6px;margin-top: 6px"></i> ' + '50 - 75%' + '</div>' +
        '<div><i style="background:#006400;height: 6px;margin-top: 6px"></i> ' + '75 - 100%' + '</div>' +   
        '<div><b>Grid (kV)</b></div>' +
        '<div><i style="background:#00FFFF;height: 5px;margin-top: 10px"></i> ' + '200 - 400' + '</div>' +
        '<div><i style="background:#5F9EA0;height: 4px;margin-top: 9px"></i> ' + '25 - 200' + '</div>' +
        '<div id="transformers">' +
        '<div><b>Transformers</b></div>' +
        '<div><img src="transformer.PNG" height="15px" width="15px">' + '</div>' +
        '</div>'+
        '<div id="cs_legend">' +
        '<div><b>Optimized Charging Station - Energy Demand (GWh)</b></div>' +
        '<div><i style="height: 8px;  width: 8px;  background-color: #FF6600;    border-radius: 100%;  border-width: 1px;border-style: solid;\tborder-color: White;  display: inline-block;margin-top: 6px;"></i>' + '0 - 5' + '</div>' +
        '<div><i style="height: 10px;  width: 10px;  background-color: #FF6600;    border-radius: 100%;  border-width: 1px;border-style: solid;\tborder-color: White;  display: inline-block;margin-top: 5px"></i>' + '5 - 10' + '</div>' +
        '<div><i style="height: 12px;  width: 12px;  background-color: #FF6600;    border-radius: 100%;  border-width: 1px;border-style: solid;\tborder-color: White;  display: inline-block;margin-top: 4px;"></i>' + '10 - 15' + '</div>' +
        '<div><i style="height: 14px;  width: 14px;  background-color: #FF6600;  border-radius: 100%;  border-width: 1px;border-style: solid;\tborder-color: White;  display: inline-block;margin-top: 3px;"></i>' + '15 +' + '</div>' +
        '</div>'+
        '<div id="cs_existing_legend">' +
        '<div><b>Existing Charging Station - Power (kW)</b></div>' +
        '<div><img src="green_plus.png" height="15px" width="15px">' + ' NA' + '</div>' + 
        '<div><img src="charger_green.PNG" height="12px" width="12px">' + ' 250' + '</div>' +
         '<div><img src="charger_yellow.PNG" height="16px" width="16px">' + ' 300' + '</div>' +
         '<div><img src="charger_red.PNG" height="20px" width="20px">' + ' 350' + '</div>' +         
        '</div>'+
        '<div id="parking_spots">' +
        '<div><b>Existing Parking Spots</b></div>' +
        '<div><img src="parking.png" height="15px" width="15px">' + '</div>' +
        '</div>'+
        '<div><b>Total transport work (Mtkm)</b></div>' +
        '<div><i style="margin-top: 10px;height:1px;background:repeating-linear-gradient(to right,white 0,white 3px,transparent 3px,transparent 7px)"></i>' + 'No transport' + '</div>' +
        '<div><i style="background:white;height: 1px;margin-top: 10px"></i> ' + '0 - 1' + '</div>' +
        '<div><i style="background:white;height: 2px;margin-top: 9px"></i> ' + '1 - 4' + '</div>' +
        '<div><i style="background:white;height: 3px;margin-top: 8px"></i> ' + '4 - 10' + '</div>' +
        '<div><i style="background:white;height: 4px;margin-top: 8px"></i> ' + '10 - 28' + '</div>' +
        '<div><i style="background:white;height: 5px;margin-top: 7px"></i> ' + '28 - 54' + '</div>' +
        '</div>';
    div.style.top = '5px';
    div.style.paddingTop = '0';
    div.innerHTML = html;

    return div;
};
legend.addTo(map);
if ($(window).height() > 600 && $(window).width() > 700) {
    $("#legendd").addClass('show');
}
//$("#bs_c").val()+'p'+$("#cp_p").val()

var t0 = 0;
var t1 = 0;
//var time = new Date();
//var t1 = time.getTime() - t0 ;

function toFixed(num, fixed) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}

function handleChange(src) {
    //alert(src.value);
    if(src.value=='energy_demand')
    {
        style_feature_based_on_attribute('energy_demand');

        $("#cs_legend").html('<div><br><b>Charging Station - Energy Demand (GWh)</b></div>' +
            '<div><i style="height: 8px;  width: 8px;  background-color: #FF6600;    border-radius: 100%;  border-width: 1px;border-style: solid;\tborder-color: White;  display: inline-block;margin-top: 6px;"></i>' + '0 - 5' + '</div>' +
            '<div><i style="height: 10px;  width: 10px;  background-color: #FF6600;    border-radius: 100%;  border-width: 1px;border-style: solid;\tborder-color: White;  display: inline-block;margin-top: 5px"></i>' + '5 - 10' + '</div>' +
            '<div><i style="height: 12px;  width: 12px;  background-color: #FF6600;    border-radius: 100%;  border-width: 1px;border-style: solid;\tborder-color: White;  display: inline-block;margin-top: 4px;"></i>' + '10 - 15' + '</div>' +
            '<div><i style="height: 14px;  width: 14px;  background-color: #FF6600;  border-radius: 100%;  border-width: 1px;border-style: solid;\tborder-color: White;  display: inline-block;margin-top: 3px;"></i>' + '15 +' + '</div>');
    }
    else
    {
        style_feature_based_on_attribute('bcr');
        $("#cs_legend").html('<div><br><b>Charging Station - Benefit cost ratio (GWh/MSEK)</b></div>' +
            '<div><i style="height: 8px;  width: 8px;  background-color: #FF6600;    border-radius: 100%;  border-width: 1px;border-style: solid;\tborder-color: White;  display: inline-block;margin-top: 6px;"></i>' + '0 - 0.16' + '</div>' +
            '<div><i style="height: 10px;  width: 10px;  background-color: #FF6600;    border-radius: 100%;  border-width: 1px;border-style: solid;\tborder-color: White;  display: inline-block;margin-top: 5px;"></i>' + '0.16 - 0.17' + '</div>' +
            '<div><i style="height: 12px;  width: 12px;  background-color: #FF6600;    border-radius: 100%;  border-width: 1px;border-style: solid;\tborder-color: White;  display: inline-block;margin-top: 4px;"></i>' + '0.17 - 0.18' + '</div>' +
            '<div><i style="height: 14px;  width: 14px;  background-color: #FF6600;  border-radius: 100%;  border-width: 1px;border-style: solid;\tborder-color: White;  display: inline-block;margin-top: 3px;"></i>' + '0.18 +' + '</div>');

    }

    if(slider_value>0)
    {
        show_filtered_on_slider(slider_value);
    }    
}

function style_feature_based_on_attribute(attribute_value)
{
    if(attribute_value=='energy_demand')
    {
        for (var i = 0; i < geoJsonLayerNode.getLayers().length; i++) {
            geoJsonLayerNode.getLayers()[i].setStyle({
                radius: return_node_size(selected_edges_demand_array_node[geoJsonLayerNode.getLayers()[i].feature.properties.network_id].demand/(1000000),'energy_demand'),//return_node_size //(return_node_size(feature.properties.tr_start_count))
                fillColor: node_color,
                color: "#FFF",
                weight: 1,
                opacity: 1,
                fillOpacity: 1
                //className: 'seg-circles-'+rpNd
            });
        }
    }else
    {
        for (var i = 0; i < geoJsonLayerNode.getLayers().length; i++) {
            geoJsonLayerNode.getLayers()[i].setStyle({
                radius: return_node_size(selected_edges_demand_array_node[geoJsonLayerNode.getLayers()[i].feature.properties.network_id].cbratio/(1000000),'bcr'),//return_node_size //(return_node_size(feature.properties.tr_start_count))
                fillColor: node_color,
                color: "#FFF",
                weight: 1,
                opacity: 1,
                fillOpacity: 1
                //className: 'seg-circles-'+rpNd
            });
        }
    }

//    geoJsonLayerNode.getLayers()

};

function load_initial() {
    t0 = new Date().getTime();
    console.log('Request sent at ' + new Date().getTime());
    $('#info_modal_3').modal({backdrop: "static"});

    setTimeout(load_initial_data_after_pause,001);
    

    //alert('now');
    // console.log('t0:'+t0);

//    load_initial_style();

}

function hide_model_start_intro()
{
    $('#info_modal-1').modal('hide');
    startIntro();
}

function load_initial_data_after_pause()
{
    
    $.ajax({
        url: 'https://spatialstack.com/reno_admin/eval.php/eval.php?ids=' + k_list.toString() + '&capacity=' + $("#bs_c").val() + '&power=' + $("#cp_p").val(),
        type: "GET",
        dataType: 'json',
        async: true,
        success: function (response) {
            openinfo()
            if (response.error == 'cookie out') {
                return;
            }
            var res = JSON.parse(response);
            console.log('Data recieved at ' + new Date().getTime());
            process_result_data(res);
        },
        error: function (response) {
            openinfo()
            alert("Results not found!");
            message = '';
            $("#message_text").html(message);
           // map.addLayer(geoJsonLayerNetwork);
            map.removeLayer(geoJsonLayerNetworkElectrified);
            map.removeLayer(geoJsonLayerNetworkSelected);
        }
    });
    
    
}

var initApp = false;
load_initial();

function openinfo() {
    if (!initApp) {
        //$('#info_modal').modal();
        initApp = true;
    }
}

function load_initial_style() {
    for (var key in network_array_leaflet_id) {
        feature_to_update = geoJsonLayerNetworkElectrified.getLayer(network_array_leaflet_id[key]).feature;

        geoJsonLayerNetworkElectrified.getLayer(network_array_leaflet_id[key]).setStyle(
            {
                'color': 'white',//'#7DF9FF',
                'weight': return_line_weight(feature_to_update.properties.work), //dashArray: '5, 10',
                dashArray: '0,0',
                'opacity': 1//featureData.properties.fraction
            });
    }

}




$("#slider-2").slider({
    min: 0, // min value
    max: 1, // max value
    step: 1,
    value: 0, // default value of slider
    slide: function (event, ui) {
        console.log(ui.value);
    }
}).each(function () {

        //
        // Add labels to slider whose values
        // are specified by min, max and whose
        // step is set to 1
        //

        // Get the options for this slider
        var opt = $(this).data().uiSlider.options;

        // Get the number of possible values
        var vals = opt.max - opt.min;

        // Space out values
        for (var i = 0; i <= vals; i = i + 50) 
        {

            if(i==0)
            {
                var el = $('<label>' + (i+1) + '</label>').css('left', (i / vals * 100) + '%');
               // $("#slider-2").append(el);
            }
            else
            {
                var el = $('<label>' + (i) + '</label>').css('left', (i / vals * 100) + '%');
                //$("#slider-2").append(el);
            }
        }



    });

$("#energy_demand").prop("checked", true);

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
