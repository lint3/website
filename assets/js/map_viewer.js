function display_gps(elt) {
  if (!elt) return;
  
  var url = elt.getAttribute('data-gpx-source');
  var mapid = elt.getAttribute('data-map-target');
  if (!url || !mapid) return;
  
  function _t(t) { return elt.getElementsByTagName(t)[0]; }
  function _c(c) { return elt.getElementsByClassName(c)[0]; }
  
  var map = L.map(mapid);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>'
  }).addTo(map)
  
  L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  }).addTo(map)
  ;
  var control = L.control.layers(null, null).addTo(map);
  
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
    control.addOverlay(gpx, gpx.get_name());
  }).addTo(map);
}

display_gps(document.getElementById('map-embed'));
