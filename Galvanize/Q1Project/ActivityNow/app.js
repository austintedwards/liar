$(function(){
//Selection Button
        $("#camping").on("click",function(){
        if ($(".camping").attr("src")==='fire.png'){
          $(".camping").attr("src",'log.png');
          $(".hiking").attr("src",'log.png');
          $(".biking").attr("src",'log.png');
          $(".sking").attr("src",'log.png');
        }else{
          $(".camping").attr("src",'fire.png');
          $(".hiking").attr("src",'log.png');
          $(".biking").attr("src",'log.png');
          $(".sking").attr("src",'log.png');
          $(".list").text("Campground List:");
        }
        });
        $("#hiking").on("click",function(){
        if ($(".hiking").attr("src")==='fire.png'){
          $(".camping").attr("src",'log.png');
          $(".hiking").attr("src",'log.png');
          $(".biking").attr("src",'log.png');
          $(".sking").attr("src",'log.png');
        }else{
          $(".hiking").attr("src",'fire.png');
          $(".camping").attr("src",'log.png');
          $(".biking").attr("src",'log.png');
          $(".sking").attr("src",'log.png');
          $(".list").text("Hiking Trail List:");
        }
        });
        $("#sking").on("click",function(){
        if ($(".sking").attr("src")==='fire.png'){
          $(".camping").attr("src",'log.png');
          $(".hiking").attr("src",'log.png');
          $(".biking").attr("src",'log.png');
          $(".sking").attr("src",'log.png');
        }else{
          $(".sking").attr("src",'fire.png');
          $(".camping").attr("src",'log.png');
          $(".hiking").attr("src",'log.png');
          $(".biking").attr("src",'log.png');
          $(".list").text("Snow Sports List:");
        }
        });
        $("#biking").on("click",function(){
        if ($(".biking").attr("src")==='fire.png'){
          $(".camping").attr("src",'log.png');
          $(".hiking").attr("src",'log.png');
          $(".biking").attr("src",'log.png');
          $(".sking").attr("src",'log.png');
        }else{
          $(".biking").attr("src",'fire.png');
          $(".camping").attr("src",'log.png');
          $(".hiking").attr("src",'log.png');
          $(".sking").attr("src",'log.png');
          $(".list").text("Mountain Biking Trail List:");
        }
        });

//GPS
  $("#GPS").click(function(){
    event.preventDefault();
    GPS();
  });
  function GPS(){
     var options = {
       enableHighAccuracy: true,
       timeout: 5000,
       maximumAge: 0
     };
     function success(pos) {
       var crd = pos.coords;
       var location = {lat:crd.latitude, long:crd.longitude};
       currentCity(location);
     }
     function error(err) {
       console.warn('ERROR(' + err.code + '): ' + err.message);
     }
     navigator.geolocation.getCurrentPosition(success, error, options);
   }
//inputs location grom GPS
  function currentCity(location){
    $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+location.lat+","+location.long+"&key=AIzaSyAFSPs5znb5ggZ7ZyajBCJMdBiKEXV6UG0",function(city){
      var address = city.results[0].formatted_address;
      $("#location").val(address);
    });
  }
//using search to find location of input
 $("#search").click(function(){
   event.preventDefault();
   $(".campList").html("");
   var town = $("#location").val();
   locationInput(town);
 });
 function locationInput(place){
   $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+place+"&key=AIzaSyAFSPs5znb5ggZ7ZyajBCJMdBiKEXV6UG0",function(town){
     var spot = town.results[0].geometry.location;
     var findState = town.results[0].address_components;
     if (findState.length > 7){
       var state = findState[5].short_name;
     }else{
       state = findState[2].short_name;
     }
     getAPI(state, spot);
   });
 }

 //TRAILS API
 function getAPI(state,spot){
   if($(".camping").attr("src")==='fire.png'){
     var activity = "camping";
   }else if($(".hiking").attr("src")==='fire.png'){
      activity = "hiking";
   }else if($(".biking").attr("src")==='fire.png'){
      activity = "mountain biking";
   }else{
      activity = "snow sports";
   }
   $.ajax({
             url: "https://trailapi-trailapi.p.mashape.com/?lat="+spot.lat+"&lon="+spot.lng+"&q[activities_activity_type_name_eq]="+activity+"&q[state_cont]="+state+"&radius=30",
             type: 'GET',
             dataType: 'json',
             headers: {
                 'X-Mashape-Key': 'eF2eIuiccTmshWk6XsVYw1Y126uIp15wmfSjsnagq0Vb4q20iQ'
             },
             success: function(activity){
               getActivity(activity, spot);

             }
         });
  }
