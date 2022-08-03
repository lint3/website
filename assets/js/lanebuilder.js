var laneIconsForward = {
  "through": "\u2191",
  "through;right": "\u2191\u21B1",
  "through;left": "\u2191\u21B0",
  "right": "\u21B1",
  "left": "\u21B0",
}

var laneIconsBackward = {
  "through": "\u2193",
  "through;right": "\u2193\u21B2",
  "through;left": "\u2191\u21B3",
  "right": "\u21B2",
  "left": "\u21B3",
}

function buildLane(lanetype, direction) {
  var lane = document.createElement('div');
  lane.setAttribute("class", "lane " + lanetype + " " + direction);
  var label = document.createElement('p');
  if (direction === "forward") {
    label.textContent = laneIconsForward[lanetype];
  } else if (direction === "backward") {
    label.textContent = laneIconsBackward[lanetype];
  }
  lane.appendChild(label)
  return lane;
}

function buildRoad(parent) {
  
  var laneInfo = parseOsmTags(document.getElementById("tagbox").value);
  
  var road = document.createElement('div');
  road.setAttribute("class", "road");
  
  for(let backwardLane = laneInfo[2].length - 1; backwardLane >=0; --backwardLane) {
    road.appendChild(buildLane(laneInfo[2][backwardLane], "backward"));
  }
  for (let forwardLane = 0; forwardLane < laneInfo[0].length; ++forwardLane) {
    road.appendChild(buildLane(laneInfo[0][forwardLane], "forward"));
  }
  for (let middleLane = 0; middleLane < laneInfo[1].length; ++middleLane) {
    road.appendChild(buildLane(laneInfo[1][middleLane], "both"));
  }

  page.appendChild(road);
}

function parseOsmTags(chunk) {

  let totalLanes = 0;
  let forwardLanes = [];
  let backwardLanes = [];
  let bothLanes = [];
  errorMsg = "";
  
  let tags = chunk.split("\n");
  
  // For each line of text in tags:
  for (let i = 0; i < tags.length; ++i) {
    let tag = tags[i].split("=");
    let key = tag[0];
    let value = tag[1];
    
    // Check which key the tag contains
    switch (key) {
      case "lanes":
        totalLanes = parseInt(value, 10);
        break;
        
      case "lanes:forward":
        if (forwardLanes.length == 0) {
          forwardLanes = Array(parseInt(value, 10)).fill("thru");
        } else {
          // Check that the correct number of lanes are in there
          if (forwardLanes.length != parseInt(value, 10)) {
            errorMsg = "Conflicting values for forward number of lanes";
          }
        }
        break;
      case "lanes:backward":
        if (backwardLanes.length == 0) {
          backwardLanes = Array(parseInt(value, 10)).fill("thru");
        } else {
          // Check that the correct number of lanes are in there
          if (backwardLanes.length != parseInt(value, 10)) {
            errorMsg = "Conflicting values for backward number of lanes";
          }
        }
        break;
      case "lanes:both_ways":
        if (bothLanes.length == 0) {
          bothLanes = Array(parseInt(value, 10)).fill("thru");
        } else {
          // Check that the correct number of lanes are in there
          if (bothLanes.length != parseInt(value, 10)) {
            errorMsg = "Conflicting values for both directions number of lanes";
          }
        }
        break;
      case "turn:lanes:forward":
        forwardLanes = value.split("|");
        break;
      case "turn:lanes:backward":
        backwardLanes = value.split("|");
        break;
      case "turn:lanes:both_ways":
        bothLanes = value.split("|");
        break;
      default:
        console.log("Unable to parse tag " + key + "=" + value);
    }
  }
  laneInfo = [forwardLanes, bothLanes, backwardLanes];
  return laneInfo;
}
// laneInfo = [forwardLanes, bothLanes, backwardLanes];

var page = document.getElementById("lanebuilder");
var submitButton = document.getElementById("submittags");
submitButton.addEventListener('click', buildRoad);

// submitButton.setAttribute("onclick", "buildRoad()");
