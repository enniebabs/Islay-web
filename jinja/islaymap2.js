
  $('#clearMarkers').click(function () {

Animalhusbandryclusters.remove()
Institutionclusters.remove()
DomesticBuildingclusters.remove()
Commercialsiteclusters.remove()
Farmlandclusters.remove()
Landfeatureclusters.remove()
Sportfeatureclusters.remove()
Transportfeatureclusters.remove()
Waterfeatureclusters.remove()
Culturalfeatureclusters.remove()
Ecclesiasticclusters.remove()
Rockyoutcropclusters.remove()
Forestryclusters.remove()
})    
  $('#addMarkers').click(function () {
Animalhusbandryclusters.addTo(map)
Institutionclusters.addTo(map)
DomesticBuildingclusters.addTo(map)
Commercialsiteclusters.addTo(map)
Farmlandclusters.addTo(map)
Landfeatureclusters.addTo(map)
Sportfeatureclusters.addTo(map)
Transportfeatureclusters.addTo(map)
Waterfeatureclusters.addTo(map)
Culturalfeatureclusters.addTo(map)
Rockyoutcropclusters.addTo(map)
Forestryclusters.addTo(map)
Ecclesiasticclusters.addTo(map)
}) 




      /* Baselayers*/

  var  OSOpenData = L.tileLayer('http://geo.nls.uk/maps/opendata/{z}/{x}/{y}.png',{
          title: 'Background map - OS Opendata',
          mosaic_id: '5',
          type: 'base',
          visible: false, 
          attribution: '<a href="http://www.ordnancesurvey.co.uk/oswebsite/opendata/">Ordnance Survey OpenData</a>. Contains OS data &#9400; Crown copyright and database right (2010). ',
          // minZoom: 10,
          maxZoom: 17,
          });
                 

 
  var OS_1920s = L.tileLayer('https://nls-{s}.tileserver.com/nls/{z}/{x}/{y}.jpg', {
    attribution: '<a href="https://geo.nls.uk/maps/">National Library of Scotland Historic Maps</a>',
    minZoomLevel: 6,
        numZoomLevels: 17, 
    subdomains: '0123'
  });

  var esriworld_imagery= L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    minZoom : 6,
    maxZoom: 17,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  });
  var esriworld_terrain =  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    minZoom : 6,
    maxZoom: 17,
  attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC,USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

 /* var crs = new L.Proj.CRS('EPSG:27700',
  '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.999601 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894 +units=m +no_defs'
  {
    resolutions: [8192, 4096, 2048] // 3 example zoom level resolutions
  }
);*/
// initialize the map on the "mapid" div with a given center and zoom
  var map = L.map("mapid",{
    zoom: 10,
  
    center: [55.7363, -6.1771],
    layers: [OSOpenData],
    zoomControl: true,
   
    attributionControl: true,
   // measureControl: true


  }); 


  



  //generate marker

    //generate marker
//markerGroups
  parentGroup = L.markerClusterGroup()
  var Institutionclusters = L.featureGroup.subGroup(parentGroup);
  var Farmlandclusters = L.featureGroup.subGroup(parentGroup);
   var Commercialsiteclusters= L.featureGroup.subGroup(parentGroup);
 var Landfeatureclusters = L.featureGroup.subGroup(parentGroup);
  var  Sportfeatureclusters= L.featureGroup.subGroup(parentGroup);
    var  Waterfeatureclusters= L.featureGroup.subGroup(parentGroup);
   var  Culturalfeatureclusters= L.featureGroup.subGroup(parentGroup);
    var  Transportfeatureclusters= L.featureGroup.subGroup(parentGroup);
    var Animalhusbandryclusters=L.featureGroup.subGroup(parentGroup);
 var DomesticBuildingclusters = L.featureGroup.subGroup(parentGroup);
  var Forestryclusters = L.featureGroup.subGroup(parentGroup);  
 var Rockyoutcropclusters = L.featureGroup.subGroup(parentGroup);
  var Ecclesiasticclusters = L.featureGroup.subGroup(parentGroup);
parentGroup.addTo(map);



       
   {% for item in markers %}

//create map icons from database
  var mapicons= L.icon({
        iconUrl: '{{ item[2] }}',
        iconSize: [30, 30]
        
    });

{% if item[3] == 'Institution and Government Buildings' %} 
var Institutions = L.marker({{ item[4:] }}, {icon: mapicons}).bindTooltip('{{ item[1] }}').on('click',  markerOnClick{{item[0]}})
  Institutions.addTo(Institutionclusters)
  Institutionclusters.addTo(map)

{% elif item[3] == 'Settlement' %} 
var DomesticBuildings = L.marker({{ item[4:] }}, {icon: mapicons}).bindTooltip('{{ item[1] }}').on('click',  markerOnClick{{item[0]}})
DomesticBuildings.addTo(DomesticBuildingclusters)
DomesticBuildingclusters.addTo(map)

{% elif item[3] == 'Farmland and fields' %} 
var Farmland = L.marker({{ item[4:] }}, {icon: mapicons}).bindTooltip('{{ item[1] }}').on('click', markerOnClick{{item[0]}})
Farmland.addTo(Farmlandclusters)
Farmlandclusters.addTo(map)

{% elif item[3] == 'Industrial and Commercial Sites' %} 
var Commercialsites = L.marker({{ item[4:] }}, {icon: mapicons}).bindTooltip('{{ item[1] }}').on('click', markerOnClick{{item[0]}})
Commercialsites.addTo(Commercialsiteclusters)
Commercialsiteclusters.addTo(map)

{% elif item[3] == 'Land features' %} 
var Landfeatures = L.marker({{ item[4:] }}, {icon: mapicons}).bindTooltip('{{ item[1] }}').on('click', markerOnClick{{item[0]}})
  Landfeatures.addTo(Landfeatureclusters)
  Landfeatureclusters.addTo(map)

