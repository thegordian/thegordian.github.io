var search_val_array;
var search_val_array_agg=[];
var selected_segment_ids=[];
var no_filter_layer= true;
var multiple_selection=false;
var hover=false;
var hover_node=false;
var node_leaflet_id_node_id_mapping=[];
var l=0;
var k=0;
var line_weight=10;
var max_trs=30;//max trj at a segment =89
var max_trs_optimal=0;

var tr_color='green';
var hover_color='blue';
var selected_color='yellow';
var node_color='red';



var total_steps_o = 0;
var current_step_o = 0;
var progress_o = 0;
var markers_o = L.layerGroup();


var total_steps_u = 0;
var current_step_u = 0;
var progress_u = 0;
var markers_u = L.layerGroup();




window.addEventListener("resize", set_map_size);

function set_map_size()
{
    if(map)
    {
        if(window.innerWidth <450)
        {
            map.setView(new L.LatLng(59.303246, 18.069251), 13);
        }
        //mobile}
        else {
            map.setView(new L.LatLng(59.313932, 18.061776), 14);
        }//laptop}
    }
}



// Eval layers

var search_val_array_eval;
var search_val_array_agg_eval=[];
var node_leaflet_id_node_id_mapping_eval=[];

var geoJsonLayerNode= L.geoJson(node_data,
    {

      pointToLayer: function (feature, latlng) {
//        if(feature.properties.node_id==2){alert('2')};
        //feature._leaflet_id = feature.properties.node_id;
        return L.circleMarker(latlng, {
          radius: (return_node_size(feature.properties.tr_start_count)),//return_node_size
          fillColor: node_color,
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        });
      },

      onEachFeature: function (featureData, featureLayer)
      {
        featureLayer.on('mouseover', highlightFeature_node);
        featureLayer.on('mouseout', resetHighlight_node);

        //featureData._leaflet_id = featureData.properties.node_id;
        //featureLayer._leaflet_id = featureData.properties.node_id;
        // node_leaflet_id_node_id_mapping.push(featureLayer._leaflet_id);

        /*featureLayer.setStyle({
          radius: (return_node_size(featureData.properties.tr_start_count)),//return_node_size
          fillColor: node_color,
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        });*/

        //featureData._leaflet_id = featureData.properties.node_id;



      }
    }
);

var geoJsonLayerTr_animate_feature;

geoJsonLayerTr_animate_feature= L.geoJson(tr_data, {

    // Executes on each feature in the dataset
    onEachFeature: function (featureData, featureLayer) {

        featureLayer.setStyle({
            'color': 'red',
            'weight': 3,
            'opacity': 1
        });

    }

});
geoJsonLayerTr_animate_feature.clearLayers();



var geoJsonLayerTr_animate_feature_user;

geoJsonLayerTr_animate_feature_user= L.geoJson(tr_data, {

    // Executes on each feature in the dataset
    onEachFeature: function (featureData, featureLayer) {

        featureLayer.setStyle({
            'color': 'red',
            'weight': 3,
            'opacity': 1
        });

    }

});
geoJsonLayerTr_animate_feature_user.clearLayers();






geoJsonLayerTr_eval= L.geoJson(tr_data, {

  // Executes on each feature in the dataset
  onEachFeature: function (featureData, featureLayer) {
    // featureData contains the actual feature object
    // featureLayer contains the indivual layer instance

    //total_tr++;

    featureLayer.setStyle({
      'color': tr_color,
        'weight': line_weight,
      'opacity': 1/max_trs_optimal
    });

  },
  filter: function (featureData) {
    if(typeof search_val_array_eval === 'undefined' || no_filter_layer)
    {
      return true;
    }
    return (search_val_array_agg_eval.indexOf(featureData.properties.id) !== -1 ? true : false);
  }

});

geoJsonLayerSeg_eval= L.geoJson(seg_data_, {

  // Executes on each feature in the dataset
  onEachFeature: function (featureData, featureLayer) {

    featureLayer._leaflet_id = featureData.properties.id;
    featureLayer.setStyle({
      'color': 'white',
        'weight': line_weight,
      'opacity': 0.1
    });

    //featureLayer.bindTooltip(featureData.properties.id);

   // featureLayer.on('mouseover', highlightFeature_eval);
   // featureLayer.on('mouseout', resetHighlight_eval);


  }
}).on('click', function () {
  // Fires on each feature in the layer
  console.log('Clicked GeoJSON layer');
});

geoJsonLayerNode_eval= L.geoJson(node_data,
    {

      pointToLayer: function (feature, latlng) {
//        if(feature.properties.node_id==2){alert('2')};
        //feature._leaflet_id = feature.properties.node_id;
        return L.circleMarker(latlng, {
          radius: (return_node_size(feature.properties.tr_start_count)),//return_node_size
          fillColor: node_color,
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        });
      },

      onEachFeature: function (featureData, featureLayer)
      {
      //  featureLayer.on('mouseover', highlightFeature_node_eval);
      //  featureLayer.on('mouseout', resetHighlight_node_eval);

        //featureLayer.on('mouseover', onMapHoverNode);
        //featureData._leaflet_id = featureData.properties.node_id;
        //featureLayer._leaflet_id = featureData.properties.node_id;
        // node_leaflet_id_node_id_mapping.push(featureLayer._leaflet_id);

        /*featureLayer.setStyle({
          radius: (return_node_size(featureData.properties.tr_start_count)),//return_node_size
          fillColor: node_color,
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        });*/

        //featureData._leaflet_id = featureData.properties.node_id;



      }
    }
);

