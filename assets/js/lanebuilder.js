

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

function parseOsmTags(chunk) {
  let totalLanes = 0;
  let forwardLanes = [];
  let backwardLanes = [];
  let bothLanes = [];
  let forwardAllThru = true; // We don't have any turn data 
  let backwardAllThru = true;
  
  let tags = chunk.split("\n");
  
  // For each line of text in tags:
  for (let i = 0; i < tags.length; ++i) {
    let tag = tags[i].split("=");
    
    let key = tag[0];
    let value = tag[1];
    
    // Check which key the tag contains
    switch (key) {
      case "lanes":
        if 
        totalLanes = parseInt(value, 10);
        break;
      case "lanes:forward":
        if (forwardAllThru && forwardLanes.length < value) {
          for (let j = forwardLanes.length; j < value; ++j) {
            forwardLanes.push("thru");
          }
        }
        break;
      case "lanes:backward":
        if (backwardAllThru && backwardLanes.length < value) {
          for (let j = backwardLanes.length; j < value; ++j) {
            backwardLanes.push("thru");
          }
        }
        break;
      case "lanes:both_ways":
        // TODO: Complete
        break;
      case "turn:lanes:forward":
        let indivTurnLanes = key.split("|");
        if (forwardAllThru
        for (let j = indivTurnLanes.length; j < 
        
        break;
      default:
        console.log("Unable to parse tag " + key + "=" + value);
    }
        
  }
}

var page = document.getElementById("lanebuilder");
var submitButton = document.getElementById("submittags");
submitButton.addEventListener('click', buildRoad);

// submitButton.setAttribute("onclick", "buildRoad()");