{% elif item[3] == 'Sports facility' %} 
var Sportfeatures = L.marker({{ item[4:] }}, {icon: mapicons}).bindTooltip('{{ item[1] }}').on('click', markerOnClick{{item[0]}}) 
 Sportfeatures.addTo(Sportfeatureclusters)
Sportfeatureclusters.addTo(map)

{% elif item[3] == 'Water or Coastal Features' %} 
var Waterfeatures = L.marker({{ item[4:] }}, {icon: mapicons}).bindTooltip('{{ item[1] }}').on('click', markerOnClick{{item[0]}})
 Waterfeatures.addTo(Waterfeatureclusters)
  Waterfeatureclusters.addTo(map)

{% elif item[3] == 'Cultural Features' %} 
var Culturalfeatures= L.marker({{ item[4:] }}, {icon: mapicons}).bindTooltip('{{ item[1] }}').on('click', markerOnClick{{item[0]}})
Culturalfeatures.addTo(Culturalfeatureclusters)
Culturalfeatureclusters.addTo(map)

{% elif item[3] == 'Transport Infrastructure' %} 
var Transportfeatures=L.marker({{ item[4:] }}, {icon: mapicons}).bindTooltip('{{ item[1] }}').on('click', markerOnClick{{item[0]}})
    
Transportfeatures.addTo(Transportfeatureclusters)
Transportfeatureclusters.addTo(map)

{% elif item[3] == 'Animal husbandry' %} 
var AnimalHusbandry= L.marker({{ item[4:] }}, {icon: mapicons}).bindTooltip('{{ item[1] }}').on('click',  markerOnClick{{item[0]}})
AnimalHusbandry.addTo(Animalhusbandryclusters)
Animalhusbandryclusters.addTo(map)

{% elif item[3] == 'Forestry plantations' %} 
var Forestry = L.marker({{ item[4:] }}, {icon: mapicons}).bindTooltip('{{ item[1] }}').on('click',  markerOnClick{{item[0]}})  
Forestry.addTo(Forestryclusters)
Forestryclusters.addTo(map)


{% elif item[3] == 'Ecclesiastic  sites' %} 
var EcclesiasticSite  = L.marker({{ item[4:] }}, {icon: mapicons}).bindTooltip('{{ item[1] }}').on('click',  markerOnClick{{item[0]}})  
EcclesiasticSite.addTo(Ecclesiasticclusters)
Ecclesiasticclusters.addTo(map)

{% else %} 
var Rockyoutcrop = L.marker({{ item[4:] }}, {icon: mapicons}).bindTooltip('{{ item[1] }}').on('click',  markerOnClick{{item[0]}})  

Rockyoutcrop.addTo(Rockyoutcropclusters)
Rockyoutcropclusters.addTo(map)

{%  endif  %} 

{% endfor %} 



 //this opens the marker modal popup on click of marker
 
{% for item in markers %}
 function markerOnClick{{item[0]}}(e){
  console.log(this)

   $.ajax({
     url: "/~s1774346/cgi-bin/placequeries.py",
     async: true,
     type: "post",
     datatype:"json",
     data: {'pid': {{item[0]}}},
       success:  markerModal

      })
      
}
      function markerModal(result) {

console.log(result)
console.log(result.placeinfo.description)
console.log(result.placeinfo.supplementary)
console.log(result.placeinfo.survey)

console.log(result.owners[0])

var ownerarr = result.owners
var imagearr = result.images
var archaeologyarr = result.archaeological
var authorityarr = result.authorities
var originarr = result.origins

html = '<table class="table table-striped table-bordered table-condensed"> '
for (var i = 0; i < imagearr.length; i++) {
  html = html + '<tr><td></td></tr><tr><td><img height=300px width=300px src=' + imagearr[i].imagepath + ' ></img></td></tr>';
  console.log(imagearr[i].imagepath);
}
html = html + '</table>';
$('#imageTab').html(html);


html = '<table  class="table table-striped table-bordered table-condensed"><caption>Archaeological Description</caption><tr><th>NMRS Site Number</th><th>Grid Reference</th><th>Archaeological Notes</th></tr>'
for (var i = 0; i < archaeologyarr.length; i++) {
  html = html + '<tr><td>' + archaeologyarr[i].NMRS + '</td>' + '<td>' + archaeologyarr[i].grid_reference + '</td>' + '<td>' + archaeologyarr[i].notes + '' + archaeologyarr[i].notes2 + '</td></tr>';
  console.log(archaeologyarr[i].NMRS + ", " + archaeologyarr[i].notes);
}
html = html + '</table>';
$('#archaeologyTab').html(html);


html = '<table  class="table table-striped table-bordered table-condensed"><caption>Name of Authority on which the Place name is the Propery of.</caption><thead><tr><th>Owner</th><th>Title</th><th>House</th><th>Year</th></tr></thead>'
for (var i = 0; i < ownerarr.length; i++) {
  html = html + '<tbody><tr><td>' + ownerarr[i].name + '</td>' + '<td>' + ownerarr[i].title + '</td>' + '<td>' + ownerarr[i].house + '</td>' + '<td>' + ownerarr[i].year + '</td></tr></tbody>';
  console.log(ownerarr[i].name + ", " + ownerarr[i].year);
}
html = html + '</table>';
$('#ownerTab').html(html);


html = '<table  class="table table-striped table-bordered table-condensed"><caption>Authorities for the data relating to the Place name from 1878 Name Book (B of N) </caption><thead><tr><th>Name</th><th>Title</th><th>Residence</th></tr></thead>'
for (var i = 0; i < authorityarr.length; i++) {

  html = html + '<tbody><tr><td>' + authorityarr[i].name + '</td>' + '<td>' + authorityarr[i].title + '</td>' + '<td>' + authorityarr[i].residence + '</td></tr></tbody>';
  console.log(authorityarr[i].name + ", " + authorityarr[i].title);
}

html = html + '</table>';
$('#authorityTab').html(html);


html = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Old Name</th><td>" + result.placeinfo.old_name + "</td></tr>" + "<tr><th>Modern Place name from the 1979 survey</th><td>" + result.placeinfo.name_1979 + "</td></tr>" + "<tr><th>Meaning</th><td>" + result.placeinfo.meaning + "</td></tr>" + "<tr><th>Description</th><td>" + result.placeinfo.description + "</td></tr>" + "<tr><th>Comments</th><td>" + result.placeinfo.comments + "</td></tr>" + "<tr><th>Easting</th><td>" + result.placeinfo.easting + "</td></tr>" + "<tr><th>Northing</th><td>" + result.placeinfo.northing + "<tr><th>Survey</th><td>" + result.placeinfo.survey + "</td></tr>" + "<tr><th>Sheet Number</th><td>" + result.placeinfo.sheet_number + "</td></tr>" + "<tr><th>Supplementary</th><td>" + result.placeinfo.supplementary + "" + result.placeinfo.supplementarycontd + "</td></tr>" +  "<tr><th>Canmore</th><td><a href='https://canmore.org.uk/site/search/result?SITECOUNTRY=1&LOCAT_XY_RADIUS_M=500&LOCAT_X_COORD=" + result.placeinfo.easting + "&LOCAT_Y_COORD=" + result.placeinfo.northing + "&LOCAT_EXTENTTYPE=RADIUS' target='_blank'>Link to canmore database</a></td></tr>"+ "<tr><th>Origin</th><td>" + ' ' + "<table>"

//this reference origin in the info tab 
for (var i = 0; i < originarr.length; i++) {
  html = html + originarr[i].origintype + '</td></tr>';
  console.log(originarr[i].originid + ", " + originarr[i].origintype);
}
html = html + '</table>';


$('#infoTab').html(html)
$("#placename-title").html();
$("#placenameModal").modal("show");

}