///////// Eval layer end


// opt layers

var search_val_array_opt;
var search_val_array_agg_opt=[];
var node_leaflet_id_node_id_mapping_opt=[];

geoJsonLayerTr_opt= L.geoJson(tr_data, {

  // Executes on each feature in the dataset
  onEachFeature: function (featureData, featureLayer) {
    // featureData contains the actual feature object
    // featureLayer contains the indivual layer instance

    //total_tr++;

    featureLayer.setStyle({
      'color': tr_color,
        'weight': line_weight,
      'opacity': 1/max_trs_optimal
    });

  },
  filter: function (featureData) {
    if(typeof search_val_array_opt === 'undefined' || no_filter_layer)
    {
      return true;
    }
    return (search_val_array_agg_opt.indexOf(featureData.properties.id) !== -1 ? true : false);
  }

});

geoJsonLayerSeg_opt= L.geoJson(seg_data_, {

  // Executes on each feature in the dataset
  onEachFeature: function (featureData, featureLayer) {

    featureLayer._leaflet_id = featureData.properties.id;
    featureLayer.setStyle({
      'color': 'white',
        'weight': line_weight,
      'opacity': 0.1
    });

    //featureLayer.bindTooltip(featureData.properties.id);

    //featureLayer.on('mouseover', onMapHover);
   // featureLayer.on('mouseover', highlightFeature_opt);
   // featureLayer.on('mouseout', resetHighlight_opt);

  }
}).on('click', function () {
  // Fires on each feature in the layer
  console.log('Clicked GeoJSON layer');
});

geoJsonLayerNode_opt= L.geoJson(node_data,
    {

      pointToLayer: function (feature, latlng) {
//        if(feature.properties.node_id==2){alert('2')};
        //feature._leaflet_id = feature.properties.node_id;
        return L.circleMarker(latlng, {
          radius: (return_node_size(feature.properties.tr_start_count)),//return_node_size
          fillColor: node_color,
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        });
      },

      onEachFeature: function (featureData, featureLayer)
      {
      //  featureLayer.on('mouseover', highlightFeature_node_opt);
      //  featureLayer.on('mouseout', resetHighlight_node_opt);

        //featureLayer.on('mouseover', onMapHoverNode);
        //featureData._leaflet_id = featureData.properties.node_id;
        //featureLayer._leaflet_id = featureData.properties.node_id;
        // node_leaflet_id_node_id_mapping.push(featureLayer._leaflet_id);

        /*featureLayer.setStyle({
          radius: (return_node_size(featureData.properties.tr_start_count)),//return_node_size
          fillColor: node_color,
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        });*/

        //featureData._leaflet_id = featureData.properties.node_id;

      }
    }
);

///////// Optimal layer end