//get activity object
  function getActivity(activity,spot){
    var active = [];
    for (var i = 0; i < activity.places.length; i++) {
      var obj = {};
      var now = activity.places[i];
      obj.name = now.name;
      obj.lat = now.lat;
      obj.lng = now.lon;
      obj.city = now.city;
      obj.state = now.state;
      active.push(obj);
    }
    distance(active,spot)
  }
//finding the closest parks
 function distance(activeSpots,spot){
   var list = [];
   var orderList = [];
   for (var i = 0; i < activeSpots.length; i++) {
     var campLong = activeSpots[i].lng;
     var campLat = activeSpots[i].lat;
     var d = Math.sqrt((spot.lat - campLat)*(spot.lat - campLat) + (spot.lng - campLong)*(spot.lng - campLong));
     activeSpots[i].dist = d;
   }
   activeSpots.sort(function(a,b){
    if(a.dist < b.dist)
      return -1;
    if(a.dist > b.dist)
      return 1;
    return 0;
  });
    if (activeSpots.length>10){
    for (var j = 0; j < 10; j++) {
    activityList(activeSpots,j);
    }
    }else{
    for (var k = 0; k < activeSpots.length; k++) {
    activityList(activeSpots,k);
    }
    }
    map.flyTo({
    center: [
    activeSpots[0].lng, activeSpots[0].lat
    ],
    zoom: 9
    });
  mapLoad(activeSpots);
}
//List making
function activityList(activeSpots,i){
    var li = $("<ol>"+(i+1)+". <a href='https://www.google.com/maps/search/"+activeSpots[i].name+"/"+activeSpots[i].lat+","+activeSpots[i].lng+",17z'target='_blank'>"+activeSpots[i].name+"</a></ol>");
    $(".campList").append(li);
}

 //Map creator
mapboxgl.accessToken = 'pk.eyJ1IjoiYXVzdGtlIiwiYSI6ImNpd21uZTB1bDAwNm8yenF4ZmtlbjkzenUifQ.CohFKxWoYGrFXQDoRvZWag';
var map = new mapboxgl.Map({
    container: 'map',
    center: [-105, 39.7],
    attributionControl: true,
    zoom: 7,
    style: 'mapbox://styles/austke/ciwmng4f100es2ppak5unxguy'
  });
//points on a map
function mapLoad(activeSpots){
    var points ={
          "type": "geojson",
          "data": {
              "type": "FeatureCollection",
              "features": []
          }
      };

  //points for loop
  if (activeSpots.length<10){
    for (var i = 0; i < activeSpots.length; i++) {
        inputPoints(points, activeSpots, i);
    }
  }else{
    for (var j = 0; j < 10; j++) {
        inputPoints(points, activeSpots, j);
    }
  }
//points JSON maker
  function inputPoints(points, activeSpots, i){
    if($(".camping").attr("src")==='fire.png'){
      var activity = "campsite";
    }else if($(".hiking").attr("src")==='fire.png'){
       activity = "mountain";
    }else if($(".biking").attr("src")==='fire.png'){
       activity = "bicycle";
    }else{
       activity = "playground";
    }
    points.data.features.push({
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [activeSpots[i].lng, activeSpots[i].lat]
        },
        "properties": {
            "title": i+1,
            "icon": activity,

        }
    });
  }
        if (map.getSource("points") === undefined){
        var mapLink = map.addSource("points", points);

        addL();
        }else{
            mapLink = map.removeSource("points");
            addL();
            mapLink = map.addSource("points", points);
        }



//map layer
      function addL(){
        map.addLayer({
          "id": "points",
          "type": "symbol",
          "source": "points",
          "layout": {
              "icon-image": "{icon}-15",
              "text-field": "{title}",
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 0.6],
              "text-anchor": "top"
          }
      });
    }
      //to click links for maps
      mapLink.on("click", function(p){
        var lngDif = [];
        var latDif = [];
        for (var i = 0; i < activeSpots.length; i++) {
          lngDif[i] = p.lngLat.lng-activeSpots[i].lng;
          latDif[i] = p.lngLat.lat-activeSpots[i].lat;
          if (lngDif[i] > -0.01 && lngDif[i] < 0.01 && latDif[i] > -0.01 && latDif[i] < 0.01){
            var popup = new mapboxgl.Popup({closeOnClick: true})
                .setLngLat([activeSpots[i].lng, activeSpots[i].lat])
                .setHTML("<a href='https://www.google.com/maps/search/"+activeSpots[i].name+"/"+activeSpots[i].lat+","+activeSpots[i].lng+",17z'target='_blank'>"+activeSpots[i].name+"</a>")
                .addTo(map);
            }else{

          }
        }
      });

    }

});

function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