{% endfor %}


//show modal on click of about button
$("#about-btn").click(function () {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});



//click people
$(document).on('click', '.people', peopleClick)

function peopleClick(e) {
  $.ajax({
    url: "/~s1774346/cgi-bin/peoplequeries.py",
    async: true,
    type: "post",
    datatype: "json",
    data: {
      'peopleid': $(this).attr('id')
    },
    success: peopleModal  })
}


function peopleModal(response) {
  console.log(response)
  var relativearr = response.familyinfos
  var placearr = response.relatedplaces
  var peopleimagearr = response.images
  //console.log(result.peopleinfo.surname)
  //  console.log(response.peopleinfo.othernames)
  console.log(response.familyinfos)
  // console.log(response.relatedplaces)
  console.log(response.relatedplaces)


  html = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Surname</th><td>" + response.peopleinfo.surname + "</td></tr>" + "<tr><th>Other names</th><td>" + response.peopleinfo.othernames + "</td></tr>" + "<tr><th>Maiden name</th><td>" + response.peopleinfo.maiden_name + "</td></tr>" + "<tr><th>Status</th><td>" + response.peopleinfo.status + "</td></tr>" + "<tr><th>Buried at</th><td>" + response.peopleinfo.buried_at + "</td></tr>" + "<tr><th>Reference</th><td>" + response.peopleinfo.reference + "</td></tr>" + "<tr><th>Age</th><td>" + response.peopleinfo.age + "</td></tr>" + "<tr><th>Born</th><td>" + response.peopleinfo.year_born + "</td></tr>" + "<tr><th>Married</th><td>" + response.peopleinfo.year_married + "</td></tr>" + "<tr><th>Died</th><td>" + response.peopleinfo.year_died + "</td></tr>" + "<tr><th>Gender</th><td>" + response.peopleinfo.gender + "</td></tr>" + "<tr><th>Supplementary</th><td>" + response.peopleinfo.supplementary + "" + response.peopleinfo.supplementarycontd + "</td></tr>" + "<tr><th>Parish</th><td>" + response.peopleinfo.parish + "</td></tr>" + "<table>"

  $('#peopleinfoTab').html(html)


  html = '<table  class="table table-striped table-bordered table-condensed"><caption>Blood Relatives of this person </caption><thead><tr><th>Surname</th><th>Name</th><th>Relationship</th></tr></thead>'
  for (var i = 0; i < relativearr.length; i++) {
    html = html + '<tbody><tr><td>' + relativearr[i][0] + '</td>' + '<td>' + relativearr[i][1] + '</td>' + '<td>' + relativearr[i][2] + '</td>' + '</tr></tbody>';
    console.log(relativearr[i][0] + ", " + relativearr[i][1]);
  }
  html = html + '</table>';
  $('#relativesTab').html(html);

  //  console.log(result.owners[0])

  // var list = document.getElementById('list')

  html = '<table class="table table-striped table-bordered table-condensed"> '
  for (var i = 0; i < peopleimagearr.length; i++) {
    html = html + '<tr><td></td></tr><tr><td><img height=300px width=300px src=' + peopleimagearr[i].imagepath + ' ></img></td></tr>';
    console.log(peopleimagearr[i].imagepath);
  }
  html = html + '</table>';
  $('#peopleimageTab').html(html);
  // Append list items

  //var item = document.createElement('li');

  //  item.innerHTML = '<a href="#"> ' + response.placeinfo.description + '</a>';

  // list.appendChild(item);

  //function myFunction() {
  //   alert("inside onclick");
  //   map.panTo(new L.LatLng(response.relatedplaces.lat,  response.relatedplaces.lng));
  //}

  html = '<table  class="table table-striped table-bordered table-condensed"><p> Place name of residence of this person as at the time of record </p><p>Click to view placename location</p><thead><tr><th>Place name after 1979 Survey</th></tr></thead>'
  for (var i = 0; i < placearr.length; i++) {
    html = html + '<tbody><tr><td><a href="#" id="ZoomToPlacename">' + placearr[i][0] + '</td>' + '</tr></tbody>';
    console.log(placearr[i][0] + ", " + placearr[i][1]);
  }


  $(document).on('click', '#ZoomToPlacename', function (e) {
    for (var i = 0; i < placearr.length; i++) {
      //var layer = markerClusters.getLayer(id);
      map.setView([placearr[i][1], placearr[i][2]], 28)


      $("#peoplenameModal").modal("hide");
    }
  })


  html = html + '</table>';

  $('#placeTab').html(html);

  $("#peoplenameModal").modal("show");
}