var geoJsonLayerSeg= L.geoJson(seg_data_, {

  // Executes on each feature in the dataset
  onEachFeature: function (featureData, featureLayer) {

    featureLayer._leaflet_id = featureData.properties.id;
    featureLayer.setStyle({
      'color': 'white',
        'weight': line_weight,
      'opacity': 0.1
    });

    //featureLayer.bindTooltip(featureData.properties.id);

    //featureLayer.on('mouseover', onMapHover);
    //featureLayer.on('mouseout', removePopup);

    featureLayer.on('mouseover', highlightFeature);
    featureLayer.on('mouseout', resetHighlight);

    featureLayer.on('click', function (e) {
      // Fires on click of single feature
      console.log('Clicked segment ID: ' + featureData.properties.id);

      lyr=e.target;

      if(selected_segment_ids.indexOf(featureData.properties.id) === -1)
      {
        if(!multiple_selection)
        {
          if(selected_segment_ids.length>0)
          {
            for(var x=0;x<selected_segment_ids.length;x++)
            {
              feature = geoJsonLayerSeg.getLayer(selected_segment_ids[x]);
              feature.setStyle(
                  {
                    //'weight': 3,
                    'color': 'white',
                    'opacity': 0.1
                  });
            }
          }
          selected_segment_ids=[];
          //geoJsonLayerSeg.clearLayers();
          //geoJsonLayerSeg.addData(seg_data);
        }
        selected_segment_ids.push(featureData.properties.id);

 //       $("#slider-1").slider('value',selected_segment_ids.length);
        //$("#slider-1").val(selected_segment_ids.length);

        //$("#count_ss").val(selected_segment_ids.length);


        lyr.setStyle(
            {
              //'weight': 3,
              'color': selected_color,
              'opacity': 1
              //,'dashArray': '5, 10'
            });

      }
      else
      {
        index_of=selected_segment_ids.indexOf(featureData.properties.id);
        selected_segment_ids.splice(index_of, 1);
        lyr.setStyle(
            {
              //'weight': 3,
              'color': 'white',
              'opacity': 0.1
            });

      }
      ;

      if (selected_segment_ids.length>0)
      {
        no_filter_layer=false;
        search_val_array_agg=[];
        var i;
        //max_trs=0;
        for (i = 0; i < selected_segment_ids.length; i++)
        {

          search_val_array=seg_tr_mapping[parseInt(selected_segment_ids[i])];
          search_val_array_agg=union_arrays(search_val_array_agg,search_val_array);
        }
        //alert(max_trs);


        //drawing node layer
        geoJsonLayerNode.eachLayer(function(layer,latlng)
        {
          layer.feature.properties.tr_start_count=0;
          //console.log(layer._leaflet_id);
          node_leaflet_id_node_id_mapping[layer._leaflet_id]=layer.feature.properties.node_id;
        });

        for (y = 0; y < search_val_array_agg.length; y++)
        {
          console.log(tr_node_mapping[search_val_array_agg[y]][0]);
          console.log(node_leaflet_id_node_id_mapping.indexOf(tr_node_mapping[search_val_array_agg[y]][0]));
          var index_id=node_leaflet_id_node_id_mapping.indexOf(tr_node_mapping[search_val_array_agg[y]][0]);
          geoJsonLayerNode.getLayer(index_id).feature.properties.tr_start_count=geoJsonLayerNode.getLayer(index_id).feature.properties.tr_start_count+1;
        }

        geoJsonLayerNode.eachLayer(function(layer,latlng)
        {
          layer.setStyle({
            radius: (return_node_size(layer.feature.properties.tr_start_count)),
            fillColor: node_color,
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 1
          });
//          layer.redraw();
        });


      }
      else
      {
        no_filter_layer=true;
        load_node_default();

        search_val_array_agg=[];
      }



      if(search_val_array)
      {
        console.log('Total trajectories:'+search_val_array_agg.length);
      }
      else
      {
        search_val_array='';
        console.log('no trajectory');
      }

//      $("#slider-1").slider("option",'value',selected_segment_ids.length);
      $(".slider-1" ).slider( "option", "value", selected_segment_ids.length);
      $("#len").html(':'+selected_segment_ids.length);
      k=selected_segment_ids.length;
      $("#count_ss").val(selected_segment_ids.length);
      $("#sels").val(selected_segment_ids.toString());
      $("#numtraj").val(search_val_array_agg.length);
      $("#trajid").val(search_val_array_agg.toString());

      //total_tr=0;
      geoJsonLayerTr.clearLayers();
      geoJsonLayerTr.addData(tr_data);

      geoJsonLayerSeg.bringToFront();

      geoJsonLayerNode.bringToFront();

    });
  }
}).on('click', function () {
    // Fires on each feature in the layer
    console.log('Clicked GeoJSON layer');
});


var geoJsonLayerTr= L.geoJson(tr_data, {

  // Executes on each feature in the dataset
  onEachFeature: function (featureData, featureLayer) {
    // featureData contains the actual feature object
    // featureLayer contains the indivual layer instance

    //total_tr++;

    featureLayer.setStyle({
      'color': tr_color,
        'weight':line_weight,
      'opacity': 1/max_trs
    });

  },
  filter: function (featureData) {
    if(typeof search_val_array === 'undefined' || no_filter_layer)
    {
      return true;
    }
    return (search_val_array_agg.indexOf(featureData.properties.id) !== -1 ? true : false);
  }

});

var total_tr=geoJsonLayerTr.getLayers().length;


function load_node_default()
{
  search_val_array_agg=[];

  geoJsonLayerNode.eachLayer(function(layer,latlng)
  {
    layer.feature.properties.tr_start_count=0;
    node_leaflet_id_node_id_mapping[layer._leaflet_id]=layer.feature.properties.node_id;
  });




  for (var z = 0; z < total_tr; z++)
  {
    search_val_array_agg.push(z);
  }

  for (y = 0; y < search_val_array_agg.length; y++)
  {
    var index_id=node_leaflet_id_node_id_mapping.indexOf(tr_node_mapping[search_val_array_agg[y]][0]);
    geoJsonLayerNode.getLayer(index_id).feature.properties.tr_start_count=geoJsonLayerNode.getLayer(index_id).feature.properties.tr_start_count+1;
  }

  geoJsonLayerNode.eachLayer(function(layer,latlng)
  {
    layer.setStyle({
      radius: (return_node_size_max(layer.feature.properties.tr_start_count,13)),
      fillColor: node_color,
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    });
  });

  search_val_array_agg=[];
}


function return_node_size(num_of_tr)
{
  return num_of_tr;
  var n_tr=parseInt(num_of_tr);
  switch (true) {
    case (n_tr<1):
      return 0;
      break;
    case (n_tr<3):
      return 2;
      break;
    case (n_tr<6):
      return 4;
      break;
    case (n_tr<9):
      return 6;
      break;
    case (n_tr<12):
      return 8;
      break;
    case (n_tr<15):
      return 10;
      break;
    default:
      return 12
      break;
  }
}

