$(function(){
      mapboxgl.accessToken = 'pk.eyJ1IjoiYXVzdGtlIiwiYSI6ImNpd21uZTB1bDAwNm8yenF4ZmtlbjkzenUifQ.CohFKxWoYGrFXQDoRvZWag';
      var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/austke/ciwmng4f100es2ppak5unxguy',
          center: [-105, 39.7],
          zoom: 7
      });

      map.on('load', function () {
          map.addSource("points", {
              "type": "geojson",
              "data": {
                  "type": "FeatureCollection",
                  "features": [{
                      "type": "Feature",
                      "geometry": {
                          "type": "Point",
                          "coordinates": [-105.03238901390978, 38.913188059745586]
                      },
                      "properties": {
                          "title": "Mapbox DC",
                          "icon": "campsite"
                      }
                  }, {
                      "type": "Feature",
                      "geometry": {
                          "type": "Point",
                          "coordinates": [-105.414, 37.776]
                      },
                      "properties": {
                          "title": "Mapbox SF",
                          "icon": "campsite"
                      }
                  }]
              }
          });

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
      });

});

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