var measure = L.control.measure({position: 'topleft'});

 //superficial50k legend (same as superficial) to map
   $(document).ready(function(){
    $("#measurecheck").change(function(){
        if($(this).prop("checked")){ 
         measure.addTo(map);

    return;
  }else {
  
measure.remove();
    return;

    }
  });
});



/*Tile layers for Overlay*/

      var parishes = L.tileLayer('https://geoserver.nls.uk/geoserver/gwc/service/gmaps?layers=nls:Scotland_Parish&zoom={z}&x={x}&y={y}&format=image/png',{
      title: 'Counties',
        mosaic_id: '2',
      visible: true,

      typename: 'nls:Britain_Parish',
      attribution: 'Parish Boundaries Copyright Scottish Government, contains Ordnance Survey data &copy; Crown copyright and database right (2017)'
     
    });



      var counties = L.tileLayer('https://geoserver.nls.uk/geoserver/gwc/service/gmaps?layers=nls:Britain_Counties&zoom={z}&x={x}&y={y}&format=image/png',{
      title: "Counties",
        mosaic_id: '1',
      visible: true,
      typename: 'nls:Britain_County',
//      maxResolution: 38.21851414258813,
       attribution: '' 
    });
  
      var unitary_authorities = L.tileLayer('https://geoserver.nls.uk/geoserver/gwc/service/gmaps?layers=nls:district_borough_unitary_region&zoom={z}&x={x}&y={y}&format=image/png',{
      title: "Unitary Authorities",
        mosaic_id: '2',
      visible: true,
      typename: 'nls:district_borough_unitary_region',
         attribution: 'Unitary authorities from OS Boundary Line. Contains OS data &copy; Crown copyright and database right (2017).'
               
            

    });


//add farm districts in geojson format
  var farmdistrict =  L.geoJson(farmdistrict, {
  style: function (feature) {
    return {
      color: "#000000",
      fill: true,
      opacity: 0.8
    };
  },
// set change of colour on mouse over and show label
  onEachFeature: function(feature, layer) {
    layer.on('mouseover', function () {
    this.setStyle({
      'fillColor': '#0000ff'
    });
    });
    layer.on('mouseout', function () {
      this.setStyle({
      'fillColor': '#228B22'
    });
    });
    
        if (feature.properties && feature.properties.name) {
            layer.bindTooltip(feature.properties.name, {closeButton: false, offset: L.point(0, -20)});
            layer.on('mouseover', function() { layer.openPopup(); });
            layer.on('mouseout', function() { layer.closePopup(); });
            }
        }

});

/*icons for farms with gaelic names 
var violetIcon = L.icon({
  iconUrl: '../jinja/violet_icon.svg',
  iconSize: [15, 31], // size of the icon
  iconAnchor: [2, 31], // point of the icon which will correspond to marker's location

});
//add farm dot with gaelic placenames
var gaelicname = L.geoJson(gaelic, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: violetIcon
    });

  },

});
   

//icons for farms with norse names 
var orangeIcon = L.icon({
    iconUrl: '../jinja/orange_icon.svg',
    iconSize:     [15, 31], // size of the icon
    iconAnchor:   [2, 31], // point of the icon which will correspond to marker's location
   
});
//add farm dot with norse placenames
  var norsename =  L.geoJson(norse, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {icon: orangeIcon});

  },

});*/
   
 // json object for layer switcher control basemaps
var baseLayers = {
  "ESRI World Topo": esriworld_terrain,
  "ESRI World Imagery": esriworld_imagery,
  "Modern Ordnance Survey": OSOpenData,
  "Ordance Survey 1920s": OS_1920s
};

   /*Referencing tiles, farm districts and farm dots as overlays in control*/

var overlay = {
  "<img src='../jinja/bluerect.svg'  width = '10' height='10' align='middle' hspace='4'>County Boundaries ": counties,
  "<img src='../jinja/winerect.svg' width = '10' height='10' align='middle' hspace='4'>Civil Parish Boundaries": parishes,
  "<img src='../jinja/greenrect.svg' width = '10' height='10' align='middle' hspace='4'>Unitary Authorities": unitary_authorities,
  "<img src='../jinja/blackrect.svg' width = '10' height='10' align='middle' hspace='4'>Farm Districts": farmdistrict
/*  "<img src='../jinja/violet_icon.svg'  height='10'>1749-51 Gaelic Farm Names": gaelicname,
  "<img src='../jinja/orange_icon.svg'  height='10'>1749-51 Norse Farm Names": norsename*/

};

 //adding the baselayers and overlays into the control pane on the map
layerControl = L.control.layers(baseLayers, overlay, {
  collapsed: false
}).addTo(map);


