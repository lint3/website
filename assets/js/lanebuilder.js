

function buildLane(direction) {
  var lane = document.createElement('div');
  lane.setAttribute("class", "lane " + direction);
  var label = document.createElement('p');
  label.textContent = direction;
  lane.appendChild(label)
  return lane;
}

function buildRoad(parent) {
  
  parseOsmTags(document.getElementById("tagbox").value);
  
  var road = document.createElement('div');
  road.setAttribute("class", "road");
  road.appendChild(buildLane("forward"));
  road.appendChild(buildLane("back"));
  page.appendChild(road);  
}

function fillThruLanes(numlanes) {
  // TODO: Abstract this out
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
          forwardLanes = Array(value).fill("none");
        } else {
          // Check that the correct number of lanes are in there
          if (forwardLanes.length != value) {
            errorMsg = "Conflicting values for forward number of lanes";
          }
        }
        break;
      case "lanes:backward":
        if (backwardLanes.length == 0) {
          backwardLanes = Array(value).fill("none");
        } else {
          // Check that the correct number of lanes are in there
          if (backwardLanes.length != value) {
            errorMsg = "Conflicting values for backward number of lanes";
          }
        }
        break;
      case "lanes:both_ways":
        if (bothLanes.length == 0) {
          bothLanes = Array(value).fill("none");
        } else {
          // Check that the correct number of lanes are in there
          if (bothLanes.length != value) {
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
  laneInfo = [forwardLanes, backwardLanes, bothLanes];
  return laneInfo;
}

var page = document.getElementById("lanebuilder");
var submitButton = document.getElementById("submittags");
submitButton.addEventListener('click', buildRoad);

// submitButton.setAttribute("onclick", "buildRoad()");
