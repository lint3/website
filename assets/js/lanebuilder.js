

var buildLane = function(direction) {
  var lane = document.createElement('div');
  lane.setAttribute("class", "lane " + direction);
  var label = document.createElement('p');
  label.textContent = direction;
  lane.appendChild(label)
  return lane;
}

var buildRoad = function() {
  
  var road = document.createElement('div');
  road.setAttribute("class", "road");
  road.appendChild(buildLane("forward"));
  road.appendChild(buildLane("back"));
  return road;
  
}

var page = document.getElementById("lanebuilder");
var submitButton = document.getElementById("submittags");
submitButton.setAttribute("onclick", "buildRoad()");