/*First control pane for filtering */
var baselayers = {}
var clusteroverlays = {
  "Animal husbandry": Animalhusbandryclusters,
  "Cultural features": Culturalfeatureclusters,
  "Settlements": DomesticBuildingclusters,
  "Forestry plantation and other trees": Forestryclusters,
  "Farmland and fields": Farmlandclusters,
  "Ecclesiastic sites": Ecclesiasticclusters,
  "Gravel pits and Rocky outcrops": Rockyoutcropclusters

}

/*Second control pane for filtering */
var secondclusteroverlays = {

  "Industrial and Commercial sites": Commercialsiteclusters,
  "Institutions and Government buildings": Institutionclusters,
  "Land features": Landfeatureclusters,
  "Sports facility": Sportfeatureclusters,
  "Transport features": Transportfeatureclusters,
  "Water or Coastal features": Waterfeatureclusters
}

/*appending first control to a div */
control1 = L.control.layers(baselayers, clusteroverlays, {
  collapsed: false
})
 control1.addTo(map)
 control1._container.parentNode.removeChild(control1._container)
 //"this._container.parentNode.removeChild(this._container)"

$('#control1').append(control1.onAdd(map))
/*appending second control to a div */
control2 = L.control.layers(baselayers, secondclusteroverlays, {
  collapsed: false
})
control2.addTo(map)
control2._container.parentNode.removeChild(control2._container)


$('#control2').append(control2.onAdd(map))

// Call the getContainer routine.
/*var htmlObject = control1.getContainer();
// Get the desired parent node.
var a = document.getElementById('control1');

// Finally append that node to the new parent.
function setParent(el, newParent)
{
    newParent.appendChild(el);
}
setParent(htmlObject, a);*/
// opacity slider parish boundary
$('#toggleOpacity').on('change', function () {
  $('#opacity-slider').html(this.value);
  parishboundary.setStyle({
    opacity: this.value,
    fillOpacity: this.value
  });

});


 //layerControl.addOverlay(parishboundary, " 1930 Civil Parish Boundaries");
//layerControl.addLayer(esriworld_imagery);


//tabs navigation
$(document).ready(function(){
    $(".nav-tabs a").click(function(){
        $(this).tab('show');
    });
});


 // Create additional Control placeholders
    function addControlPlaceholders(map) {
      var corners = map._controlCorners,
        l = 'leaflet-',
        container = map._controlContainer;

      function createCorner(verticalSide, horizontalSide) {
        var className = l + verticalSide + ' ' + l + horizontalSide;

        corners[verticalSide + horizontalSide] = L.DomUtil.create('div', className, container);
      }

      createCorner('verticalcenter', 'left');
      createCorner('verticalcenter', 'right');
    }
    addControlPlaceholders(map);

//map scale
var scaleLinear = L.control.scale({position: 'verticalcenterleft'})

// alternating scale with black/white bars.
var alternatingscale =  L.control.betterscale({position: 'verticalcenterleft'});


$(document).ready(function(){
    $("input[name='scalecheck']").on("change", function(){
        var isChecked = $(this).prop("checked"); 
        if(isChecked){
            $(".buttons").show();
        $("#linearcheck").prop("checked", true);
        map.addControl(scaleLinear);
        } else {
            $(".buttons").hide(); 
      map.removeControl(scaleLinear);
      map.removeControl(alternatingscale);
        }
    }); 
}); 


$(document).ready(function(){
    $("#linearcheck").change(function(){
        if($(this).prop("checked")){ 
        $("radio").show();
    map.removeControl(alternatingscale);
    map.addControl(scaleLinear);
    return;
  }
  
    map.removeControl(scaleLinear);
    return;

  
  });
}); 



$(document).ready(function(){
    $("#alternatingcheck").change(function(){
        if($(this).prop("checked")){ 
        $("radio").show();
    map.removeControl(scaleLinear);
    map.addControl(alternatingscale);
    return;
  }else {
  
    map.removeControl(alternatingscale);
    return;

    }
  });
});




var allresolutions = [156543.03390625, 78271.516953125, 39135.7584765625,
                      19567.87923828125, 9783.939619140625, 4891.9698095703125,
                      2445.9849047851562, 1222.9924523925781, 611.4962261962891,
                      305.74811309814453, 152.87405654907226, 76.43702827453613,
                      38.218514137268066, 19.109257068634033, 9.554628534317017,
                      4.777314267158508, 2.388657133579254, 1.194328566789627,
                      0.5971642833948135, 0.2985821416974068, 0.1492910708487034,
                      0.0746455354243517, 0.0373227677121759];
 
  
var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    visibility: true,
    zIndex: 100,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="https://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
var BGS50bedrock =  L.tileLayer.wms('https://map.bgs.ac.uk/arcgis/services/BGS_Detailed_Geology/MapServer/WMSServer?', {
layers: 'BGS.50k.Bedrock',
format: 'image/gif',
zIndex: 100,
zoom: 4
},
{
resolutions: [400000,400000,405200,405200],

});
  
var BGS50superficial =  L.tileLayer.wms('https://map.bgs.ac.uk/arcgis/services/BGS_Detailed_Geology/MapServer/WMSServer?', {
layers:'BGS.50k.Superficial.deposits',
format: 'image/gif',
zIndex: 100,
zoom: 4,
});

  

