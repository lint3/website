

function buildLane(direction) {
  var lane = document.createElement('div');
  lane.setAttribute("class", "lane " + direction);
  var label = document.createElement('p');
  label.textContent = direction;
  lane.appendChild(label)
  return lane;
}

function buildRoad(parent) {
  
  var road = document.createElement('div');
  road.setAttribute("class", "road");
  road.appendChild(buildLane("forward"));
  road.appendChild(buildLane("back"));
  page.appendChild(road);  
}

var page = document.getElementById("lanebuilder");
var submitButton = document.getElementById("submittags");
submitButton.addEventListener('click', buildRoad);

// submitButton.setAttribute("onclick", "buildRoad()");
