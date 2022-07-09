function display_gps(elt) {
  if (!elt) return;
  
  var url = elt.getAttribute('data-gpx-source');
  var mapid = elt.getAttribute('data-map-target');
  if (!url || !mapid) return;
  
  function _t(t) { return elt.getElementsByTagName(t)[0]; }
  function _c(c) { return elt.getElementsByClassName(c)[0]; }
  

  
  var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>'
  });
  
  var otm = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
  
  var map = L.map(mapid, {
    layers: [osm]
  });
  
  map.scrollWheelZoom.disable();
  map.dragging.disable();
  
  L.Control.textbox = L.Control.extend({
      onAdd: function(map) {
        var text = L.DomUtil.create('div');
        text.id = "info_text";
        text.innerHTML = "<strong>Click/tap to enable map interaction</strong>"
        return text;
      },
      
      onRemove: function(map) {
        // nothing
      }
  });
  L.control.textbox = function(opts) {return new L.Control.textbox(opts);}
  L.control.textbox({ position: 'bottomleft' }).addTo(map);
  
  map.on('click', function() {
    if (map.scrollWheelZoom.enabled()) {
      map.scrollWheelZoom.disable();
      map.dragging.disable();
    }
    else {
      map.scrollWheelZoom.enable();
      map.dragging.enable();
    }
  });
  
  var maplayers = {
    "OpenStreetMap": osm,
    "OpenTopoMap": otm
  };
  
  var layerControl = L.control.layers(maplayers).addTo(map);
  
  new L.GPX(url, {
    async: true,
    marker_options: {
      startIconUrl: '/assets/icons/pin-icon-start.png',
      endIconUrl: '/assets/icons/pin-icon-end.png',
      shadowUrl: '/assets/icons/pin-shadow.png',
      wptIconUrls: {
        '': '/assets/icons/pin-icon-wpt.png'
      }
    },
  }).on('loaded', function(e) {
    var gpx = e.target;
    map.fitBounds(gpx.getBounds());
    layerControl.addOverlay(gpx, gpx.get_name());
  }).addTo(map);
  
  if(elt.classList.contains("topo")) {
    otm.addTo(map);
    osm.remove();
  }
}

display_gps(document.getElementById('map-embed'));