/*BGS Geology 625k and 1:1 million offshore sediments*/
var BGS625ksediments =  L.tileLayer.wms('http://ogc.bgs.ac.uk/cgi-bin/BGS_Bedrock_and_Superficial_Geology/wms?', {
layers:'GBR_BGS_625k_BA',
zIndex: 100,
format: 'image/png',

},
{
resolutions: [0,0,700000,1300000]

});


  //agriculture 
 var LCA250k= L.tileLayer.wms('http://druid.hutton.ac.uk/arcgis/services/Hutton_LCA250K_UKSO/MapServer/WmsServer?',{

layers : '0',
format: 'image/png',
zIndex: 100


 });
 //forestry

     
    var LCF250k= L.tileLayer.wms('http://druid.hutton.ac.uk/arcgis/services/Hutton_LCF_250K_OSGB/MapServer/WmsServer?',{

layers : '0',
format: 'image/png',

zIndex: 100

 });  

   var legendBedrock_625k= L.control({position: 'topright'});
     var legendBedrock_625kURL = "http://ogc.bgs.ac.uk/cgi-bin/BGS_Bedrock_and_Superficial_Geology/wms?service=wms&version=1.1.1&request=GetLegendGraphic&layer=GBR_BGS_625k_BA&format=image/png&"
// create div element with the class 'legend'
    legendBedrock_625k.onAdd = function(map) {
      var div = L.DomUtil.create('div', 'legend');
      div.innerHTML += "<a href='#' onClick=window.open('"+legendBedrock_625kURL+"','Legend','width=300,height=500,scrollbars=yes');>Click to view Legend</a>"

      return div;
    };

                  
    var legend50k = L.control({position: 'topright'});
    var legend50URL = "http://ogc.bgs.ac.uk/cgi-bin/BGS_GSN_Bedrock_Geology/wms?version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=NAM_GSN_1M_BLS&format=image/png&STYLE=default&%E2%80%9D"
    legend50k.onAdd = function(map) {
      var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += "<a href='#' onClick=window.open('"+legend50URL+"','Legend','width=300,height=500,scrollbars=yes');>Click to view Legend</a>"

      return div;
    };
    


     var legendLCA250k = L.control({position: 'topright'});
     var legendLCA250kURL = "http://druid.hutton.ac.uk/arcgis/services/Hutton_LCA250K_UKSO/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=0"
//create smal window for legend
    legendLCA250k.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'legend');
     div.innerHTML += "<a href='#' onClick=window.open('"+legendLCA250kURL+"','Legend','width=550,height=170,0,status=0,');>Click to view Legend</a>"

      return div;
    };   
    var legendLCF250k = L.control({position: 'topright'});
    var legendLCF250kURL = "http://druid.hutton.ac.uk/arcgis/services/Hutton_LCF_250K_OSGB/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=0"
    legendLCF250k.onAdd = function(map) {
      var div = L.DomUtil.create('div', 'legend');
      div.innerHTML += "<a href='#'data-toggle='tooltip' data-placement='top' title='forestry' onClick=window.open('"+legendLCF250kURL+"','Legend','width=550,height=170,0,status=0,');>Click to view Legend</a>"
      return div;
    };   
    

           

//bedrock625k legend to map
$(document).ready(function(){
    $("#BGS625control").change(function(){
        if($(this).prop("checked")){
          map.setZoom(10); 
          BGS625ksediments.addTo(map);
          legendBedrock_625k.addTo(map);
          BGS50superficial.remove();
          BGS50bedrock.remove();
        legend50k.remove();
           
    
        $('#superficial50k_control').prop('checked', false)
        $('#bedrock50k_control').prop('checked', false)
    return;
  }else {
 
    legendBedrock_625k.remove();
    BGS625ksediments.remove();
  

    return;

    }
  });

  
}); 
 //superficial50k legend (same as superficial) to map
   $(document).ready(function(){
    $("#superficial50k_control").change(function(){
        if($(this).prop("checked")){ 
          map.setZoom(15); /*zoom to smaller scale because of type of map*/
          BGS50superficial.addTo(map);
          legend50k.addTo(map);
          BGS625ksediments.remove();
          BGS50bedrock.remove();
          legendBedrock_625k.remove();
          
         
         
           $('#BGS625control').prop('checked', false)
           $('#bedrock50k_control').prop('checked', false)
    return;
  }else {
  
    legend50k.remove();
    BGS50superficial.remove();
    return;

    }
  });
});
//bedrock50k legend  to map
   $(document).ready(function(){
    $("#bedrock50k_control").change(function(){
      map.setZoom(15);
        if($(this).prop("checked")){ 
          BGS50bedrock.addTo(map);
          legend50k.addTo(map);
           BGS625ksediments.remove();
           BGS50superficial.remove();
          legendBedrock_625k.remove();
           $('#BGS625control').prop('checked', false)
           $('#superficial50k_control').prop('checked', false)
    return;
  }else {
  
    legend50k.remove();
    BGS50bedrock.remove();
    return;

    }
  });
});


 //add lca250k legend to map
   $(document).ready(function(){
    
    $("#LCA250k_control").change(function(){
        if($(this).prop("checked")){ 
          map.setZoom(10); /*zoom to smaller scale because of type of map*/
         LCA250k.addTo(map);
          legendLCA250k.addTo(map);
          LCF250k.remove();
          legendLCF250k.remove();
           $('#LCF250k_control').prop('checked', false)
           $('#LCF250k_control').prop('checked', false)
    return;
  }else {

          LCA250k.remove();
             legendLCA250k.remove();
           
    return;

    }
  });
});