function return_node_size_max(num_of_tr,max)
{
//    return num_of_tr;
    var n_tr=parseInt(num_of_tr);
    switch (true) {
        case (n_tr<1):
            return 0;
            break;
        case (n_tr<1*(max/4)):
            return 3;
            break;
        case (n_tr<2*(max/4)):
            return 6;
            break;
        case (n_tr<3*(max/4)):
            return 9;
            break;
        case (n_tr<4*(max/4)):
            return 12;
            break;
        default:
            return 12
            break;
    }
}

// n_tr<3*(max_value/4)

var popup = L.popup({offset: [0, -5]});

function onMapHover(e)
{
    if (hover)
    {
        popup
            .setLatLng(e.latlng)
           .setContent("Trajectories:" + e.target.feature.properties.number_of_tra)
         .openOn(map);
    }
}

function onMapHoverNode(e)
{
  if (hover_node)
  {
    popup
        .setLatLng(e.latlng)
        .setContent("Starting node for " + e.target.feature.properties.tr_start_count+' trajectories')
        .openOn(map);
  }
}


function removePopup(e)
{
  e.target.closePopup();
}


function highlightFeature_node_eval(e)
{

  if(hover_node)
  {

  var layer = e.target;

  $("#eval_info").val("Starting node for " + e.target._radius+' trajectories');

  layer.setStyle(
      {
        radius: (return_node_size(e.target._radius)),
        fillColor: "#4b4dff",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
      }
  );

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  }

}

function resetHighlight_node_eval(e)
{
  //geoJsonLayerSeg.resetStyle(e.target);
  $("#eval_info").val('');
  e.target.setStyle(
      {
        radius: (return_node_size(e.target._radius)),
        fillColor: node_color,
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
      });
}

function highlightFeature_node_opt(e)
{

  if(hover_node)
  {

    var layer = e.target;

    $("#opt_info").val("Starting node for " + e.target._radius+' trajectories');

    layer.setStyle(
        {
          radius: (return_node_size(e.target._radius)),
          fillColor: "#4b4dff",
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 1
        }
    );

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }

  }

}

function resetHighlight_node_opt(e)
{
  //geoJsonLayerSeg.resetStyle(e.target);
  $("#opt_info").val('');
  e.target.setStyle(
      {
        radius: (return_node_size(e.target._radius)),
        fillColor: node_color,
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
      });
}

function highlightFeature_node(e)
{
  if(hover_node)
  {

    var layer = e.target;

    $("#hover_info").css('color', '#000000');
    $("#hover_info").html('<b>'+ e.target.feature.properties.tr_start_count+"</b> trajectories start from here");

    layer.setStyle(
        {
          radius: (return_node_size_max(layer.feature.properties.tr_start_count,13)),
          fillColor: "#4b4dff",
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 1
        }
    );

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }

  }

}

function resetHighlight_node(e)
{
  //geoJsonLayerSeg.resetStyle(e.target);
    $("#hover_info").css('color', '#808080');
    $("#hover_info").html('Hover over the map for trajectory / starting point statistics');

  e.target.setStyle(
      {
        radius: (return_node_size_max(e.target.feature.properties.tr_start_count,13)),
        fillColor: node_color,
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
      });
}




