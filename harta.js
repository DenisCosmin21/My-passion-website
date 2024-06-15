const centerLat = 45.48216;
const centerlng = 24.59176;
const lat = [45.761527, 46.209199, 46.821639, 46.991389, 46.940056, 46.974972, 45.193083, 46.824250, 46.794944, 46.975900, 46.516389, 46.561201, 46.454556, 45.545250];
const lng = [22.322663, 25.547236, 22.401639, 22.547750, 25.683528, 22.547750, 22.507750, 23.754833, 25.851167, 25.797889, 22.507648, 22.632667, 23.691030, 25.564417, 25.518000];

const nume = ["Turnul lui Liman", "Soim Calator", "Cheile Cutilor", "Podu Indian", "Piatra Soimilor", "Grota cu Hamace", "Casa Zmeului", "White Wolf", "Astragalus", "Wild Ferenc", "Mocanita", "Pietrele Negre", "Sky Fly", "Pericolul Caprelor", "Cheile Rasnoavei"];

const dif = ["B", "C/D", "B/C", "B", "C/D", "B/C,D,E", "B", "C", "A/B,C,C/D", "C/D", "B", "C", "B/C,C/D", "C/D"];

const lungime = [100, 240, 270, 160, 150, 170, 215, 400, 700, 200, 150, 200, 350, 200, 450];

const inaltime = [80, 120, 70, 80, 100, 80, 100, 150, 100, 285, 173, 110, 100, 200, 250];

  const platform = new H.service.Platform({
    'apikey': '{9dzYDsoaiLAUMn6tiXaf0KWodx53TA97-wKpV_m0gz8}'
  });
  var defaultLayers = platform.createDefaultLayers();
  var map = new H.Map(document.getElementById('harta'),
    defaultLayers.raster.normal.map,{
    center: {lat:centerLat, lng:centerlng},
    zoom: 7,
  });
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  window.addEventListener('resize', () => map.getViewPort().resize());
  var ui = H.ui.UI.createDefault(map, defaultLayers);
  addInfoBubble(map);

function addMarkersToMap(group, map) {
    for(let i = 0;i < 15;i++){
      let icon = new H.map.Icon("https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-via-ferrata-extreme-sports-flaticons-flat-flat-icons.png");
      let via = new H.map.Marker({lat:lat[i], lng:lng[i]}, {icon: icon});
      via.setData(`<div class='bula'><p class='title'>${nume[i]}</p><ol class="data"><li>Dificultate:${dif[i]}</li><li>Lungime traseu:${lungime[i]}m</li><li>Diferenta de nivel:${inaltime[i]}m</li><li>latitudine:${lat[i]}</li> <li>longitudine: ${lng[i]}</li></ol></div>`);
      via.addEventListener('tap', function(){
        map.setCenter({lat:lat[i], lng:lng[i]}, false);
        map.setZoom(10,true);
      })
      
      group.addObject(via);
    }
}

function addInfoBubble(map){
  var group = new H.map.Group();

  map.addObject(group);

  group.addEventListener('tap', function(evt) {
    var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
      content: evt.target.getData()
    });
    ui.addBubble(bubble);
    bubble.addEventListener('statechange', function(evt) {
      if (evt.target.getState() === H.ui.InfoBubble.State.CLOSED) {
         map.setCenter({lat:centerLat, lng:centerlng});
         map.setZoom(7, true);
      }
    });
  }, false);
  addMarkersToMap(group, map);
}


      