//add lcf250k legend to map
   $(document).ready(function(){
    $("#LCF250k_control").change(function(){
        if($(this).prop("checked")){ 
          map.setZoom(10);
         LCF250k.addTo(map);
          legendLCF250k.addTo(map);
          LCA250k.remove();
          legendLCA250k.remove();
           $('#LCA250k_control').prop('checked', false)
           $('#LCA250k_control').prop('checked', false)
    return;
  }else {

          LCF250k.remove();
          legendLCF250k.remove();
    return;

    }
  });
});








  var OSOneInchNatgrid = L.tileLayer("https://geo.nls.uk/mapdata3/os/1inch_pop_nat_grid/{z}/{x}/{y}.png",{
          title: 'Scotland - OS One Inch, 1945-1948',
          zIndex: 100,
          minZoom: 1,
          maxZoom: 15,
          group_no: '37',
          mosaic_id: '2',
          type: 'overlay', 
         typename: 'nls:WFS',
          visible: false,
          minx: -7.88182502,
          miny: 54.56493209,
          maxx: -0.61174401,
          maxy: 60.91113681
 

    });

     var Legend_OSOneInchNatgrid = L.control({position: 'topright'});
     var Legend_OSOneInchNatgridURL = "https://geo.nls.uk/mapdata3/os/1inch_pop_nat_grid/key/openlayers.html"

    Legend_OSOneInchNatgrid.onAdd = function(map) {
      var div = L.DomUtil.create('div', 'legend');
      div.innerHTML += "<a href='#' onClick=window.open('"+Legend_OSOneInchNatgridURL+"','Legend','width=300,height=500,scrollbars=yes');>Click to view Legend</a>"

      return div;
    };

  //os oneinch overlaymap to map
   $(document).ready(function(){
    $("#OSOneInchNatgrid_control").change(function(){
      
        if($(this).prop("checked")){ 
          OSOneInchNatgrid.addTo(map);
          Legend_OSOneInchNatgrid.addTo(map);
          sixinch.remove();
          Legend_sixinch.remove();
          oneinchseventh.remove();
          Legend_oneinchseventh.remove();
          $('#sixinch_control').prop('checked', false)
          $('#oneinchseventh_control').prop('checked', false)
    return;
  }else {
  
   OSOneInchNatgrid.remove();
   Legend_OSOneInchNatgrid.remove();
    return;

    }
  });
});

var oneinchseventh = L.tileLayer('https://nls-0.tileserver.com/fpsUZbc4ftb2/{z}/{x}/{y}.jpg',{
        preload: Infinity,
  title: "Great Britain - OS One Inch 7th series, 1955-61",
  zIndex: 100,

              minZoom: 1,
              maxZoom: 15,
              tilePixelRatio: 1,
            
        group_no: '55',
        mosaic_id: '11',
        typename: 'nls:catalog_one_inch_7th_series',
        type: 'overlay', 
        visible: false,
        minx: -8.8, 
  miny: 49.8,
        maxx: 1.77, 
        maxy: 60.9,
  keytext: 'View the individual sheets of this OS one-inch mapping by selecting "Find by place" above'
        
    });
  
    var Legend_oneinchseventh = L.control({position: 'topright'});
     var Legend_oneinchseventhURL = "http://geo.nls.uk/mapdata2/os/seventh/key/openlayers.html"

    Legend_oneinchseventh.onAdd = function(map) {
      var div = L.DomUtil.create('div', 'legend');
      div.innerHTML += "<a href='#' onClick=window.open('"+Legend_oneinchseventhURL +"','Legend','width=300,height=500,scrollbars=yes');>Click to view Legend</a>"

      return div;
    };

 

  //six inch basemap to map
   $(document).ready(function(){
    $("#oneinchseventh_control").change(function(){
      map.setZoom(10);
        if($(this).prop("checked")){ 
          oneinchseventh.addTo(map);
          Legend_oneinchseventh.addTo(map);
           OSOneInchNatgrid.remove();
        Legend_OSOneInchNatgrid.remove();
         sixinch.remove();
        Legend_sixinch.remove();
          $('#OSOneInchNatgrid_control').prop('checked', false)
          $('#sixinch_control').prop('checked', false)
         
    return;
  }else {

    oneinchseventh.remove();
    Legend_oneinchseventh.remove()
    return;

    }
  });
});



var sixinch = L.tileLayer('https://geo.nls.uk/mapdata3/os/6inchfirst/{z}/{x}/{y}.png',
    {
        numZoomLevels: 16,
        backgroundColor: '#eee',
        attribution: 'Overlay NLS <a href="https://maps.nls.uk/os/6inch/index.html" target="_blank">Ordnance Survey Six Inch, 1843-1882</a> maps',
        zIndex: 100,
        tileOptions: {crossOriginKeyword: null},      
  resolutions: allresolutions,
        serverResolutions: [156543.03390625, 78271.516953125, 39135.7584765625,
                            19567.87923828125, 9783.939619140625,
                            4891.9698095703125, 2445.9849047851562,
                            1222.9924523925781, 611.4962261962891,
                            305.74811309814453, 152.87405654907226,
                            76.43702827453613, 38.218514137268066,
                            19.109257068634033, 9.554628534317017,
          4.777314267158508, 2.388657133579254],
        transitionEffect: 'resize'
    });

     var Legend_sixinch = L.control({position: 'topright'});
     var Legend_sixinchURL = "https://geo.nls.uk/mapdata3/os/6inchfirst/key/openlayers.html"

    Legend_sixinch.onAdd = function(map) {
      var div = L.DomUtil.create('div', 'l');
      div.innerHTML += "<a href='#' onClick=window.open('"+Legend_sixinchURL+"','width=300,height=500,scrollbars=yes');>Click to view Legend</a>"

      return div;
    };

  

  //six inch basemap to map
   $(document).ready(function(){
    $("#sixinch_control").change(function(){
      map.setZoom(10);
        if($(this).prop("checked")){ 
          sixinch.addTo(map);
          Legend_sixinch.addTo(map);
           OSOneInchNatgrid.remove();
   Legend_OSOneInchNatgrid.remove();
   oneinchseventh.remove();
   Legend_oneinchseventh.remove();
       
          $('#OSOneInchNatgrid_control').prop('checked', false)

    return;
  }else {
  
   // legendBedrock50.remove();
    sixinch.remove();
    Legend_sixinch.remove()
    return;

    }
  });
});