function highlightFeature(e)
{
  if (hover) {

      var layer = e.target;

      $("#hover_info").css('color', '#000000');
      $("#hover_info").html('<b>'+e.target.feature.properties.number_of_tra +"</b> trajectories contain the segment");


//      $("#hover_info").val(''+e.target.feature.properties.number_of_tra +" trajectories contain the segment");

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

  if(selected_segment_ids.includes(e.target._leaflet_id))
  {
    var layer = e.target;
      $("#hover_info").css('color', '#000000');
      $("#hover_info").html("<b>"+e.target.feature.properties.number_of_tra +"</b> trajectories contain the segment");

    layer.setStyle(
        {
          //'weight': 3,
          'color': selected_color,
          'opacity': 1
          //,'dashArray': '5, 10'
        });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
    //$("#hover_info").val('');
      $("#hover_info").css('color', '#808080');
    $("#hover_info").html('Hover over the map for trajectory / starting point statistics');
  }
  else {

    //geoJsonLayerSeg.resetStyle(e.target);
      $("#hover_info").css('color', '#808080');
      $("#hover_info").html('Hover over the map for trajectory / starting point statistics');
    e.target.setStyle(
        {
          //'weight': 3,
          'color': 'white',
          'opacity': 0.1
        });
  }
}


function highlightFeature_eval(e)
{
  if (hover) {

    var layer = e.target;

    $("#eval_info").val("Trajectories:" + e.target.feature.properties.number_of_tra);

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

function resetHighlight_eval(e)
{

  if(selected_segment_ids_eval.includes(e.target._leaflet_id))
  {
    var layer = e.target;

    $("#eval_info").val("Trajectories:" + e.target.feature.properties.number_of_tra);

    layer.setStyle(
        {
          //'weight': 3,
          'color': selected_color,
          'opacity': 1
          //,'dashArray': '5, 10'
        });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
    $("#hover_info").val('');
  }
  else {

    //geoJsonLayerSeg.resetStyle(e.target);
    $("#hover_info").val('');
    e.target.setStyle(
        {
          //'weight': 3,
          'color': 'white',
          'opacity': 0.1
        });
  }
}



function highlightFeature_opt(e)
{
  if (hover) {

    var layer = e.target;

    $("#opt_info").val("Trajectories:" + e.target.feature.properties.number_of_tra);

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

function resetHighlight_opt(e)
{

  if(selected_segment_ids_opt.includes(e.target._leaflet_id))
  {
    var layer = e.target;

    $("#opt_info").val("Trajectories:" + e.target.feature.properties.number_of_tra);

    layer.setStyle(
        {
          //'weight': 3,
          'color': selected_color,
          'opacity': 1
          //,'dashArray': '5, 10'
        });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
    $("#hover_info").val('');
  }
  else {

    //geoJsonLayerSeg.resetStyle(e.target);
    $("#hover_info").val('');
    e.target.setStyle(
        {
          //'weight': 3,
          'color': 'white',
          'opacity': 0.1
        });
  }
}


var map = L.map('map', {
  'center': [59.313932, 18.061776],
  'zoom': 14,
  'layers': [
//    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {'attribution': 'Map data &copy; OpenStreetMap contributors'}),
     L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {'attribution': 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'}),

    geoJsonLayerTr,
    geoJsonLayerSeg,
    geoJsonLayerNode


  ]
});

L.control.scale({ position: 'topleft' }).addTo(map);

if(window.innerWidth <450)
{
    map.setView(new L.LatLng(59.303246, 18.069251), 13);
}
//mobile}
else {
    map.setView(new L.LatLng(59.313932, 18.061776), 14);
}//laptop}



function union_arrays (x, y) {
  var obj = {};
  for (var i = x.length-1; i >= 0; -- i)
    obj[x[i]] = x[i];
  for (var i = y.length-1; i >= 0; -- i)
    obj[y[i]] = y[i];
  var res = []
  for (var k in obj) {
    if (obj.hasOwnProperty(k))  // <-- optional
      res.push(obj[k]);
  }
  return res;
}


  var map_1 = L.map('map-1', {
      center: [59.313932, 18.061776],
      zoom: 13,
      maxZoom: 20,
      layers: [
        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {'attribution': 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'}),
        geoJsonLayerTr_eval,
        geoJsonLayerSeg_eval
        ,geoJsonLayerNode_eval,
          geoJsonLayerTr_animate_feature_user,markers_u
      ]
  });

  var map_2 = L.map('map-2', {
      center: [59.313932, 18.061776],
      zoom: 13,
      maxZoom: 22,
      layers: [
        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {'attribution': 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'}),
        geoJsonLayerTr_opt,
        geoJsonLayerSeg_opt
        ,geoJsonLayerNode_opt
          ,geoJsonLayerTr_animate_feature
          ,markers_o
      ]
  });

L.control.scale({ position: 'topleft' }).addTo(map_1);
L.control.scale({ position: 'topleft' }).addTo(map_2);


// create the sidebar instance and add it to the map
var sidebar = L.control.sidebar({ container: 'sidebar', autopan: false,position:'right', title: 'Setting' }).addTo(map).open('home');

$.fn.textWidth = function(text, font) {
  if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
  $.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));
  return $.fn.textWidth.fakeEl.width();
};

function update_dims() {
  setTimeout(function(){
    // $('.result-white-box-1').width($('#eval_text').textWidth() + parseInt($('#eval_text').textWidth() / 6));
    // $('.result-white-box-2').width($('#opt_text').textWidth() + parseInt($('#opt_text').textWidth() / 6));
  }, 1000);
}
$(document).ready(function() {

    // $(document).on('mouseover', '[data-tooltip-content]', function () {
    //     $(this).attr('data-tooltip-content','The problem of');
    // });

    $(document).on('click', '#click-info', function () {
        $('#info_modal').modal();
    });
    $(document).on('click', '#click-info-2', function () {
        $('#info_modal_2').modal();
    });

    $(".slider-1").slider({
        range: "max",
        min: 0, // min value
        max: 10, // max value
        step: 1,
        value: 0, // default value of slider
        disabled: true,
        slide: function (event, ui) {
            k = ui.value;
            $("#len").html(':' + k);
        }
    });

    $("#slider-2").slider({
        min: 0, // min value
        max: 250, // max value
        step: 50,
        value: 0, // default value of slider
        slide: function (event, ui) {
            l = ui.value;
            //$("#dis").html(''+l);
            //k=1;

        }

    })
        .each(function () {

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
            for (var i = 0; i <= vals; i = i + 50) {

                var el = $('<label>' + (i) + '</label>').css('left', (i / vals * 100) + '%');
                $("#slider-2").append(el);
            }

        });


    $(window).on('resize', function () {
        if ($('#absolute-maps').hasClass('d-flex')) {
            update_dims();
        }
    });

//  $('.slider-2').slider();

    $('#filter_modal_toggle_btn').on('click', function () {

        update_dims();

        //eval_info
        $("#eval_info").val("");
        $("#opt_info").val("");

//    alert(res);
        //selected_segment_ids
        if (selected_segment_ids.length == 0) {
            alert('No segment selected');
            return;
        }


        var url = "https://spatialstack.com/tv_w7/opt.php?k=" + k + "&l=" + l; //+ data.name;
        $.ajax({
            url: url,
            type: "GET",
            dataType: 'json',
            async: false,
            success: function (response) {
                if (response.error == 'cookie out') {
                    //location.reload();

                    return;
                }
                //console.log(response);
                // alert('Opt:'+response);
//        $("#opt_text").val(response);

                var res = JSON.parse(response);
                $("#opt_text").html('Hubs serve <b>' + res.seq_ids.length + '</b> movement traces');
                selected_segment_ids_opt = res.item_ids;
                search_val_array_agg_opt = res.seq_ids;

                //initializing to zeros
                var seg_tr_max = [];

                for (var key in seg_tr_mapping) {
                    seg_tr_max[key] = 0;
                }

                /*          for (m = 0; m < seg_tr_mapping.length; m++)
                          {
                              seg_tr_max[seg_tr_mapping[m]]=0;
                          }*/
                max_trs_optimal = 0;
                for (z = 0; z < search_val_array_agg_opt.length; z++) {
                    var segs = tr_seg_mapping[search_val_array_agg_opt[z]];
                    for (i = 0; i < segs.length; i++) {
                        seg_tr_max[segs[i]] = seg_tr_max[segs[i]] + 1;
                        if (max_trs_optimal < seg_tr_max[segs[i]]) {
                            max_trs_optimal = seg_tr_max[segs[i]];
                        }
                    }
                }
                // alert(max_trs_optimal);


            },
            error: function (response) {
                alert("There was some problem in getting optimal results!");
                return;
            }
        });


        //selected_segment_ids_opt=eval_json.item_ids;

        geoJsonLayerSeg_opt.eachLayer(function (layer) {

            //console.log(layer._leaflet_id);
            //layer.feature.setsty;
            layer.setStyle(
                {
                    //'weight': 3,
                    'color': 'white',
                    'opacity': 0.1
                    //,'dashArray': '5, 10'
                });

        });


        if (selected_segment_ids_opt.length > 0) {
            no_filter_layer = false;
            //search_val_array_agg_opt=[];
            var i;
            for (i = 0; i < selected_segment_ids_opt.length; i++) {
                //search_val_array_opt=seg_tr_mapping[parseInt(selected_segment_ids_opt[i])];
                //search_val_array_agg_opt=union_arrays(search_val_array_agg_opt,search_val_array_opt);
                geoJsonLayerSeg_opt.getLayer(selected_segment_ids_opt[i]).setStyle(
                    {
                        //'weight': 3,
                        'color': selected_color,
                        'weight': line_weight,
                        'opacity': 1
                        //,'dashArray': '5, 10'
                    });
            }


            //drawing node layer

            geoJsonLayerNode_opt.eachLayer(function (layer, latlng) {
                layer.feature.properties.tr_start_count = 0;
                //console.log(layer._leaflet_id);
                node_leaflet_id_node_id_mapping_opt[layer._leaflet_id] = layer.feature.properties.node_id;
            });

            var max_node = 0;
            for (y = 0; y < search_val_array_agg_opt.length; y++) {
                console.log(tr_node_mapping[search_val_array_agg_opt[y]][0]);
                console.log(node_leaflet_id_node_id_mapping_opt.indexOf(tr_node_mapping[search_val_array_agg_opt[y]][0]));
                var index_id = node_leaflet_id_node_id_mapping_opt.indexOf(tr_node_mapping[search_val_array_agg_opt[y]][0]);
                geoJsonLayerNode_opt.getLayer(index_id).feature.properties.tr_start_count = geoJsonLayerNode_opt.getLayer(index_id).feature.properties.tr_start_count + 1;
                if (max_node < parseInt(geoJsonLayerNode_opt.getLayer(index_id).feature.properties.tr_start_count)) {
                    max_node = parseInt(geoJsonLayerNode_opt.getLayer(index_id).feature.properties.tr_start_count);
                }
            }
            //alert(max_node);
            geoJsonLayerNode_opt.eachLayer(function (layer, latlng) {
                layer.setStyle({
                    radius: (return_node_size_max(layer.feature.properties.tr_start_count, max_node)),
                    fillColor: node_color,
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
//          layer.redraw();
            });


        } else {
            no_filter_layer = true;
            //load_node_default();
            search_val_array_agg_opt = [];
        }


        if (search_val_array_opt) {
            console.log('Total trajectories:' + search_val_array_agg_opt.length);
        } else {
            search_val_array_opt = '';
            console.log('no trajectory');
        }


        //total_tr=0;
        geoJsonLayerTr_opt.clearLayers();
        geoJsonLayerTr_opt.addData(tr_data);

        geoJsonLayerSeg_opt.bringToFront();

        geoJsonLayerNode_opt.bringToFront();


        var url = "https://spatialstack.com/tv_w7/eval.php?ids=" + selected_segment_ids.toString() + "&l=" + l; //+ data.name;
        $.ajax({
            url: url,
            type: "GET",
            dataType: 'json',
            async: false,
            success: function (response) {
                if (response.error == 'cookie out') {
                    //location.reload();

                    return;
                }
                //console.log(response);
//        alert(response);
                // alert('Eval:'+response);
                var res = JSON.parse(response);
                //$("#eval_text").val(response);
                $("#eval_text").html('Hubs serve <b>' + res.seq_ids.length + '</b> movement traces');
                selected_segment_ids_eval = res.item_ids;
                search_val_array_agg_eval = res.seq_ids

            },
            error: function (response) {
                alert("There was some problem in getting evaluation results!");
                return;
            }
        });


        geoJsonLayerSeg_eval.eachLayer(function (layer) {

            //console.log(layer._leaflet_id);
            //layer.feature.setsty;
            layer.setStyle(
                {
                    //'weight': 3,
                    'color': 'white',
                    'opacity': 0.1
                    //,'dashArray': '5, 10'
                });

        });


        if (selected_segment_ids_eval.length > 0) {
            no_filter_layer = false;
            //search_val_array_agg_eval=[];
            var i;
            for (i = 0; i < selected_segment_ids_eval.length; i++) {
                //search_val_array_eval=seg_tr_mapping[parseInt(selected_segment_ids_eval[i])];
                //search_val_array_agg_eval=union_arrays(search_val_array_agg_eval,search_val_array_eval);
                geoJsonLayerSeg_eval.getLayer(selected_segment_ids_eval[i]).setStyle(
                    {
                        //'weight': 3,
                        'color': selected_color,
                        'weight': line_weight,
                        'opacity': 1
                        //,'dashArray': '5, 10'
                    });
            }

            //alert(search_val_array_agg_eval.length);


            //drawing node layer

            geoJsonLayerNode_eval.eachLayer(function (layer, latlng) {
                layer.feature.properties.tr_start_count = 0;
                //console.log(layer._leaflet_id);
                node_leaflet_id_node_id_mapping_eval[layer._leaflet_id] = layer.feature.properties.node_id;
            });

            for (y = 0; y < search_val_array_agg_eval.length; y++) {
                console.log(tr_node_mapping[search_val_array_agg_eval[y]][0]);
                console.log(node_leaflet_id_node_id_mapping_eval.indexOf(tr_node_mapping[search_val_array_agg_eval[y]][0]));
                var index_id = node_leaflet_id_node_id_mapping_eval.indexOf(tr_node_mapping[search_val_array_agg_eval[y]][0]);
                geoJsonLayerNode_eval.getLayer(index_id).feature.properties.tr_start_count = geoJsonLayerNode_eval.getLayer(index_id).feature.properties.tr_start_count + 1;
            }

            geoJsonLayerNode_eval.eachLayer(function (layer, latlng) {
                layer.setStyle({
                    radius: (return_node_size_max(layer.feature.properties.tr_start_count, max_node)),
                    fillColor: node_color,
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
//          layer.redraw();
            });


        } else {
            no_filter_layer = true;
            //load_node_default();
            search_val_array_agg_eval = [];
        }


        if (search_val_array_eval) {
            console.log('Total trajectories:' + search_val_array_agg_eval.length);
        } else {
            search_val_array_eval = '';
            console.log('no trajectory');
        }


        //total_tr=0;
        geoJsonLayerTr_eval.clearLayers();
        geoJsonLayerTr_eval.addData(tr_data);

        geoJsonLayerSeg_eval.bringToFront();

        geoJsonLayerNode_eval.bringToFront();


        $('#absolute-maps').removeClass('d-none');
        $('#absolute-maps').addClass('d-flex');
        $('body > *').not(":eq(#absolute-maps)").addClass('d-none');
        map_1.invalidateSize(true);
        map_2.invalidateSize(true);
        selected_segment_ids = [];


    });


    $('#exit_filter_modal_toggle_btn').on('click', function () {
        $('body > *').removeClass('d-none');
        $('#absolute-maps').removeClass('d-flex');
        $('#absolute-maps').addClass('d-none');
        k = 0;
        $(".slider-1").slider("option", "value", k);
        $("#len").html(':' + k);
        l = 0;
        $(".slider-2").slider("option", "value", l);
        //$("#dis").html(''+l);
        setTimeout(function () {
            map.invalidateSize();
        }, 1000);

    });

    function animate_u()
    {
        if(current_step_u<total_steps_u)
        {
            geoJsonLayerTr_animate_feature_user.clearLayers();
            markers_u.clearLayers();

            var layer_o_clone_json=geoJsonLayerTr_eval.getLayers()[current_step_u].toGeoJSON();
            var layer_o_clone= L.geoJson(layer_o_clone_json, {
                // Executes on each feature in the dataset
                onEachFeature: function (featureData, featureLayer) {
                    featureLayer.setStyle({
                        'color': '#FF6600',
                        'weight':6,
                        'opacity': 1
                    });
                }
            });

            geoJsonLayerTr_animate_feature_user.addLayer(layer_o_clone);
            current_step_u++;

            progress_u=((current_step_u/total_steps_u)*100).toFixed(2);
            console.log(progress_u);

            total_point=geoJsonLayerTr_animate_feature_user.getLayers()[0].toGeoJSON().features[0].geometry.coordinates.length;
            start_point =geoJsonLayerTr_animate_feature_user.getLayers()[0].toGeoJSON().features[0].geometry.coordinates[0];
            end_point   =geoJsonLayerTr_animate_feature_user.getLayers()[0].toGeoJSON().features[0].geometry.coordinates[total_point-1];

            var greenIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            //marker.addTo(map_2);

            var yellowIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            var marker = L.marker([start_point[1],start_point[0]], {icon: yellowIcon});

            var marker_end= L.marker([end_point[1],end_point[0]], {icon: greenIcon});
            //marker_end.addTo(map_2);
            markers_u.addLayer(marker);
            markers_u.addLayer(marker_end);

            //            var marker_end = L.marker([end_point[1],end_point[0]]);
//            marker_end.addTo(map_2);


            setTimeout(animate_u, 500);
        }
        else
        {
            geoJsonLayerTr_animate_feature_user.clearLayers();
            markers_u.clearLayers();
        }
    }

    $('#modal_toggle_btn_animate_u').on('click', function () {
        current_step_u=0;
        total_steps_u=geoJsonLayerTr_eval.getLayers().length;
        setTimeout(animate_u, 500);

    });


    function animate_o()
    {
        if(current_step_o<total_steps_o)
        {
            geoJsonLayerTr_animate_feature.clearLayers();
            markers_o.clearLayers();

            var layer_o_clone_json=geoJsonLayerTr_opt.getLayers()[current_step_o].toGeoJSON();
            var layer_o_clone= L.geoJson(layer_o_clone_json, {
                // Executes on each feature in the dataset
                onEachFeature: function (featureData, featureLayer) {
                    featureLayer.setStyle({
                        'color': '#FF6600',
                        'weight':6,
                        'opacity': 1
                    });
                }
            });

            geoJsonLayerTr_animate_feature.addLayer(layer_o_clone);
            current_step_o++;

            progress_o=((current_step_o/total_steps_o)*100).toFixed(2);
            console.log(progress_o);

            total_point=geoJsonLayerTr_animate_feature.getLayers()[0].toGeoJSON().features[0].geometry.coordinates.length;
            start_point =geoJsonLayerTr_animate_feature.getLayers()[0].toGeoJSON().features[0].geometry.coordinates[0];
            end_point   =geoJsonLayerTr_animate_feature.getLayers()[0].toGeoJSON().features[0].geometry.coordinates[total_point-1];

            var greenIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            //marker.addTo(map_2);

            var yellowIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            var marker = L.marker([start_point[1],start_point[0]], {icon: yellowIcon});

            var marker_end= L.marker([end_point[1],end_point[0]], {icon: greenIcon});

            markers_o.addLayer(marker);
            markers_o.addLayer(marker_end);

            //            var marker_end = L.marker([end_point[1],end_point[0]]);
//            marker_end.addTo(map_2);


            setTimeout(animate_o, 500);
        }
        else
        {
            geoJsonLayerTr_animate_feature.clearLayers();
            markers_o.clearLayers();
        }
    }

    $('#modal_toggle_btn_animate_o').on('click', function()
    {
        current_step_o=0;
        total_steps_o=geoJsonLayerTr_opt.getLayers().length;
        setTimeout(animate_o, 500);
    });

  // $('#filter_modal').on('show.bs.modal', function(){
  //   setTimeout(function() {
  //     map_1.invalidateSize();
  //     map_2.invalidateSize();
  //   }, 10);
  // });

  $(".btn").click(function(event){

    event.preventDefault();

    search_val_array=[];
    search_val_array_agg=[];
    selected_segment_ids=[];
    no_filter_layer=true;
    $("#count_ss").val(selected_segment_ids.length);
    $("#sels").val(selected_segment_ids.toString());
    $("#numtraj").val(search_val_array_agg.length);
    $("#trajid").val(search_val_array_agg.toString());

    //total_tr=0;
    geoJsonLayerTr.clearLayers();
    geoJsonLayerTr.addData(tr_data);


    geoJsonLayerSeg.clearLayers();
    geoJsonLayerSeg.addData(seg_data_);

//    geoJsonLayerNode.clearLayers();
 //   geoJsonLayerNode.addData(node_data);
  //  geoJsonLayerNode.resetStyle();
    load_node_default();
    geoJsonLayerNode.bringToFront();

  });

  $("#check_multi").click(function () {
    console.log($("#check_multi").is(":checked"))
    multiple_selection=$("#check_multi").is(":checked");

  })


  $("#check_hover").click(function () {
    console.log($("#check_hover").is(":checked"))
    hover=$("#check_hover").is(":checked");
  })

  $("#check_hover_node").click(function () {
    console.log($("#check_hover_node").is(":checked"))
    hover_node=$("#check_hover_node").is(":checked");
  })



  $("#count_ss").keyup(function () {
    console.log($("#count_ss").val())
  })


  $("#sels").keyup(function () {
    console.log($("#sels").val())
  })


  $("#numtraj").keyup(function () {
    console.log($("#numtraj").val())
  })


  $("#trajid").keyup(function () {
    console.log($("#trajid").val())
  })

  $("#check_multi").prop('checked', true);
  multiple_selection=true;

  $("#check_hover").prop('checked', true);
  hover=true;

  $("#check_hover_node").prop('checked', true);
  hover_node=true;

  sidebar.close();

});