///////Basemap configuration in modal
//add and remove OS_1920s baselayer
$("#OS_1920s").click(function(event) {
    //event.preventDefault();
    if(map.hasLayer(baseLayers)) {
    //  map.addLayer(NLS); 
    //   $(this).addClass('selected');
    } else {
       map.addLayer(OS_1920s); 
        map.removeLayer(esriworld_imagery)
        map.removeLayer(esriworld_terrain) 
        map.removeLayer(OSOpenData);        
        $(this).addClass('selected');
   }
});

//add and remove esri world imagery baselayer
$("#esriworld_imagery").click(function(event) {
   // event.preventDefault();
    if(map.hasLayer(baseLayers)) {
  // map.addLayer(esriworld_imagery); 
  // $(this).addClass('selected');
    } else {
        map.addLayer(esriworld_imagery); 
        map.removeLayer(OS_1920s)
        map.removeLayer(esriworld_terrain)    
        map.removeLayer(OSOpenData);   
        $(this).addClass('selected');
   }
});

//add and remove NLS baselayer
$("#OSOpenData").click(function(event) {
    //event.preventDefault();
    if(map.hasLayer(baseLayers)) {
    //  map.addLayer(NLS); 
    //   $(this).addClass('selected');
    } else {
       map.addLayer(OSOpenData); 
        map.removeLayer(esriworld_imagery)
        map.removeLayer(esriworld_terrain)       
        map.removeLayer(OS_1920s)  
        $(this).addClass('selected');
   }
});

//add and remove esri world imagery baselayer
$("#esriworld_imagery").click(function(event) {
   // event.preventDefault();
    if(map.hasLayer(baseLayers)) {
  // map.addLayer(esriworld_imagery); 
  // $(this).addClass('selected');
    } else {
        map.addLayer(esriworld_imagery); 
        map.removeLayer(OS_1920s)
        map.removeLayer(esriworld_terrain)      
        map.removeLayer(OSOpenData);  
        $(this).addClass('selected');
   }
});
//add and remove esri world terrain baselayer
$("#esriworld_terrain").click(function(event) {
    //event.preventDefault();
    if(map.hasLayer(baseLayers)) {
     
    } else {
        map.addLayer(esriworld_terrain); 
        map.removeLayer(esriworld_imagery)
        map.removeLayer(OS_1920s)  
        map.removeLayer(OSOpenData);     
        $(this).addClass('selected');
   }
});

 


            L.control.browserPrint({}).addTo(map);
  
     var tablesToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>'
    , templateend = '</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>'
    , body = '<body>'
    , tablevar = '<table>{table'
    , tablevarend = '}</table>'
    , bodyend = '</body></html>'
    , worksheet = '<x:ExcelWorksheet><x:Name>'
    , worksheetend = '</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>'
    , worksheetvar = '{worksheet'
    , worksheetvarend = '}'
    , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    , wstemplate = ''
    , tabletemplate = '';

    return function (table, name, filename) {
        var tables = table;

        for (var i = 0; i < tables.length; ++i) {
            wstemplate += worksheet + worksheetvar + i + worksheetvarend + worksheetend;
            tabletemplate += tablevar + i + tablevarend ;
        }

        var allTemplate = template  + wstemplate + templateend;
        var allWorksheet = body + tabletemplate + bodyend;
        var allOfIt = allWorksheet + allTemplate;

        var ctx = {};
        for (var j = 0; j < tables.length; ++j) {
            ctx['worksheet' + j] = name[j];
        }

       for (var k = 0; k < tables.length; ++k) {
            var exceltable;
            if (!tables[k].nodeType) exceltable = document.getElementById(tables[k]);
            ctx['table' + k] = exceltable.innerHTML;
        }

        //document.getElementById("dlink").href = uri + base64(format(template, ctx));
        //document.getElementById("dlink").download = filename;
        //document.getElementById("dlink").click();
           // Create a link to the file
        window.location.href = uri + base64(format(allOfIt, ctx));

    }
})();



/*Date*/
date =  new Date();
y = date.getFullYear();
m = date.getMonth() + 1;
d = date.getDate();
document.getElementById("date").innerHTML = d + "/" + m + "/" + y;
/*Greeting*/

var hours = new Date().getHours();//getHours() function will retrieve the hour from current time 
  var message;
  var morning = ('<b title="Hello! Good morning">Hoigh! Madainn mhath</b>');
  var afternoon = ('<b title="Hello! Good afternoon">Hoigh! Feasgar  mhath</b>');
    var evening = ('<b title="Hello! Good evening">Hoigh! Feasgar math<b>');

  if (hours >= 0 && hours < 12) {
    message = morning; 

  } else if (hours >= 12 && hours < 17) {
    message = afternoon;

  } else if (hours >= 17 && hours < 24) {
    message = evening;
  }

  $('.greeting').append(message);

$('#toggle-box-checkbox').on('change', function(){
  if(this.checked){
    $('body').addClass('night');
  }else{
    $('body').removeClass('night');
  }
});
// Options
//Options can be passed via data attributes or JavaScript. For data attributes, append the option name to data-, as in data-on="Enabled" READ BOOTSTRAP TOGGLE




    /*search by name*/
     function SearchbyName() {
                input = document.getElementById("Search"); 
            filter = input.value.toUpperCase();
        //Show all in target div class 
                $("a.people").show();
        //All div class target that are not contained in filter  will be hidden
                $('a.people').each(function(index, elem){
       if($(elem).text().toUpperCase().includes(filter)) { //Not hidden 
 } else { $(elem).hide(); } 
                });
            } 

 

